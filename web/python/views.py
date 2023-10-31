from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader('templates'))
template = env.get_template('index.html')  # Asegúrate de tener 'index.html' en tu carpeta de templates

# Función para manejar la ruta '/crud'
def handle_crud(environ, start_response, db_cursor):
    # Realiza una consulta SQL para obtener información de la tabla 'nadadores'
    db_cursor.execute("SELECT * FROM nadadores")
    nadadores = db_cursor.fetchall()

    template = env.get_template('index.html')  # Asegúrate de tener 'crud.html' en tu carpeta de templates

    # Renderiza la plantilla 'crud.html' con los datos de la tabla 'nadadores'
    response = template.render(nadadores=nadadores).encode('utf-8')

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
