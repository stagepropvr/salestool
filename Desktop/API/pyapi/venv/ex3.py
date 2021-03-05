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

def computeSize(code,table):
    sum = 0
    codeSize = 0
    for i in code:
        codeSize += len(code[i])
        sum += table[i]*len(code[i])
    return sum+len(code)*8+codeSize
    
code = {}
@app.route('/huffman-compress/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def huffman(): 
    data = request.args.get('text')
    global code
    if(code != None):
        code.clear()
    frequency_table = computeFrequency(data)
    f_table = computeFrequency(data)
    nodes = initNodes(frequency_table)
    tree = createTree(frequency_table,nodes)
    generateCode(tree,'',code)
    return jsonify(compressed=codify(data,code), table=code,textSize= len(data)*8,compressedSize= computeSize(code,f_table))

def runlength_encode(data):
    count = 1
    result = ""
    for i in range(0,len(data)-1):
        if(data[i]==data[i+1]):
            count +=1
        else:
            result = result+str(count)+data[i]
            count = 1
    result = result+ str(count)+data[len(data)-1]
    return jsonify(compressed=result,textSize= len(data)*8,compressedSize= len(result)*8)

def runlength_decode(data):
    i = 0
    res = ""
    while i<len(data):
        j = i
        times = ""
        while(data[j].isdigit()):
            times = times + data[j]
            j+=1
        i = j+1
        for k in range(0,int(times)):
           res += data[j] 
    return res

def decimalToBinary(n): 
    binary = bin(n).replace("0b", "")
    return format(n, '09b')
    return str(n) 

def lzw_encode(data):
    code = {}
    output = ""
    i=0;
    j=0;
    while (i <len(data)-1):
        # Selects range of character which has to be checked
        for j in range(i+2,len(data)+1):  
            # If characters does not exist in dictionary
            if(code.get(data[i:j])==None):
                # Add to dictionary
                code[data[i:j]] = len(code)+256
                # Update Output 
                if(j-i==2):
                    output += decimalToBinary((ord(data[i:j-1])))
                else:
                    output += decimalToBinary((code[data[i:j-1]]))
                if(i==len(data)-1):
                    output += decimalToBinary((ord(data[i])))
                i=j-1
                break
            elif(j==len(data)):
                output += decimalToBinary((code.get(data[i:j])))
                i=j
    if(i == len(data)-1):
        output += decimalToBinary((ord(data[i])))

    return jsonify(compressed=output,textSize=len(data)*8,compressedSize=len(output))

def lzw_decode(data):
    code = {}
    output = ""

    for i in range(0,len(data),3):
        current = data[i:i+3]
        nextt = None if (i==len(data)-3) else data[i+3:i+6]
        if(nextt):
            if(code.get(current) and code.get(nextt)):
                current = code.get(current) if (code.get(current)) else current
                nextt = code.get(nextt) if (code.get(nextt)) else nextt
                code[str(256+len(code))] = str(current)+str(nextt)[0:3]
            else:
                current = code.get(current) if (code.get(current)) else current
                nextt = code.get(nextt) if (code.get(nextt)) else nextt
                code[str(256+len(code))] = str(current)+str(nextt)
            output += current
        else:
            output += code.get(current) if (code.get(current)) else current

    out = ""
    for i in range(0,len(output),3):
        print(output[i:i+3],chr(int(output[i:i+3])))
        out += chr(int(output[i:i+3]))
    return jsonify(compressed=out)


@app.route('/huffman-decompress/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def huffman_decompress(): 
    data = request.args.get('text')
    global code;
    print(code)
    return wordify(data,code)

@app.route('/runlength-compress/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def runlength_compress(): 
    data = request.args.get('text')
    return runlength_encode(data)

@app.route('/runlength-uncompress/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def runlength_uncompress(): 
    data = request.args.get('text')
    return runlength_decode(data)

@app.route('/lzw-compress/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def lzw_compress(): 
    data = request.args.get('text')
    return lzw_encode(data)

@app.route('/lzw-uncompress/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def lzw_uncompress(): 
    data = request.args.get('text')
    return lzw_decode(data)


if __name__ == "__main__":
    app.run()