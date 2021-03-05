from flask import Flask,send_file,jsonify,request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class Node:
    def __init__(self,character,frequency):
        self.left = None
        self.right = None
        self.data = character
        self.freq = frequency

def add(a,b):
    root = Node(a.data+b.data,a.freq+b.freq)
    if(a.freq<b.freq):
        root.left = a
        root.right = b
    else:
        root.left = b
        root.right = a

    return root

def computeFrequency(data):
    table = {}
    for c in data:
        if(table.get(c)==None):
            table[c] = 1
        else:
            table[c] += 1
    return table

def initNodes(table):
    nodes = {}
    for key in table:
        nodes[key] = Node(key,table[key])
    return nodes;

def generateCode(tree,route,code): 
    if (not tree):
        return
    if (not tree.left and not tree.right):
        code[tree.data] = route
        return
    if tree.left:
        generateCode(tree.left,route+'0',code)
    if tree.right:
        generateCode(tree.right,route+'1',code)

def updateTable(table):
    data = []
    data.append(min(table, key=table.get))
    data.append(table[data[0]])
    table.pop(data[0])   

    data.append(min(table, key=table.get))
    data.append(table[data[2]])
    table.pop(data[2])

    table[data[0] + data[2]] = data[1] + data[3]
    return data

def createTree(table,nodes):
    while(len(table)!=1):
        elements = updateTable(table)
        node = add(nodes[elements[0]],nodes[elements[2]])
        nodes.update({elements[0]+elements[2]: node})
    return node

def codify(data,code):
    out = ""
    for c in data:
        out += code[c]
    return out

def wordify(data,code):
    word = ""
    start = 0
    codeInv = {v: k for k, v in code.items()}

    for end in range(1,len(data)+1):
        key = codeInv.get(data[start:end])
        if(key != None): 
            start = end
            word += key
        end+=1
    return word

@app.route('/huffman/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def huffman(): 
    data = 'ghiriharivvz'
    frequency_table = computeFrequency(data)
    nodes = initNodes(frequency_table)
    tree = createTree(frequency_table,nodes)
    code = {}
    generateCode(tree,'',code)
    print(code)
    return wordify(codify(data,code),code)

if __name__ == "__main__":
    app.run()