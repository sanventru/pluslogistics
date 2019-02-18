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
            Server=190.110.196.148;
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

@app.route('/getmantenimientos', methods=['GET'])
def getmantenimientos():
    conn = pyodbc.connect(connstring)
    cursor = conn.cursor()
    campos = sqls.campos_mantenimientos
    arrcampos = campos.split(',')
    sql = sqls.sql_mantenimientos
    cursor.execute(sql)
    results = []
    for r in cursor:
        d = dict(zip(arrcampos, r))
        results.append(d)
    response = make_response(dumps(results, sort_keys=False, indent=2, default=json_serial))
    response.headers['content-type'] = 'application/json'
    return(response)



@app.route('/postmantenimientos', methods=['POST'])
def postmantenimientos():
    fechaactual = time.strftime("%d/%m/%y")
    results = {}
    try:
        conn = pyodbc.connect(connstring)
        cursor = conn.cursor()
        datos = request.json
        sql = sqls.post_sql_mantenimientos.format(datos['numeroorden'],datos['numerobastidor'],datos['tipocomercial']
        ,datos['codigotipocomercial'],datos['ldm'],datos['ldc'],datos['matricula'],datos['kilometraje'],datos['aniomodelo']
        ,datos['matriculacion'],datos['asesorservicio'],fechaactual,datos['lugar'],datos['ind1'],datos['b1r1'],datos['c1'],datos['ind2']
        ,datos['b1r2'],datos['c2'],datos['ind3 '],datos['b1r3'],datos['c3'],datos['ind4'],datos['b1r4'],datos['c4']
        ,datos['ind5'],datos['b2r1'],datos['c5'],datos['ind6'],datos['b2r2'],datos['c6'],datos['ind7'],datos['b3r1']
        ,datos['c7'],datos['ind8'],datos['b3r2'],datos['c8'],datos['ind9'],datos['b4r1'],datos['c9'],datos['ind10']
        ,datos['b4r2'],datos['c10'],datos['ind11'],datos['b5r1'],datos['c11'],datos['ind12'],datos['b5r2'],datos['c12'])
        cursor.execute(sql)
        cursor.close()
        conn.commit()
        conn.close()
        results['msg'] = 'OK'
    except Exception as e:
        results['msg'] = str(e)
    response = make_response(dumps(results, sort_keys=False, indent=2, default=json_serial))
    response.headers['content-type'] = 'application/json'
    return(response)


@app.route('/getdatachasis/<chasis>', methods=['GET'])
def getdatachasis(chasis):
    conn = pyodbc.connect(connstring)
    cursor = conn.cursor()
    sql = "select ve_modelo, mo_secuencial from tvehiculo where ve_chasis='{}'".format(chasis)
    cursor.execute(sql)
    results = []
    campos = "ve_modelo,mo_secuencial"
    arrcampos = campos.split(',')
    for r in cursor:
        d = dict(zip(arrcampos, r))
        results.append(d)
    response = make_response(dumps(results, sort_keys=False, indent=2, default=json_serial))
    response.headers['content-type'] = 'application/json'
    return(response)


@app.route('/getdata', methods=['POST'])
def getData():
    datos = request.json
    fe1 = datetime.strptime(str(datos['fe1']), "%Y-%m-%d %H:%M")
    fe2 = datetime.strptime(str(datos['fe2']), "%Y-%m-%d %H:%M")
    conn = pyodbc.connect(connstring)
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
    conn = pyodbc.connect(connstring)
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


