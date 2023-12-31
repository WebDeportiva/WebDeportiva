from jinja2 import Environment, FileSystemLoader
import os
import urllib.parse

env = Environment(loader=FileSystemLoader('web/python/templates'))

template = env.get_template('index.html')

def url_decode(input_string):
    return urllib.parse.unquote(input_string)

env.filters['url_decode'] = url_decode

def serve_static(environ, start_response):
    # static_dir = './static'  
    static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static'))
    print('static_dir', static_dir)
    path = environ['PATH_INFO']
    #css_path = 'e:/Proyectos_Python/Ej_mvc/static/style.css'
    js_path = static_dir + '\js\script.js'
    main_js_path = static_dir + '\js\script_main.js'
    envivo_js_path = static_dir + '\js\script_envivo.js'
    css_path = static_dir +'\css\style.css'

    #DIRECTORIO DEL MAIN_CSS
    main_css_path = static_dir + '\css\style_main.css'

    #DIRECTORIO DE IMAGENES
    img_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static', 'img'))


    if not path.startswith('/static/'):
        start_response('404 Not Found', [('Content-type', 'text/plain')])
        return [b'Not Found']
    
        #CSS DEL CRUD
    elif path.startswith('/static/css/'):
        if path.endswith('style.css'):
            # Serve the file
            try:
                with open(css_path, 'rb') as file:
                    cssFile = file.read()
                    start_response('200 OK', [('Content-type', 'text/css')]) 
                    return [cssFile]      
            except Exception as e:
                start_response('500 Internal Server Error', [('Content-type', 'text/plain')])
                return [str(e).encode('utf-8')]
        else:
            try:
                with open(main_css_path, 'rb') as file:
                    main_cssFile = file.read()
                    start_response('200 OK', [('Content-type', 'text/css')]) 
                    return [main_cssFile]      
            except Exception as e:
                start_response('500 Internal Server Error', [('Content-type', 'text/plain')])
                return [str(e).encode('utf-8')]
        

        # JAVASCRIPT DEL CRUD
    elif path.startswith('/static/js/'):
        if path.endswith('script.js'):
            try:
                with open(js_path, 'rb') as file:
                    jsFile = file.read()
                    start_response('200 OK', [('Content-type', 'application/js')]) 
                    return [jsFile]      
            except Exception as e:
                start_response('500 Internal Server Error', [('Content-type', 'text/plain')])
                return [str(e).encode('utf-8')]
        elif path.endswith('envivo.js'):
            try:
                with open(envivo_js_path, 'rb') as file:
                    jsFile = file.read()
                    start_response('200 OK', [('Content-type', 'application/js')]) 
                    return [jsFile]      
            except Exception as e:
                start_response('500 Internal Server Error', [('Content-type', 'text/plain')])
                return [str(e).encode('utf-8')]
        else:
            try:
                with open(main_js_path, 'rb') as file:
                    jsFile = file.read()
                    start_response('200 OK', [('Content-type', 'application/js')]) 
                    return [jsFile]      
            except Exception as e:
                start_response('500 Internal Server Error', [('Content-type', 'text/plain')])
                return [str(e).encode('utf-8')]
        

        #SIN MAS LAS FOTOS
    elif path.startswith('/static/img/'):
        # Obtén el nombre de la imagen desde la URL
        image_name = os.path.basename(path)
        image_path = os.path.join(img_folder, image_name)

        try:
            with open(image_path, 'rb') as file:
                image_data = file.read()

            content_type = 'image/jpeg'  # Tipo de contenido predeterminado
            if image_name.endswith('.png'):
                content_type = 'image/png'
            elif image_name.endswith('.jpg') or image_name.endswith('.jpeg'):
                content_type = 'image/jpeg'
            elif image_name.endswith('.gif'):
                content_type = 'image/gif'

            start_response('200 OK', [('Content-type', content_type)])
            return [image_data]
        except FileNotFoundError:
            start_response('404 Not Found', [('Content-type', 'text/plain')])
            return [b'Not Found']
        except Exception as e:
            start_response('500 Internal Server Error', [('Content-type', 'text/plain')])
            return [str(e).encode('utf-8')]




def handle_404(environ, start_response):
    # Lógica para manejar una ruta no reconocida (404)
    status = '404 Not Found'
    response_headers = [('Content-type', 'text/html')]
    start_response(status, response_headers)
    return [b'Pagina no encontrada']
