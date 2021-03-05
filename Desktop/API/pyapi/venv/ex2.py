from flask import Flask,send_file,jsonify,request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Electric Calculator
def amps_to_w_converter(current,voltage,unit,pf,voltage_type):
    kw = 0;
    if(unit == 'dc'):
        kw = current * (voltage);
    elif(unit == 'ac-single'):
        kw = float(pf) * current * (voltage);
    elif(unit == 'ac-triple'):
        if(voltage_type == 'l-l'):
            kw = 1.732 * float(pf) * current * (voltage);
        elif(voltage_type == 'l-n'):
            kw = 3 * float(pf) * current * (voltage);
    return kw;        

def amps_to_va_converter(current,voltage,unit,voltage_type):
    kva = 0;
    if(unit == 'single'):
        kva = current * (voltage);
    elif(unit == 'three'):
        if(voltage_type == 'l-l'):
            kva = 1.732 *  current * (voltage/1000);
        elif(voltage_type == 'l-n'):
            kva = 3 * current * (voltage/1000);
    return kva;

def amps_to_volts_converter(current,unit,term2):
    kv = 0
    if(unit == 'watts'):
        kv = (term2/current);
    elif(unit == 'ohms'):
        kv = (term2*current);
    return kv;

def va_to_w_converter(va,pf):
    return va*pf 

def va_to_amps_converter(va,v,phase,voltage_type):
    amp = 0;
    if(phase == 'single'):
        amp =va/v;
    elif(phase == 'three'):
        if(voltage_type == 'l-l'):
            amp = va/(1.732*v)
        elif(voltage_type == 'l-n'):
            amp = va/(3*v);
    return amp;

def w_to_v_converter(w,a,ct,pf,vt):
    out = 0
    if(ct=='dc'):
        out = w/a;
    elif(ct=='ac-single'):
        out = w/(float(pf)*a); 
    elif(ct=='ac-triple'):
        if(vt == 'l-l'):
            out = w/(1.732*float(pf)*a)
        elif(vt == 'l-n'):
            out = w/(3*float(pf)*a)
    return out

def w_to_amps_converter(w,v,ct,pf,vt):
    out = 0
    if(ct=='dc'):
        out = w/v;
    elif(ct=='ac-single'):
        out = w/(float(pf)*v); 
    elif(ct=='ac-triple'):
        if(vt == 'l-l'):
            out = w/(1.732*float(pf)*v)
        elif(vt == 'l-n'):
            out = w/(3*float(pf)*v)
    return out

def v_to_w_converter(v,a,ct,pf,vt):

    out = 0;
    if(ct=='dc'):
        out = v*a;
    elif(ct=='ac-single'):
        out = v*float(pf)*a; 
    elif(ct=='ac-triple'):
        if(vt == 'l-l'):
            out = v*1.732*float(pf)*a;
        elif(vt == 'l-n'):
            out = v*3*float(pf)*a;
    return out;

def volts_to_amps_converter(v,type,type_unit):
    amps = 0

    if(type_unit == 'watts'):
        amps = type/v
    elif(type_unit == 'ohms'):
        amps = v/type; 
    return amps;

