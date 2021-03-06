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
import uuid



app = Flask(__name__)
CORS(app)

client = MongoClient('localhost', 27017)
db = client['pluslogistics']
coll_marcas = db.marcas
coll_ottareas = db.ottareas
coll_ot = db.ot
coll_usuarios = db.usuarios


connstring = """DRIVER={ODBC Driver 17 for SQL Server};
            Server=190.110.196.148,1433;
            Database=vwe;
            UID=sa;
            PWD=13XBnone;"""

connstring_total = """DRIVER={ODBC Driver 17 for SQL Server};
            Server=siscal.pluslogistics.com.ec,3112;
            Database=pluslogistics;
            UID=sa;
            PWD=13xbnone;"""

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods = ['POST'])
def login():
    datos = request.json
    resp = coll_usuarios.find_one({'usuario':datos['usuario'], 'clave':datos['clave']})
    if resp == None:
        resp = {}
        resp['empresa'] = False
    response = make_response(dumps(resp, sort_keys=False, indent=2, default=json_util.default))
    response.headers['content-type'] = 'application/json'
    return(response)

@app.route('/fileupload', methods=['POST'])
def fileupload():
        try:
            print("entro en post")
            print(request.files)
            resp = []
            for f in request.files:
                file = request.files[f]
                unique_filename = str(uuid.uuid4()) + '.' + file.filename.split('.')[-1] 
                resp.append(unique_filename)
                # file.save(os.path.join('imagenes', file.filename))
                file.save(os.path.join('imagenes', unique_filename))
            # resp['msg'] = 'ok'
            response = make_response(dumps(resp, sort_keys=False, indent=2, default=json_util.default))
            response.headers['content-type'] = 'application/json'
            return(response)
        except Exception as e:
            print(str(e))
            return {'status': 'ERROR', 'msg': 'no'}, 400

@app.route('/images/<imagename>')
def images(imagename):
    try:
        w = int(request.args['w'])
        h = int(request.args['h'])
    except (KeyError, ValueError):
        return send_from_directory('imagenes', imagename)
    return send_from_directory('imagenes', imagename)

@app.route('/updatesql_novedades', methods=['PUT'])
def updatesql_novedades():
    datos = request.json
    # fechaactual = time.strftime("%d/%m/%Y %H:%M")
    conn = pyodbc.connect(connstring)
    cursor = conn.cursor()
    sql = sqls.sql_update_novedades.format(datos['chasis'])
    cursor.execute(sql)
    cursor.close()
    conn.commit()
    conn.close()
    resp = {}
    resp['msg'] = 'ok'
    response = make_response(dumps(resp, sort_keys=False, indent=2, default=json_util.default))
    response.headers['content-type'] = 'application/json'
    return(response)



@app.route('/put_ot', methods=['PUT'])
def put_ot():
    datos = request.json
    fechaactual = time.strftime("%d/%m/%Y %H:%M")
    
    if datos['estado'] != 'proformada':
        for t in datos['tareas']:
            del t['_id']


    datosupdate = {}
    datosupdate['tareas'] = datos['tareas']
    datosupdate['imagenes'] = datos['imagenes']
    datosupdate['estado'] = datos['estado']
    if datos['estado'] == 'proformada':
        datosupdate['fechaproforma'] = fechaactual
        datosupdate['usuarioproforma'] = datos['usuarioproforma']
    elif datos['estado'] == 'cerrada':
        datosupdate['fechacierre'] = fechaactual
        datosupdate['usuariocierraot'] = datos['usuariocierraot']

    coll_ot.update_one(
        {'chasis': datos['chasis']},
        {'$set': datosupdate }
        )
    resp = {}
    resp['msg'] = 'ok'
    response = make_response(dumps(resp, sort_keys=False, indent=2, default=json_util.default))
    response.headers['content-type'] = 'application/json'
    return(response)

@app.route('/get_ottareas', methods=['GET'])
def get_ottareas():
    resp = coll_ottareas.find({})
    response = make_response(dumps(resp, sort_keys=False, indent=2, default=json_util.default))
    response.headers['content-type'] = 'application/json'
    return(response)

