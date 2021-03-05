from flask import Flask,send_file,jsonify,request
from flask_cors import CORS, cross_origin
import pyqrcode 
import png 
from pyqrcode import QRCode 
import io
import base64
import code128
from PIL import Image
import math
import random 
from captcha.image import ImageCaptcha
import json
import hashlib
import base64
from Crypto.Util.number import *
from Crypto import Random
import Crypto
import libnum
import sys

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/diffrence/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def diffrence():
    frm = request.args.get("from");    
    to = request.args.get("to");    

    frm = frm.split('T');
    to = to.split('T');

    from_date = frm[0].split('-');
    to_date = to[0].split('-');

    from_date[0] = int(from_date[0])
    from_date[1] = int(from_date[1])
    from_date[2] = int(from_date[2])
    to_date[0] = int(to_date[0])
    to_date[1] = int(to_date[1])
    to_date[2] = int(to_date[2])


    result = [0,0,0];
    days = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    result[0] = 0;

    if(to_date[0] > from_date[0]):
        to_date[1] = (to_date[1]) + 12*((to_date[0])-from_date[0])

    if(from_date[2] < to_date[2]):
        result[1] = (to_date[1]) - (from_date[1]); 
        result[2] = (to_date[2]) - (from_date[2]); 

    if(from_date[2] > to_date[2]):
        result[1] = to_date[1] - from_date[1] - 1; 
        result[2] = days[(from_date[1])]-(from_date[2]) + (to_date[2]);

    if(from_date[2] == to_date[2]):
        result[1] = to_date[1] - from_date[1];
        result[2] = 0;

    while(result[1] > 12):
        result[0] = result[0]+1;
        result[1] -= 12;

    return str(result[0])+" years "+str(result[1])+" months "+str(result[2])+" days";

@app.route('/union/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def union():      
    set_a = request.args.get("a");
    set_b = request.args.get("b");
    a = set_a.split(",");
    b = set_b.split(",");
    
    for i in b:
        if i in a:
            continue
        else:
            a.append(i)
    return str(a)


@app.route('/minus/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def minus():      
    set_a = request.args.get("a");
    set_b = request.args.get("b");
    a = set_a.split(",");
    b = set_b.split(",");
    
    c = a[:]
    for i in c:
        print(i)
        if i in b:
            print(str(i) + " is in b")
            a.remove(i)
    print(a)
    return str(a)

@app.route('/intersection/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def intersection():      

    set_a = request.args.get("a");
    set_b = request.args.get("b");
    a = set_a.split(",");
    b = set_b.split(",");
    
    c = []
    for i in a:
        if i in b:
            c.append(i)

    return str(c)

@app.route('/otp/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def otp():      

    length = int(request.args.get("length"))
    mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_+-={}[]:";\'>?,./|\\';

    result = "";
    for i in range(length):
        result += mask[math.floor(random.random() * len(mask))]; 

    return result


@app.route('/qrcode/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def hello_world():
    st = request.args.get("data");  
    url = pyqrcode.create(st) 
    s = io.BytesIO()
    url.png(s,scale = 6) 
    res = str("data:image/png;base64, "+base64.b64encode(s.getvalue()).decode("utf-8"))
    return res

@app.route('/barcode/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def barc():
    st = request.args.get("data");    
    code128.image(st).save("barcode.png")  # with PIL present
    image_binary = open("barcode.png",'rb').read()
    image = str("data:image/png;base64, "+base64.b64encode(image_binary).decode("utf-8"))

    return image;


def getName(num):

    first = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    tens = ['', '', 'Twenty ','Thirty ','Forty ','Fifty ', 'Sixty ','Seventy ','Eighty ','Ninety '];
    result = ""

    if((math.floor(num/100))%10):
        result = first[math.floor(num/100)%10]+"Hundred "; 
        num = num%100;

    if(math.floor(num/10) == 1):
        result += first[num];  
    else: 
        result += tens[math.floor(num/10)] + first[num%10]; 

    return result;

def getCurrencyName(code):
      if (code == "INR"):
          return 'Indian Rupees'
      if (code == "USD"):
          return 'United States Dollars'
      if (code == "EUR"):
          return 'European euro'
      if (code == "QAR"):
          return 'Qatari riyal'
      if (code == "RUB"):
          return 'Russian ruble'
      else: 
          return code; 
        

@app.route('/numberinwords/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def numberinwords():
    
    result = "";
    inp = request.args.get("num").split(' ');
    number = int(inp[0])
    currency = getCurrencyName(inp[1])    

    if(math.floor(number/10000000)):
        crores = math.floor(number/10000000); 

        if(math.floor(crores/100000)):
            result +=  getName(math.floor(crores/100000)) + "Lakh ";
            crores = crores %100000;                        
        
        if(math.floor(crores/1000)):
            result += getName(math.floor(crores/1000)) +" Thousand ";
            crores = crores%1000;
        
        result += getName(crores) + "Crores ";
        number = number %10000000;

    if(math.floor(number/100000)):
        result +=  getName(math.floor(number/100000)) + "Lakh ";
        number = number %100000;                        
    
    if(math.floor(number/1000)):
        result += getName(math.floor(number/1000)) +" Thousand ";
        number = number%1000;

    result += getName(number);
    return (result+' '+currency);
      
@app.route('/captcha/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def captcha():
    image_captcha = ImageCaptcha()

    length = 7
    mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    result = "";
    for i in range(length):
        result += mask[math.floor(random.random() * len(mask))]; 

    captcha_text = result
    image = image_captcha.generate_image(captcha_text)
    image_file = "./captcha.png"
    image_captcha.write(captcha_text, image_file)

    image_binary = open("captcha.png",'rb').read()
    image = str("data:image/png;base64, "+base64.b64encode(image_binary).decode("utf-8"))

    return image;

@app.route('/transpose/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def transpose():
    X = json.loads(request.args.get('matrix'))
    result = [[X[j][i] for j in range(len(X))] for i in range(len(X[0]))]

    return jsonify(result)

@app.route('/diagonol/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def diagonol():
    original = json.loads(request.args.get('matrix'))
    typ = int(request.args.get('type'))
    size = len(original);
    
    for i in range(size):
        for j in range(size):
            if(i>j and typ==1):
                original[i][j] = ' '
            if(i+j >= size and typ == 2):
                original[i][j] = ' '
            if(i+j < size-1 and typ == 3):
                original[i][j] = ' '
            if(i<j and typ==4):
                original[i][j] = ' '
    
    return jsonify(original)

@app.route('/checksum/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def checksum():       
    words = request.args.get("words")
    result = hashlib.md5(words.encode())
    return result.hexdigest()
   
privatekey=0;
n=0;

@app.route('/rsa-enc/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def rsa_enc():
    global privatekey,n       
    bits=300
    msg = request.args.get("message");
    p = Crypto.Util.number.getPrime(bits, randfunc=Crypto.Random.get_random_bytes)
    q = Crypto.Util.number.getPrime(bits, randfunc=Crypto.Random.get_random_bytes)
    n = p*q
    PHI=(p-1)*(q-1)
    e=65537
    privatekey=libnum.invmod(e,PHI)
    m=  bytes_to_long(msg.encode('utf-8'))
    c=pow(m,e,n)
    return str(c);

@app.route('/rsa-dec/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def rsa_dec():       
    data = int(request.args.get("data"));
    res=str(long_to_bytes(pow(data,privatekey,n)))
    return res[1:];
    
if __name__ == "__main__":
    app.run()