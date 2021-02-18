from flask import Flask, request, Response, abort
from flask_cors import CORS, cross_origin



import mysql.connector
import flask
import json

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="tp4api"
)

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/todo', methods=['GET', 'POST'])
@cross_origin()
def Todo():
    if request.method == 'GET':
        dbcursor = db.cursor()
        dbrequest = "SELECT * FROM t_task"
        dbcursor.execute(dbrequest)
        result = dbcursor.fetchall()
        dbcursor.close()
        json_data = json.dumps(result, ensure_ascii=False).encode('utf-8')
        return Response(json_data, mimetype='text/json'), 200

    elif request.method == 'POST':
        dbcursor = db.cursor()
        params = request.get_json()
        title = params['title']
        description = params['description']
        deadline = params['deadline']
        done = params['done']
        dbrequest = "INSERT INTO t_task (title, description, deadline, done) VALUES ('%s','%s','%s','%s')" % (title, description, deadline, done)
        dbcursor.execute(dbrequest)
        dbcursor.close()
        return 'entry added', 200

    else:
        abort(400)

@app.route('/task/<id>', methods=['GET', 'PATCH', 'PUT', 'DELETE'])
@cross_origin()
def Task(id):
    if request.method == 'GET':
        dbcursor = db.cursor()
        dbrequest = "SELECT * FROM t_task WHERE id = " + id
        dbcursor.execute(dbrequest)
        result = dbcursor.fetchall()
        dbcursor.close()
        json_data = json.dumps(result, ensure_ascii=False).encode('utf-8')
        return Response(json_data, mimetype='text/json'), 200

    elif request.method == 'PATCH':
        #not done
        return 404

    elif request.method == 'PUT':
        dbcursor = db.cursor()
        params = request.get_json()
        title = params['title']
        description = params['description']
        deadline = params['deadline']
        done = params['done']
        dbrequest = "UPDATE t_task SET title='%s', description='%s', deadline='%s', done='%s' WHERE id = '%s'" % (title, description, deadline, done, id)
        dbcursor.execute(dbrequest)
        dbcursor.close()
        return 'entry updated', 200

    elif request.method == 'DELETE':
        dbcursor = db.cursor()
        dbrequest = "DELETE FROM t_task WHERE id =" + id
        dbcursor.execute(dbrequest)
        return 'entry deleted', 200