@app.route('/post_ot', methods=['POST'])
def post_ot():
    datos = request.json
    datos['estado'] = 'abierta'
    fechaactual = time.strftime("%d/%m/%Y %H:%M")
    datos['fecha'] = fechaactual
    coll_ot.insert_one(datos)
    resp = {}
    resp['msg'] = 'ok'
    response = make_response(dumps(resp, sort_keys=False, indent=2, default=json_util.default))
    response.headers['content-type'] = 'application/json'
    return(response)

@app.route('/get_ot/<estado>', methods=['GET'])
def get_ot(estado):
    
    resp = coll_ot.find({'estado': estado})
    if estado == 'cerrada' or estado == 'proformada':
        resp1 = []
        for r in resp:
            total = 0
            numtareas = 0
            for t in r['tareas']:
                total += t['tarifa']
                numtareas += 1
            r['total'] = round(total,2)
            r['numtareas'] = numtareas
            numnovedades = 0
            for t in r['novedades']:
                numnovedades += 1
            r['numnovedades'] = numnovedades
            resp1.append(r)
        resp = resp1

    response = make_response(dumps(resp, sort_keys=False, indent=2, default=json_util.default))
    response.headers['content-type'] = 'application/json'
    return(response)


@app.route('/getsecuencia/<marca>', methods=['GET'])
def getsecuencia(marca):
    resp = coll_marcas.find_one({'nombre':marca})
    resp['secuencia'] = str(resp['secuencia']).zfill(3)
    coll_marcas.update(
        { 'nombre': marca },
        { '$inc': { "secuencia": 1 } }
    )
    fechaactual = time.strftime("%d/%m/%Y")
    resp['fecha'] = fechaactual
    response = make_response(dumps(resp, sort_keys=False, indent=2, default=json_util.default))
    response.headers['content-type'] = 'application/json'
    return(response)



@app.route('/getnovedades', methods=['POST'])
def getnovedades():
    usuario = request.json
    patio = usuario['patio']
    conn = pyodbc.connect(connstring)
    cursor = conn.cursor()
    sql = sqls.sql_novedades.format(patio, patio)
    cursor.execute(sql)
    results = []
    campos = sqls.campos_novedades
    arrcampos = campos.split(',')
    for r in cursor:
        d = dict(zip(arrcampos, r))
        d['fecha'] = str(d['fecha'])
        results.append(d)
    columnas = []
    for c in arrcampos:
        d = {}
        d[c] = {'title': c}
        columnas.append(d)

    resp = {}
    resp['columnas'] = columnas
    resp['datos'] = results
    response = make_response(dumps(resp, sort_keys=False, indent=2, default=json_serial))
    response.headers['content-type'] = 'application/json'
    return(response)

@app.route('/getnovedadeschasis/<chasis>', methods=['GET'])
def getnovedadeschasis(chasis):
    conn = pyodbc.connect(connstring)
    cursor = conn.cursor()
    sql = sqls.sql_novedades_chasis.format(chasis,chasis,chasis,chasis,chasis,chasis,chasis,chasis,chasis,chasis,chasis,chasis)
    cursor.execute(sql)
    results = []
    campos = 'ubicacion,parte,observacion,zona,medida,novedades'
    arrcampos = campos.split(',')
    for r in cursor:
        # d = dict(zip(arrcampos, r))
        d = {}
        d['ubicacion'] = r[0]
        d['parte'] = r[1]
        d['observacion'] = r[13]
        d['zona'] = r[14]
        d['medida'] = r[15]
        danios = ''
        for i in [2,3,4,5,6,7,8,9,10,11,12]:
            if r[i]:
                danios += r[i] + ','
        d['novedades'] = danios[:-1]
        results.append(d)
    columnas = []
    dcols = {}
    for c in arrcampos:
        dcols[c] = {'title': c}
        columnas.append(dcols)

    

    resp = {}
    resp['columnas'] = dcols
    resp['datos'] = results
    response = make_response(dumps(resp, sort_keys=False, indent=2, default=json_serial))
    response.headers['content-type'] = 'application/json'
    return(response)


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
    fechaactual = time.strftime("%d/%m/%y %H:%M")
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
    response = make_response(dumps(d, sort_keys=False, indent=2, default=json_serial))
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


