const express = require('express')
const app = express()
const port = 3000

// 1. Huffman
class Node{
    constructor(character,frequency){
        this.left = null
        this.right = null
        this.data = character
        this.freq = frequency
    }
}
function add(a,b){
    root = Node(a.data+b.data,a.freq+b.freq)
    if(a.freq<b.freq){
        root.left = a
        root.right = b
    }
    else{
        root.left = b
        root.right = a
    }
    return root
}

function computeFrequency(data){
    table = [];
    for(c in data)
    {
        if(table[c]==null){
            table[c] = 1
        }
        else{
            table[c] += 1
        }
    }
    return table
}
function initNodes(table){
    nodes = []
    for(key in table){
        nodes[key] = Node(key,table[key])
    }
    return nodes;
}

function generateCode(tree,route,code){ 
    if (!tree)
        return
    if (!tree.left && !tree.right)
    {
        code[tree.data] = route
        return
    }
    if(tree.left)
        generateCode(tree.left,route+'0',code)
    if (tree.right)
        generateCode(tree.right,route+'1',code)
}

function updateTable(table){
    data = []
    data.append(min(table, key=table.get))
    data.append(table[data[0]])
    table.pop(data[0])   

    data.append(min(table, key=table.get))
    data.append(table[data[2]])
    table.pop(data[2])

    table[data[0] + data[2]] = data[1] + data[3]
    return data
}

// function createTree(table,nodes){
//     while(len(table)!=1){
//         elements = updateTable(table)
//         node = add(nodes[elements[0]],nodes[elements[2]])
//         nodes.update({elements[0]+elements[2]: node})
//     }
//     return node
// }
// function codify(data,code):
//     out = ""
//     for c in data:
//         out += code[c]
//     return out

// function wordify(data,code):
//     word = ""
//     start = 0
//     codeInv = {v: k for k, v in code.items()}

//     for end in range(1,len(data)+1):
//         key = codeInv.get(data[start:end])
//         if(key != null): 
//             start = end
//             word += key
//         end+=1
//     return word

// 2.Run Length
function runlength_encode(data)
{
    var count = 1;
    var result = "";
    for(i=0;i<data.length-1;i++)
    {
        if(data[i]==data[i+1]){
            count +=1
        }
        else{
            result = result+count+data[i]
            count = 1
        }
    }
    result = result+ count+data[data.length-1]
    return({
        compressed:result,
        textSize: data.length*8,
        compressedSize: result.length*8
    })
}

function runlength_decode(data)
{
    var i = 0;
    var res = "";
    while(i<data.length)
    {
        j = i;
        times = "";
        while(Number.isInteger(parseInt(data[j])))
        {
            times = times + data[j]
            j++
        }
        i = j+1;
        for(k=0;k<parseInt(times);k++){
            res += data[j]            
        }
    }
    return res
}

function lzw_encode(data)
{
    code = [];
    output = "";
    i=0;
    j=0;
    while (i <data.length-1)
    {
        for(j=i+2;j<data.length+1;j++){
            if(!code[data.substring(i, j)])
            {
                code[data.substring(i, j)] = code.length+256
                if(j-i==2)
                    output += data.substring(i, j-1).charCodeAt(0)
                else
                    output += ((code[data.substring(i, j-1)]))
                if(i==data.length-1)
                    output += data[i].charCodeAt(0)
                i=j-1
                break
            }
            else if(j==data.length){
                output += code.get(data.substring(i, j))
                i=j
            }
        }
    }
    if(i == data.length-1)
        output += data[i].charCodeAt(0)

    return {
        compressed:output,
        textSize:data.length*8,
        compressedSize:output.length
    }
}

app.get('/runlength-compress', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    var data = req.query.text;
    res.send(runlength_encode(data))
  })

  app.get('/runlength-uncompress', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    var data = req.query.text;
    res.send(runlength_decode(data))
  })

  app.get('/lzw-compress', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    var data = req.query.text;
    res.send(lzw_encode(data))
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

