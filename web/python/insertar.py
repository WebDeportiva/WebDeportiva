import psycopg2
from sqlalchemy import create_engine
from sqlalchemy import text
from sqlalchemy.orm import sessionmaker
from jinja2 import Environment, FileSystemLoader

try:
    # Conectar a la base de datos
    conectar_bbdd = psycopg2.connect("dbname=bbdd_natacion user=xabigonz password=Administrador#3 host=pgsql03.dinaserver.com")

    # Crear un engine para comunicarse con la base de datos
    engine = create_engine('postgresql://xabigonz:Administrador#3@pgsql03.dinaserver.com/bbdd_natacion')

    # Comprobar si la conexión al engine se realizó con éxito
    if engine:
        print("Conexión a la base de datos exitosa")

    # Crear una sesión
    Sesion = sessionmaker(bind=engine)
    sesion = Sesion()


    query = text('SELECT * FROM nadadores') 
    # Ejecutar una consulta SQL personalizada
    result = sesion.execute(query)

    # Obtener los resultados de la consulta
    registros = result.fetchall()

    # Configurar el entorno Jinja2
    env = Environment(loader=FileSystemLoader('../templates'))
    
    # Cargar la plantilla HTML
    template = env.get_template('index.html')

    # Renderizar la plantilla con los datos de la consulta
    html_output = template.render(registros=registros)

    # Cierra la sesión
    sesion.close()

    # Aquí puedes hacer lo que desees con html_output, como guardarlo en un archivo o mostrarlo en una aplicación web.

except Exception as e:
    print("Error en la conexión o consulta:", str(e))
