import flask 
from flask import request, jsonify
from flask_cors import CORS, cross_origin
from operations import *

app = flask.Flask(__name__,template_folder='template')
app.config["DEBUG"] = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
def home():
    return '''<h1>API homepage</h1>
<p>API for set operations.</p>'''


@app.route('/union', methods = ['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def union():
    print('at start')
    content = request.get_json()
    #print(type(content))

    a = content["A"]
    b = content["B"]
    #print(a)
    
    res = union_op(a, b)
    return jsonify(res)

@app.route('/difference', methods = ['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def diff():
    print('at start')
    content = request.get_json()
    #print(type(content))

    a = content["A"]
    b = content["B"]
    #print(a)
    
    res = diff_op(a, b)
    return jsonify(res)

@app.route('/intersect', methods = ['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def intersect():
    print('at start')
    content = request.get_json()
    #print(type(content))

    a = list(dict.fromkeys(content["A"]))
    b = list(dict.fromkeys(content["B"]))
    #print(a)
    
    res = intersect_op(a, b)
    return jsonify(res)


app.run(host='127.0.0.1', port = 5010)