@app.route('/a2w/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def a2w_f():       
    current = request.args.get('i')
    voltage = request.args.get('v')
    unit = request.args.get('unit')
    pf = request.args.get('pf')
    voltage_type = request.args.get('vt')    
    return "Watts: "+str(amps_to_w_converter(float(current),float(voltage),unit,pf,voltage_type))

@app.route('/a2va/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def a2va_f():       
    current = request.args.get('i')
    voltage = request.args.get('v')
    unit = request.args.get('unit')
    voltage_type = request.args.get('vt')    
    return "Volt-Amps: "+str(amps_to_va_converter(float(current),float(voltage),unit,voltage_type))

@app.route('/a2v/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def a2v_f():       
    current = request.args.get('i')
    unit = request.args.get('unit')
    withh = request.args.get('with')    
    return "Volts: "+str(amps_to_volts_converter(float(current),unit,float(withh)))+" V"

@app.route('/va2a/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def va2a_f():       
    va = request.args.get('va')
    v = request.args.get('v')
    phase = request.args.get('phase')
    vt = request.args.get('vt')  
    return "Amps: "+str(va_to_amps_converter(int(va),int(v),phase,vt))+" A"


@app.route('/va2w/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def va2w_f():       
    va = request.args.get('va')
    pf = request.args.get('pf')
    return "Watts: "+str(va_to_w_converter(float(va),float(pf)))+" W"
 
@app.route('/w2va/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def w2va_f():       
    w = int(request.args.get('w'))
    pf = int(request.args.get('pf'))
    return "Volt-Amps: "+str(w/pf)+" VA"

@app.route('/w2v/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def w2v_f():       
    w = request.args.get('w');
    a = request.args.get('a');
    pf = request.args.get('pf');
    ct = request.args.get('ct');
    vt = request.args.get('vt');

    return "Volts: "+str(w_to_v_converter(float(w),float(a),ct,pf,vt))+" V"

@app.route('/w2j/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def w2j_f():       
    w = float(request.args.get('w'));
    t = float(request.args.get('t'));
    return "Joules: "+ str(w*t) +" J"

@app.route('/w2a/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def w2a_f():       
    w = request.args.get('w');
    v = request.args.get('v');
    pf = request.args.get('pf');
    ct = request.args.get('ct');
    vt = request.args.get('vt');

    return "Current: "+str(w_to_amps_converter(float(w),float(v),ct,pf,vt))+" A"

@app.route('/j2w/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def j2w_f():       
    j = int(request.args.get('j'))
    t = int(request.args.get('t'))
    return "Watts: "+str(j/t)+" W"

@app.route('/j2v/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def j2v_f():       
    j = int(request.args.get('j'))
    c = int(request.args.get('c'))
    return "Volts: "+str(j/c)+" V"

@app.route('/v2w/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def v2w_f():       
    a = request.args.get('a');
    v = request.args.get('v');
    pf = request.args.get('pf');
    ct = request.args.get('ct');
    vt = request.args.get('vt');

    return "Watts: "+str(v_to_w_converter(float(v),float(a),ct,pf,vt))+" W"

@app.route('/v2j/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def v2j_f():       
    v = float(request.args.get('v'))
    c = float(request.args.get('c'))
    return "Joules: "+str(v*c)+" J"

@app.route('/v2a/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def v2a_f():       
    v = float(request.args.get('v'))
    t = float(request.args.get('t'))
    u = (request.args.get('u'))

    return "Current : "+str(volts_to_amps_converter(v,t,u))+" A"

# End Of Electric Calculator
# Logarithm
def nearest_power(n):
    powe = 0;
    while(power(10,powe)<=n):
        powe = powe+1
    return powe-1;

def Log_fn(n):
    np = 0
    out=""

    for i in range(0,6):
        np = nearest_power(n); 
        if(out == ""):
            out += str(np)+'.'
        else: 
            out += str(np);
        n = n / power(10,np) 
        n = power(n,10) 
    return out 

@app.route('/log/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def log_f():       
    num = float(request.args.get("num"));  
    return "Log("+str(num)+"): "+str(Log_fn(num))

@app.route('/natural_log/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def natural_log_f():       
    num = float(request.args.get("num"));  
    return "Natural Log("+str(num)+"): "+str(float(Log_fn(num))*2.303)

@app.route('/antilog/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def antiloglog_f():       
    num = float(request.args.get("num"));  
    return "Anti Log("+str(num)+"): "+str(10**num)
# End of Loagarithm

# Gcf,lcm,roots
def gcd(a,b):    
    if (a == 0):
        return b
    if (b == 0):
        return a
    if (a == b):
        return a
    if (a > b):
        return gcd(a-b, b)
    return gcd(a, b-a)
 
def lcm(a,b):
    if a>b:
        max_num = a
    else:
        max_num = b
    while(True):
        if( max_num % a== 0 and max_num % b == 0):
            lcm = max_num
            break
        max_num = max_num + 1
    return lcm

@app.route('/gcf/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def gcf_f():       
    x = request.args.get("x");  
    y = request.args.get("y");  
    return "GCF: "+str(gcd(int(x),int(y)))

@app.route('/lcm/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def lcm_f():       
    x = request.args.get("x");  
    y = request.args.get("y");  
    return "LCM: "+str(lcm(int(x),int(y)))

@app.route('/root/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def root_f():       
    num = int(request.args.get("num"));  
    root = int(request.args.get("root"));  
    return "Root: "+str(num ** (1/root))

# end of Gcf,lcm,roots

# Trigonometery

def factorial(x):
    if(x == 0): 
        return 1;
    return x * factorial(x-1)

def power(n,x):
    if(x==0):
        return 1;
    out = n
    for i in range(1,x):
        out *= n
    return out;

def sine(angle):
    x = angle * (22/7)*(1/180)
    total = 0
    for n in range(0,10):
        ans = power(-1,n)*power(x,2*n+1)/factorial(2*n+1)
        total += ans;
    return total;

def cosine(angle):
    x = angle * (22/7)*(1/180);
    total = 0
    for n in range(0,10):
        ans = power(-1,n)*power(x,2*n)/factorial(2*n)
        total += ans;
    return total;

def tan(angle):
    if(cosine(angle)==0):
        return "Infinity"
    return sine(angle)/cosine(angle);
def cot(angle):
    if(sine(angle)==0):
        return "Infinity"

    return cosine(angle)/sine(angle)
def sec(angle):
    if(cosine(angle)==0):
        return "Infinity"
    return 1/cosine(angle)
def cosec(angle):
    if(sine(angle)==0):
        return "Infinity"
    return 1/sine(angle)

def trig(x,f):
    x = float(x)
    if (f =="sin"):
        return round(sine(x),3)
    elif (f =="cos"):
        return round(cosine(x),3)
    elif (f =="tan"):
        return round(tan(x),3)
    elif (f =="sec"):
        return round(sec(x),3)
    elif (f =="cosec"):
        return round(cosec(x),3)
    elif (f =="cot"):
        return round(cot(x),3)

def arccos(x):
    out = 0
    x = float(x)
    for n in range(0,6):
        up = factorial(2*n)*(x**((2*n)+1));
        down = (2**(2*n))*(factorial(n)**2)*((2*n) + 1)
        out += up/down; 
    out = (22/14) - out
    return out

def arctan(x):
    out = 0;
    x = float(x)
    for n in range(0,6):
        up = ((-1)**n)*(x**((2*n)+1));
        down = (2*n)+1
        out += up/down; 
    return out

def arcsin(x):
    out = (22/14) - arccos(x)
    return  out

@app.route('/trigonometry/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def trigonometry():       
    x = request.args.get("x");  
    f = request.args.get("func");
    return str(trig(x,f))

@app.route('/arcsin/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def arcsine():       
    degree = 180/(22/7);
    x = request.args.get("x");  
    return "Arcsin("+x+") = "+str(arcsin(x)*degree)

@app.route('/arccos/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def arccose():       
    degree = 180/(22/7);
    x = request.args.get("x");  
    return "Arccos("+x+") = "+str(arccos(x)*degree)

@app.route('/arctan/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def arctane():       
    degree = 180/(22/7);
    x = request.args.get("x");  
    return "Arctan("+x+") = "+str(arctan(x)*degree)

# End of trinometery
# Statistics
def mean(data):
    total = 0
    for i in range(0,len(data)):
        total = total + int(data[i]);
    return total/len(data);

def mean_of_squareddiffrence(data):
    total = 0;
    m = mean(data) 
    for i in range(0,len(data)):
        diffrence = int(data[i]) - m;
        squared_diffrence = diffrence*diffrence;
        total += squared_diffrence;
    return total/len(data);    

@app.route('/deviation/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def deviation():       
    data = request.args.get("data");  
    data = data.split(',')  
    return "Standard Deviation: "+str(round(mean_of_squareddiffrence(data) ** (1/2),2))

@app.route('/variance/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def variance():       
    data = request.args.get("data");  
    data = data.split(',')  
    return "Variance: "+str(round(mean_of_squareddiffrence(data),2))

def sume(data):
    total = 0
    for i in range(0,len(data)):
        total += int(data[i]);
    return total;


def sum_of_squares(data):
    total = 0
    for i in range(0,len(data)):
        total += int(data[i])*int(data[i])
    return total;

def sum_of_products(x,y):
    total = 0
    for i in range(0,len(x)):
        total += int(x[i])*int(y[i]);
    return total;

def linear_regression(x,y):
    x = x.split(",");
    y = y.split(",");

    sum_x = sume(x);
    sum_y = sume(y);
    sum_x2 = sum_of_squares(x);
    sum_y2 = sum_of_squares(y);
    sum_xy = sum_of_products(x,y)

    b = (sum_xy - (sum_x*sum_y)/len(x))/(sum_x2-((sum_x*sum_x)/len(x)));
    a = (sum_y - b*sum_x)/len(x);

    res = str(round(b,2))+"X + "+str(round(a,2))
    return(res)

@app.route('/linear_reg/', methods = ['GET','POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def linear_reg():       
    x = request.args.get("x");  
    y = request.args.get("y");  
    return "Linear Regression: "+linear_regression(x,y);

# End of Statistics
   
if __name__ == "__main__":
    app.run()