from wsgiref.simple_server import make_server
from jinja2 import Environment, FileSystemLoader
import os
from modelos import get_nadadores, insert_nadador, parse_post_data, redirect_to_main, delete_nadador, update_nadador, show_selections, show_selections2, cambiar_tabla
from views import serve_static


env = Environment(loader=FileSystemLoader('web/python/templates'))
template = env.get_template('index.html')


# Define la función app que manejará las solicitudes.
def app(environ, start_response):
    path = environ.get('PATH_INFO')
    print(path)
    template
    if path == '/':
        return handle_main(environ, start_response)
    elif path.startswith('/ranking'):
        return handle_ranking(environ,start_response)
    elif path.startswith('/aboutus'):
        return handle_about(environ,start_response)
    elif path.startswith('/static/'):
        return serve_static(environ, start_response)
    elif path.startswith('/crud'):
        return handle_crud(environ, start_response)
        
    else:
        return handle_404(environ, start_response)

# Funciones para manejar las rutas específicas
def handle_crud(environ, start_response):
    if environ['REQUEST_METHOD'] == 'GET':
        # Manejar solicitudes GET para mostrar datos
        registros = get_nadadores()
        response = template.render(registros=registros).encode('utf-8')
        status = '200 OK'
        response_headers = [('Content-type', 'text/html')]
        start_response(status, response_headers)
        return [response]
    elif environ['REQUEST_METHOD'] == 'POST':
        # Manejar solicitudes POST para insertar, eliminar o actualizar datos
        post_data = parse_post_data(environ)
        if post_data:
            if 'id' in post_data:
                nadador_id = int(post_data['id'])
                if 'action' in post_data and post_data['action'] == 'delete':
                    delete_nadador(nadador_id)  # Llama a la función para eliminar el registro
                elif 'action' in post_data and post_data['action'] == 'update':
                    update_nadador(post_data)  # Llama a la función para actualizar el registro
            else:
                insert_nadador(post_data)  # Llama a la función para insertar el registro
            # Redirigir al usuario a la página principal después de la acción
            return redirect_to_main(environ, start_response)
    else:
        return handle_404(environ, start_response)

    

def handle_insert(environ, start_response):
    if environ['REQUEST_METHOD'] == 'POST':
        # Obtener los datos del formulario enviado
        post_data = parse_post_data(environ)   
        # Llamar a la función para insertar el registro
        insert_nadador(post_data)
    # Redirigir a la página principal o mostrar un mensaje de éxito
    redirect_to_main(environ, start_response)


def handle_main(environ, start_response):
    # Cargar la plantilla específica para otra página
    template = env.get_template('main.html')
    response = template.render().encode('utf-8')
    status = '200 OK'
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    return [response]

def handle_ranking(environ, start_response):
    template = env.get_template('ranking.html')

    if environ['REQUEST_METHOD'] == 'POST':
        post_data = parse_post_data(environ)
        print(post_data)
        resultados_json = cambiar_tabla(post_data)
        response = template.render(resultados_json=resultados_json).encode('utf-8')
        print(resultados_json)
        status = '200 OK'
        response_headers = [('Content-type', 'text/html')]
        start_response(status, response_headers)
        return [response]

    # Mostrar las opciones del selector PRUEBAS para las solicitudes GET
    pruebas = show_selections()
    competiciones = show_selections2()

    response = template.render(pruebas=pruebas, competiciones=competiciones).encode('utf-8')
    status = '200 OK'
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    return [response]

def handle_about(environ, start_response):
    template = env.get_template('about_us.html')
    response = template.render().encode('utf-8')
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
