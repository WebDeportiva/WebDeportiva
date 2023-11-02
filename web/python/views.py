from jinja2 import Environment, FileSystemLoader
import os

env = Environment(loader=FileSystemLoader('web/python/templates'))
template = env.get_template('index.html')

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


# Función para servir archivos estáticos
def serve_static(environ, start_response):
    static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static'))
    path = environ['PATH_INFO']

    if not path.startswith('./static'):
        start_response('404 Not Found', [('Content-type', 'text/plain')])
        return [b'Not Found']
    else:
        # Obtiene la extensión del archivo solicitado
        _, file_extension = os.path.splitext(path)

        # Mapea extensiones a tipos MIME
        mime_types = {
            '.css': 'text/css',
            '.js': 'application/javascript',
        }

        # Determina el tipo MIME del archivo solicitado
        mime_type = mime_types.get(file_extension, 'application/octet-stream')

        # Construye la ruta completa del archivo
        file_path = os.path.join(static_dir, path)

        try:
            with open(file_path, 'rb') as file:
                file_content = file.read()
                start_response('200 OK', [('Content-type', mime_type)])
                return [file_content]
        except FileNotFoundError:
            start_response('404 Not Found', [('Content-type', 'text/plain')])
            return [b'File Not Found']
        except Exception as e:
            start_response('500 Internal Server Error', [('Content-type', 'text/plain')])
            return [str(e).encode('utf-8')]



def handle_404(environ, start_response):
    # Lógica para manejar una ruta no reconocida (404)
    status = '404 Not Found'
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    return [b'Pagina no encontrada']
