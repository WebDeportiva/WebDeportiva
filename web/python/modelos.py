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
        db_cursor.execute("SELECT * FROM nadadores")
        nadadores = db_cursor.fetchall()
        return nadadores
    except Exception as e:
        print("Error al obtener los datos de la tabla 'nadadores':", e)
    finally:
        db_cursor.close()
        db_connection.close()
