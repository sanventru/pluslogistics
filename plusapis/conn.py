import pyodbc 
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=siscal.pluslogistics.com.ec\\none;'
                      'Database=generalm;'
                      'UID=sa;'
                      'PWD=13xbnone;')

cursor = conn.cursor()
cursor.execute('SELECT * FROM tcolor')

for row in cursor:
    print(row)