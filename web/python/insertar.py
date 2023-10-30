from urllib import request
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from conexion import connect_to_database
from jinja2 import Environment, FileSystemLoader


env = Environment(loader=FileSystemLoader('../html/templates'))
app = env.get_template('crud.html')
# Define la clase base para declarar modelos
Base = declarative_base()

# Clase Nadador (modelo de datos)
class Nadador(Base):
    __tablename__ = 'nadadores'

    id = Column(Integer, primary_key=True)
    dni = Column(String)
    nombre = Column(String)
    apellido = Column(String)
    genero = Column(String)

    def __init__(self, dni, nombre, apellido, genero):
        self.dni = dni
        self.nombre = nombre
        self.apellido = apellido
        self.genero = genero

# Función para conectar a la base de datos utilizando SQLAlchemy
def connect_to_database():
    # Especifica la URL de la base de datos, por ejemplo:
    database_url = 'postgresql://xabigonz:Administrador#3@pgsql03.dinaserver.com/bbdd_natacion'
    engine = create_engine(database_url)
    return engine

# Función para insertar un nadador en la base de datos
def insertar_nadador(engine, dni, nombre, apellido, genero):
    Session = sessionmaker(bind=engine)
    sesion = Session()

    # Crea una instancia de la clase Nadador
    nadador = Nadador(dni=dni, nombre=nombre, apellido=apellido, genero=genero)

    # Agrega el nadador a la sesión y lo inserta en la base de datos
    sesion.add(nadador)
    sesion.commit()

    # Cierra la sesión
    sesion.close()

# Función para obtener datos de la base de datos
def get_data(engine):
    Session = sessionmaker(bind=engine)
    sesion = Session()
    
    # Realiza una consulta para obtener todos los registros de la tabla 'nadadores'
    registros = sesion.query(Nadador).all()
    
    for registro in registros:
        print(f'ID: {registro.id}, DNI: {registro.dni}, Nombre: {registro.nombre}')

    sesion.close()

def insertar_valores():
    if request.method == ['POST']:
        dni = request.form['dni']
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        genero = request.form['genero']
        return dni, nombre, apellido, genero

if __name__ == "__main__":
    # Conectar a la base de datos utilizando SQLAlchemy
    engine = connect_to_database()

    # Crear tablas en la base de datos (si no existen)
    Base.metadata.create_all(engine)

    # Insertar un nadador en la base de datos
    dni, nombre, apellido, genero = insertar_valores()
    insertar_nadador(engine, dni, nombre, apellido, genero)

    # Obtener datos de la base de datos
    get_data(engine)