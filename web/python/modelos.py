import psycopg2
from views import url_decode


def connect_to_database():
    # Configura la conexión a la base de datos PostgreSQL
    db_connection = psycopg2.connect(
            database="bbdd_natacion",
            user="xabigonz",
            password="Administrador#3",
            host="pgsql03.dinaserver.com",
            port="5432",
            options="-c search_path=public",
            client_encoding="utf-8"  # Establecer la codificación aquí

    )

    return db_connection

#CAMBIAR DATOS DE LA TABLA:

def cambiar_tabla(data):
    dataComp = url_decode(data['competiciones'])
    dataPrueb = url_decode(data['pruebas'])


    dataComp=dataComp.replace('+',' ')
    dataPrueb=dataPrueb.replace('+',' ')



    data['competiciones']=dataComp
    data['pruebas'] = dataPrueb
    print(data)
    db_connection = connect_to_database()
    db_cursor = db_connection.cursor()
    
    competicion = data.get('competiciones','')#Aqui se referiría al valor de la seleccion de competición
    prueba = data.get('pruebas', '')#Aqui se referiría al valor de la seleccion de prueba

    try:
        db_cursor.execute('''
    SELECT c.nombre AS nombre_competicion,
           n.nombre AS nombre_nadador,
           n.apellido AS apellido_nadador,
           r.prueba,
           r.tiempo AS resultado
    FROM resultados r
    JOIN nadadores n ON r.id_nadador = n.id
    JOIN detalle_resultado dr ON r.id = dr.id_resultado
    JOIN detalle_competi dc ON dr.id_detalle = dc.id_detalle_competi
    JOIN competiciones c ON dc.id_competicion = c.id
    WHERE c.nombre = %s AND r.prueba = %s
    ORDER BY c.nombre, r.tiempo''', (competicion, prueba))
        
        resultados = db_cursor.fetchall()
        print('resultados',resultados)
        resultados_json = []
        for resultado in resultados:
            resultados_json.append({
                'nombre_competicion': resultado[0],
                'nombre_nadador': f"{resultado[1]} {resultado[2]}",
                'prueba': resultado[3],
                'resultado': str(resultado[4])
            })
        print(type(resultados_json))
        return resultados_json

    except Exception as e:
        print("Error al obtener los datos de la tabla 'resultados':", e)

    finally:
        db_cursor.close()
        db_connection.close()

#MOSTRAR DATOS DESDE EL INICIO.
# def get_pruebas():
    
#     db_connection = connect_to_database()
#     db_cursor = db_connection.cursor()

#     try:
#         db_cursor.execute('''SELECT
#   c.nombre AS nombre_competicion,
#   n.nombre AS nombre_nadador,
#   n.apellido AS apellido_nadador,
#   r.prueba,
#   r.tiempo
# FROM competiciones c
# INNER JOIN detalle_resultado dr ON c.id = dr.id_competicion
# INNER JOIN resultados r ON dr.id_resultado = r.id
# INNER JOIN nadadores n ON dr.id_nadador = n.id
# ORDER BY c.nombre, n.nombre, n.apellido, r.prueba, r.tiempo;''')
        
#         resultados = db_cursor.fetchall()
#         return resultados

#     except Exception as e:
#         print("Error al obtener los datos de la tabla 'resultados':", e)

#     finally:
#         db_cursor.close()
#         db_connection.close()


def get_nadadores():
    db_connection = connect_to_database()
    db_cursor = db_connection.cursor()

    try:
        # Realiza una consulta SQL para obtener información de la tabla 'nadadores'
        db_cursor.execute("SELECT * FROM nadadores ORDER BY id")
        nadadores = db_cursor.fetchall()
        return nadadores
    except Exception as e:
        print("Error al obtener los datos de la tabla 'nadadores':", e)
    finally:
        db_cursor.close()
        db_connection.close()

def show_selections():
    db_connection = connect_to_database()
    db_cursor = db_connection.cursor()
    try:
        db_cursor.execute('''SELECT DISTINCT r.prueba FROM resultados r''')
        pruebas = db_cursor.fetchall()
        #Formatear la lista:

        pruebas_formateadas = [prueba[0] for prueba in pruebas]
        
        print('pruebas', pruebas_formateadas)

        return pruebas_formateadas
    except Exception as e:
        print("Error al obtener los datos de la tabla 'nadadores':", e)
    finally:
        db_cursor.close()
        db_connection.close()
def show_selections2():
    db_connection = connect_to_database()
    db_cursor = db_connection.cursor()
    try:
        db_cursor.execute('''SELECT DISTINCT c.nombre FROM competiciones c''')
        competiciones = db_cursor.fetchall()
        #Formatear la lista:
        competiciones_formateadas = [competicion[0] for competicion in competiciones]

        print('competiciones', competiciones_formateadas)

        return competiciones_formateadas
    except Exception as e:
        print("Error al obtener los datos:", e)
    finally:
        db_cursor.close()
        db_connection.close()

def insert_nadador(data):
    db_connection = connect_to_database()
    db_cursor = db_connection.cursor()
    try:
        # Ejecutar una consulta SQL de inserción utilizando los datos proporcionados
        data['nombre'] = url_decode(data['nombre'])
        data['apellido'] = url_decode(data['apellido'])

        query = "INSERT INTO nadadores (dni, nombre, apellido,genero) VALUES (%s, %s, %s, %s)"
        db_cursor.execute(query, (data['dni'], data['nombre'], data['apellido'], data['genero']))
        # Confirmar la transacción
        
        
        db_connection.commit()
    except Exception as e:
        print("Error al insertar el registro:", e)
        # Manejar cualquier error
    finally:
        db_cursor.close()
        db_connection.close()

def parse_post_data(environ):
    # Obtener el tamaño de los datos POST
    content_length = int(environ.get('CONTENT_LENGTH', 0))
    if content_length > 0:
        # Leer los datos POST del cuerpo de la solicitud
        post_data = environ['wsgi.input'].read(content_length).decode('utf-8')
        # Parsear los datos como pares clave-valor
        data_pairs = post_data.split('&')
        data = {}
        for pair in data_pairs:
            key, value = pair.split('=')
            data[key] = value
        return data

def redirect_to_main(environ, start_response):
    # Redirigir al usuario a la página principal (cambia la URL según tu estructura)
    status = '302 Found'
    response_headers = [('Location', '/crud')]  # Cambia la URL de redirección según tu estructura
    start_response(status, response_headers)
    return [b'']


def delete_nadador(nadador_id):
    db_connection = connect_to_database()
    db_cursor = db_connection.cursor()
    try:
        # Realiza una consulta SQL para eliminar el registro por su ID
        db_cursor.execute("DELETE FROM nadadores WHERE id = %s", (nadador_id,))
        # Confirmar la transacción
        db_connection.commit()
    except Exception as e:
        print("Error al eliminar el registro:", e)
        # Manejar cualquier error
    finally:
        db_cursor.close()
        db_connection.close()


def update_nadador(data):

    db_connection = connect_to_database()
    db_cursor = db_connection.cursor()
    
    try:
        # Ejecutar una consulta SQL de actualización utilizando los datos proporcionados
        query = "UPDATE nadadores SET dni = %s, nombre = %s, apellido = %s, genero = %s WHERE id = %s"
        db_cursor.execute(query, (data['dni'], data['nombre'], data['apellido'], data['genero'], data['id']))
        # Confirmar la transacción
        db_connection.commit()
        print(f'Datos actualizados: {data}')
    except Exception as e:
        print("Error al actualizar el registro:", e, data)
    finally:
        db_cursor.close()
        db_connection.close()