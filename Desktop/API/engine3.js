var python = 'http://127.0.0.1:5000/';
var js = 'http://localhost:3000/';
var php_server = 'http://localhost:81/api/index.php/'

function generateTable(data)
{
    var data = (Object.entries(data))
    var table = '<div style="overflow-y: auto;height: 160px;"><table class="table table-hover"><thead><tr class="bg-danger" style="color:white"><th scope="col">S.no</th><th scope="col">Character</th><th scope="col">Code</th></tr></thead>'
    for(var i=0; i<data.length; i++)
    {
        table += '<tr><th scope="row">'+i+'</th><td>"'+data[i][0]+'"</td><td>'+data[i][1]+'</td></tr>'
    }
    table += '</table></div>';
    return table
}

function computeSize(textSize,compressedSize,div){
    var compressionRatio = Math.floor(((textSize-compressedSize)/textSize)*100)
    var sizeButtons = '<button class="btn btn-danger">Text Size: '+(textSize)+' Bits</button><button class="btn btn-success">Compressed Size: '+compressedSize+' Bits</button><button class="btn btn-primary">Compression Ratio: '+compressionRatio+'%</button>'
    document.getElementById(div).innerHTML = sizeButtons 
} 
function huffman_compress(){
    var text = document.getElementById('huffman_compress_input').value;

    let request = new XMLHttpRequest();            
    request.open('GET', python+'huffman-compress?text='+text);
    request.responseType = 'json';  
    request.onload = function() {
        document.getElementById('answer_py').innerHTML = request.response.compressed 
        document.getElementById('table-huffman').innerHTML = generateTable(request.response.table)   
        document.getElementById('huffman_decompress_input').value = request.response.compressed  
        computeSize(request.response.textSize,request.response.compressedSize,'huffman-buttons');
    };
    request.send();
}

function lossless_compress(){
    var text = document.getElementById('lossless_compress_input').value;

    let request = new XMLHttpRequest();            
    request.open('GET', python+'huffman-compress?text='+text);
    request.responseType = 'json';  
    request.onload = function() {
        document.getElementById('answer_py').innerHTML = request.response.compressed 
        document.getElementById('lossless_decompress_input').value = request.response.compressed  
        computeSize(request.response.textSize,request.response.compressedSize,'lossless-buttons');
    };
    request.send();
}

function huffman_decompress(){
    var text = document.getElementById('huffman_decompress_input').value;
    let request = new XMLHttpRequest();            
    request.open('GET', python+'huffman-decompress?text='+text);
    request.responseType = 'text';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer_py').innerHTML = request.response
    };
    request.send();
}

function lossless_decompress(){
    var text = document.getElementById('lossless_decompress_input').value;
    let request = new XMLHttpRequest();            
    request.open('GET', python+'huffman-decompress?text='+text);
    request.responseType = 'text';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer_py').innerHTML = request.response
    };
    request.send();
}

function runlength_compress(){
    var text = document.getElementById('runlength_compress_input').value;
    
    let request = new XMLHttpRequest();            
    request.open('GET', python+'runlength-compress?text='+text);
    request.responseType = 'json';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer_py').innerHTML = request.response.compressed
        document.getElementById('runlength_decompress_input').value = request.response.compressed
        computeSize(request.response.textSize,request.response.compressedSize,'runlength-buttons')
    };
    request.send();

    let request2 = new XMLHttpRequest();            
    request2.open('GET', js+'runlength-compress?text='+text);
    request2.responseType = 'json';  
    request2.onload = function() {
        console.log(request2.response)
        document.getElementById('answer').innerHTML = request2.response.compressed
    };
    request2.send();
}

function runlength_uncompress(){
    var text = document.getElementById('runlength_decompress_input').value;
    let request = new XMLHttpRequest();            
    request.open('GET', python+'runlength-uncompress?text='+text);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer_py').innerHTML = request.response
    };
    request.send();

    let request2 = new XMLHttpRequest();            
    request2.open('GET', js+'runlength-uncompress?text='+text);
    request2.responseType = 'text';  
    request2.onload = function() {
        document.getElementById('answer').innerHTML = request2.response
    };
    request2.send();
}

function lzw_compress(){
    var text = document.getElementById('lzw_compress_input').value;
    let request = new XMLHttpRequest();            
    request.open('GET', python+'lzw-compress?text='+text);
    request.responseType = 'json';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer_py').innerHTML = request.response.compressed
        computeSize(request.response.textSize,request.response.compressedSize,'lzw-buttons')
    };
    request.send();

    let request2 = new XMLHttpRequest();            
    request2.open('GET', js+'lzw-compress?text='+text);
    request2.responseType = 'json';  
    request2.onload = function() {
        document.getElementById('answer').innerHTML = request2.response.compressed
    };
    request2.send();
}


function lzw_uncompress(){
    var text = document.getElementById('lzw_decompress_input').value;
    let request = new XMLHttpRequest();            
    request.open('GET', python+'lzw-uncompress?text='+text);
    request.responseType = 'json';  
    request.onload = function() {
        document.getElementById('answer_py').innerHTML = request.response.compressed
        // computeSize(request.response.textSize,request.response.compressedSize,'lzw-buttons')
    };
    request.send();
}
