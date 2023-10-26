import psycopg2

def connect_to_database():
    try:
        connection = psycopg2.connect("dbname=bbdd_natacion user=xabigonz password=Administrador#3 host=pgsql03.dinaserver.com")
        print("Connected")
        return connection
    except psycopg2.Error as e:
        print("Error connecting to the database:", e)
        return None

# Luego puedes utilizar la función para conectarte a la base de datos


