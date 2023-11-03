import psycopg2

def connect_to_database():
    # Configura la conexión a la base de datos PostgreSQL
    db_connection = psycopg2.connect(
            database="bbdd_natacion",
            user="xabigonz",
            password="Administrador#3",
            host="pgsql03.dinaserver.com",
            port="5432"
    )

    return db_connection

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


def insert_nadador(data):
    db_connection = connect_to_database()
    db_cursor = db_connection.cursor()
    try:
        # Ejecutar una consulta SQL de inserción utilizando los datos proporcionados
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