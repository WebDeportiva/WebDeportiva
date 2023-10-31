from wsgiref.simple_server import make_server
from jinja2 import Environment, FileSystemLoader
import psycopg2
from modelos import get_nadadores

env = Environment(loader=FileSystemLoader('templates'))
template = env.get_template('index.html')


db_connection = psycopg2.connect( 
    database="bbdd_natacion",
    user="xabigonz",
    password="Administrador#3",
    host="pgsql03.dinaserver.com",
    port="5432"
)


db_cursor = db_connection.cursor()

# Define la función app que manejará las solicitudes.
def app(environ, start_response):
    path = environ.get('PATH_INFO')
    if path == '/':
        return handle_crud(environ, start_response)
    else:
        return handle_404(environ, start_response)

# Funciones para manejar las rutas específicas
def handle_crud(environ, start_response):

    registros = get_nadadores()

    # Realiza una consulta SQL para obtener información de la tabla 'nadadores'
    db_cursor.execute("SELECT * FROM nadadores")
    nadadores = db_cursor.fetchall()
    
    # Configura el entorno de Jinja2
    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template('index.html')
    
    # Renderiza la plantilla 'crud.html' con los datos de la tabla 'nadadores'
    response = template.render(registros=registros).encode('utf-8')
    
    status = '200 OK'
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    return [response]


def handle_404(environ, start_response):
    # Lógica para manejar una ruta no reconocida (404)
    status = '404 Not Found'
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    return [b'Pagina no encontrada']

if __name__ == "__main__":
    host = 'localhost'
    port = 8000

    httpd = make_server(host, port, app)
    print(f"Servidor en http://{host}:{port}")
    httpd.serve_forever()
