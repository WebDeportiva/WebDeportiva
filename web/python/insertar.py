from conexion import connect_to_database


def insertar_valores():
    dni = input('Inserta el DNI: ')
    nombre = input('Inserta el Nombre: ')
    apellido = input('Inserta el Apellido: ')
    genero = input('Inserta el Genero: ')
    return dni, nombre, apellido, genero


conectar = connect_to_database()
dni, nombre, apellido, genero = insertar_valores()

if conectar:
    cursor = conectar.cursor()
    cursor.execute('INSERT INTO nadadores (dni, nombre, apellido, genero) VALUES (%s, %s, %s, %s)',
               (dni, nombre, apellido, genero))
    cursor.execute("SELECT * FROM nadadores")
    data = cursor.fetchall()
    conectar.commit()
    for row in data:
        print(row)
    conectar.close()
