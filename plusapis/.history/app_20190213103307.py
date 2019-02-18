from flask import Flask, render_template, make_response, request, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
from bson import json_util
import datetime
import time
from datetime import timedelta, date, datetime
import os
from bson.objectid import ObjectId
import coneccion
import sqls
import pyodbc 

app = Flask(__name__)
CORS(app)


connstring = """Driver={SQL Server};
            Server=apis.backoffice.com.ec;
            Database=generalm;
            UID=sa;
            PWD=13XBnone;"""

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getmantenimientos_sr', methods=['GET'])
def getmantenimientos_sr():
    conn = pyodbc.connect(connstring)
    cursor = conn.cursor()
    campos = sqls.campos_mantenimientos_sr
    arrcampos = campos.split(',')
    sql = sqls.sql_mantenimientos_sr
    cursor.execute(sql)
    results = []
    for r in cursor:
        d = dict(zip(arrcampos, r))
        results.append(d)
    response = make_response(dumps(results, sort_keys=False, indent=2, default=json_serial))
    response.headers['content-type'] = 'application/json'
    return(response)

@app.route('/putmantenimientos_sr', methods=['POST'])
def postmantenimientos_sr():
    conn = pyodbc.connect(connstring)
    cursor = conn.cursor()
    datos = request.json
    sql = sqls.post_sql_mantenimientos_sr.format(datos['numero_orden'],datos['numero_bastidor'],datos['tipo_comercial'],datos['codigo_tipo_comercial'],datos['ldm'],datos['ldc'],datos['matricula'],datos['kilometraje'],datos['anio_modelo'],datos['matriculacion'],datos['asesor_servicio'],datos['fecha'])
    cursor.execute(sql)
    results = {}
    results['msg'] = 'OK'
    response = make_response(dumps(results, sort_keys=False, indent=2, default=json_serial))
    response.headers['content-type'] = 'application/json'
    return(response)


@app.route('/getdata', methods=['POST'])
def getData():
    datos = request.json
    fe1 = datetime.strptime(str(datos['fe1']), "%Y-%m-%d %H:%M")
    fe2 = datetime.strptime(str(datos['fe2']), "%Y-%m-%d %H:%M")
    conn = pyodbc.connect('Driver={SQL Server};'
                        'Server=apis.backoffice.com.ec;'
                        'Database=generalm;'
                        'UID=sa;'
                        'PWD=13XBnone;')
    cursor = conn.cursor()
    sql = sqls.sql1.format(datos['fe1'], datos['fe2'], datos['origen'], datos['fe1'], datos['fe2'], datos['origen'] )
    cursor.execute(sql)
    results = []
    arrcampos = sqls.campos1.split(',')
    for r in cursor:
        d = dict(zip(arrcampos, r))
        d['FECHA INSPECCION'] = d['FECHA INSPECCION'].strftime("%Y-%m-%d %H:%M")
        results.append(d)
    response = make_response(dumps(results, sort_keys=False, indent=2, default=json_serial))
    response.headers['content-type'] = 'application/json'
    return(response)


@app.route('/localidades')
def localidades():
    conn = pyodbc.connect('Driver={SQL Server};'
                        'Server=apis.backoffice.com.ec;'
                        'Database=generalm;'
                        'UID=sa;'
                        'PWD=13XBnone;')
    cursor = conn.cursor()
    sql = sqls.sql2
    cursor.execute(sql)
    results = []
    arrcampos = sqls.campos2.split(',')
    for r in cursor:
        d = dict(zip(arrcampos, r))
        results.append(d)
    response = make_response(dumps(results, sort_keys=False, indent=2, default=json_serial))
    response.headers['content-type'] = 'application/json'
    return(response)

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8000, debug=True)
