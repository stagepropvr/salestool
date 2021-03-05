const express = require('express')
const app = express()
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const crypto = require('crypto');
var QRCode = require('qrcode')
var JsBarcode = require('jsbarcode');

const port = 3000

app.get('/diffrence', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    var from = req.query.from;
    var to = req.query.to;
  
    var from = from.split('T');
    var to = to.split('T');

    var from_date = from[0].split('-');
    var to_date = to[0].split('-');

    var result = [];
    var days = [0,31,28,31,30,31,30,31,31,30,31,30,31];
    result[0] = 0;

    if(to_date[0] > from_date[0])
    {
        to_date[1] = parseInt(to_date[1]) + 12*(to_date[0]-from_date[0])
    }

    if(from_date[2] < to_date[2])
    {
        result[1] = to_date[1] - from_date[1]; //months
        result[2] = to_date[2] - from_date[2]; //days
    }

    if(from_date[2] > to_date[2])
    {
        result[1] = to_date[1] - from_date[1] - 1; //months
        result[2] = days[parseInt(from_date[1])]-(from_date[2]) + parseInt(to_date[2]);
    }

    if(from_date[2] == to_date[2])
    {
        result[1] = to_date[1] - from_date[1]; //months
        result[2] = 0;
    }

    while(result[1] > 12)
    {
        result[0]++;
        result[1] -= 12;
    }

  res.send(result[0]+" years "+result[1]+" months "+result[2]+" days");
  
})

app.get('/union', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var set_a = req.query.a;
  var set_b = req.query.b;
  
  var a = set_a.split(",");
  var b = set_b.split(",");

  var c = a.reduce(function(a,b){
      if (a.indexOf(b) < 0 ) a.push(b);
      return a;
  },[]);

  for(var i=0; i<b.length; i++)
  {
      if(c.indexOf(b[i]) == -1)c.push(b[i]);
  }

  res.send("Union: "+c);
})

app.get('/minus', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var set_a = req.query.a;
  var set_b = req.query.b;
  
  var a = set_a.split(",");
  var b = set_b.split(",");

  for(var i=0; i<b.length; i++)
  {
      var index = a.indexOf(b[i]);
      if(index != -1){
          a.splice(index,1);
      };
  }
   
  res.send("Minus: "+a);
})

app.get('/intersection', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var set_a = req.query.a;
  var set_b = req.query.b;
  
  var a = set_a.split(",");
  var b = set_b.split(",");
  var c = [];

  for(var i=0; i<a.length; i++)
  {
      var index = b.indexOf(a[i]);
      if(index != -1){
          c.push(a[i]);
      };
  }

  res.send("Intersection: "+c);
})

app.get('/otp', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var length = req.query.length;
  var mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_+-={}[]:";\'>?,./|\\';

  var result = "";
  for (var i = 0; i < length; i++){
      result += mask[Math.floor(Math.random() * mask.length)];
  } 

  res.send(result);  
})
 
function getName(num){

    const first = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
    const tens = ['', '', 'Twenty ','Thirty ','Forty ','Fifty ', 'Sixty ','Seventy ','Eighty ','Ninety '];
    var result = ""

    if((Math.floor(num/100))%10){
        result = first[Math.floor(num/100)%10]+"Hundred "; //For Hundred
        num = num%100;
    } 

    if(Math.floor(num/10) == 1)result += first[num]; // For 11 - 19
    else result += tens[Math.floor(num/10)] + first[num%10]; // Rem Numbers

    return result;

}

function getCurrencyName(code){
  switch(code)
    {
      case "INR":return 'Indian Rupees'; break;
      case "USD":return 'United States Dollars'; break;
      case "EUR":return 'European euro'; break;
      case "QAR":return 'Qatari riyal'; break;
      case "RUB":return 'Russian ruble'; break;
      default: return code; break; 
        
    }
}

app.get('/numberinwords', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var result = "";
  var input = req.query.num.split(' ');
  var number = input[0]
  var currency = getCurrencyName(input[1]);

  if(Math.floor(number/10000000)){
      var crores = Math.floor(number/10000000); 

      if(Math.floor(crores/100000)){
          result +=  getName(Math.floor(crores/100000)) + "Lakh ";
          crores = crores %100000;                        
      }
      if(Math.floor(crores/1000)){
          result += getName(Math.floor(crores/1000)) +" Thousand ";
          crores = crores%1000;
      }

      result += getName(crores) + "Crores ";
      number = number %10000000;
  }
  if(Math.floor(number/100000)){
      result +=  getName(Math.floor(number/100000)) + "Lakh ";
      number = number %100000;                        
  }
  if(Math.floor(number/1000)){
      result += getName(Math.floor(number/1000)) +" Thousand ";
      number = number%1000;
  }

  result += getName(number);


  res.send(result+' '+currency);  
})



app.get('/transpose', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var original = JSON.parse(req.query.matrix);  
  
  var copy = [];
  for (var i = 0; i < original.length; ++i) {
      for (var j = 0; j < original[i].length; ++j) {
          // skip undefined values to preserve sparse array
          if (original[i][j] === undefined) continue;
          // create row if it doesn't exist yet
          if (copy[j] === undefined) copy[j] = [];
          // swap the x and y coords for the copy
          copy[j][i] = original[i][j];
      }
  }
  
  res.send(copy);  
})

app.get('/diagonol', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var original = JSON.parse(req.query.matrix);  
  var type = req.query.type;
  var size = original.length;
  
  for (var i = 0; i < size; i++) { 
      for (var j = 0; j < size; j++) 
      {
          if(i>j && type==1)original[i][j] = "";
          if(i+j >= size && type == 2)original[i][j] = "";
          if(i+j < size-1 && type == 3)original[i][j] = "";
          if(i<j && type==4)original[i][j] = "";
      } 
  } 
  
  res.send(original);  
})

function uniqueCaptcha(){
    var min=5, max=7;
    var length = Math.floor(min + Math.random()*(max + 1 - min));
    var mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_+-={}[]:";\'>?,./|\\';

    var result = "";
    for (var i = 0; i <= length; i++){
        result += mask[Math.floor(Math.random() * mask.length)];
    }

  return result; 
}

app.get('/captcha', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var code;
    var str = uniqueCaptcha();
    var captcha = str.split("");
    
    var canv = createCanvas(300, 70)
    canv.id = "captcha";
    canv.width = 300;
    canv.height = 70;
    var ctx = canv.getContext("2d");

    var color = ['red','blue','green','yellow'];
    var grd = ctx.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, color[randomIntFromInterval(0,3)] );
    grd.addColorStop(0.5, color[randomIntFromInterval(0,3)]);
    grd.addColorStop(1, color[randomIntFromInterval(0,3)]);

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.strokeRect(0, 0, canv.width, canv.height);


    ctx.font = "50px Georgia";
    ctx.strokeText(captcha.join(""), 10, 50);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");

        ctx.beginPath();
        ctx.arc(randomIntFromInterval(20,300),randomIntFromInterval(0,50) , randomIntFromInterval(20,80), 0, 2 * Math.PI);
        ctx.stroke();
                
        ctx.moveTo(0, randomIntFromInterval(0,50));
        ctx.lineTo(300, randomIntFromInterval(0,100));
        ctx.stroke();
    
        ctx.moveTo(0,randomIntFromInterval(30,40));
        ctx.lineTo(300, randomIntFromInterval(0,100));
        ctx.stroke();

        ctx.moveTo(randomIntFromInterval(30,250),0);
        ctx.lineTo(randomIntFromInterval(100,500), 100);
        ctx.stroke();
        
  res.send(str+"thecaptchafollows"+canv.toDataURL());  
})


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

app.get('/checksum',(req,res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    var text = req.query.words;
    var hash = crypto.createHash('md5').update(text).digest('hex');
    res.send(hash)
});


app.get('/qrcode',(req,res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  const generateQR = async text => {
    try {
      res.send(await QRCode.toDataURL(text))
    } catch (err) {
      console.error(err)
    }
  }

  generateQR(req.query.code);
});

app.get('/barcode',(req,res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var text = req.query.text;

    var canvas = createCanvas();
    JsBarcode(canvas, text,{displayValue:false})
    res.send(canvas.toDataURL());
});


// Standard Deviation And Variance

function mean(data)
{
    var total = 0
    for(var i=0; i<data.length; i++)
    {
        total += parseInt(data[i]);
    }
    return total/data.length;
}

function mean_of_squareddiffrence(data)
{
    var total = 0;
    var m = mean(data) 
    for(var i=0; i<data.length; i++)
    {
        var diffrence = data[i] - m;
        var squared_diffrence = diffrence*diffrence;
        total += squared_diffrence;
    }
    return total/data.length;    
}
 
app.get('/deviation', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var raw_a = req.query.data;
  var a = raw_a.split(',')
  res.send("Standard Deviance: "+(mean_of_squareddiffrence(a) ** (1/2)).toFixed(2))
  
})


app.get('/variance', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var raw_a = req.query.data;
  var a = raw_a.split(',')
  res.send("Variance: "+(mean_of_squareddiffrence(a)).toFixed(2))
  
})

// Linear Regression
function sum(data)
{
    var total = 0
    for(var i=0; i<data.length; i++)
    {
        total += parseInt(data[i]);
    }
    return total;
}


function sum_of_squares(data)
{
    var total = 0
    for(var i=0; i<data.length; i++)
    {
        total += parseInt(data[i])*parseInt(data[i]);
    }
    return total;
}


function sum_of_products(x,y)
{
    var total = 0
    for(var i=0; i<x.length; i++)
    {
        total += parseInt(x[i])*parseInt(y[i]);
    }
    return total;
}

function linear_regression(x,y){
    x = x.split(",");
    y = y.split(",");

    var sum_x = sum(x);
    var sum_y = sum(y);
    var sum_x2 = sum_of_squares(x);
    var sum_y2 = sum_of_squares(y);
    var sum_xy = sum_of_products(x,y)

    var b = (sum_xy - (sum_x*sum_y)/x.length)/(sum_x2-((sum_x*sum_x)/x.length));
    var a = (sum_y - b*sum_x)/x.length;

    var res = b.toFixed(2)+"X + "+a.toFixed(2)
    return(res)

}  


app.get('/linear_reg', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var x = req.query.x;
  var y = req.query.y;

  res.send("Linear Regression: "+linear_regression(x,y))
  
})

// Trignometry

function factorial(x)
{
    if(x == 0) return 1;
    return x * factorial(x-1)
}


function power(n,x)
{
    if(x==0)return 1;
    var out = n
    for(var i=1; i<x; i++)
    {
        out *= n
    }
    return out;
}


function sine(angle)
{
    var x = angle * (22/7)*(1/180);
    var total = 0, ans;
    for(var n=0; n<10;n++)
    {
        ans = power(-1,n)*power(x,2*n+1)/factorial(2*n+1)
        total += ans;
    }
    return total.toFixed(1);
}


function cosine(angle)
{
    var x = angle * (22/7)*(1/180);
    var total = 0, ans;
    for(var n=0; n<10;n++)
    {
        ans = power(-1,n)*power(x,2*n)/factorial(2*n)
        total += ans;
    }
    return total.toFixed(1);
}

function tan(angle){return sine(angle)/cosine(angle)};
function cot(angle){return cosine(angle)/sine(angle)};
function sec(angle){return 1/cosine(angle)};
function cosec(angle){return 1/sine(angle)};


function trig(x,f)
{
  switch(f){
      case "sin":
        return sine(x);
      case "cos":
        return cosine(x);
      case "tan":
        return tan(x);
      case "sec":
        return sec(x);
      case "cosec":
        return cosec(x);
      case "cot":
        return cot(x);
    default:
      return "error"
    }
}

function arccos(x)
{
    var out = 0;
    for(var n=0; n<6; n++)
    {
        var up = factorial(2*n)*(x**((2*n)+1));
        var down = (2**(2*n))*(factorial(n)**2)*((2*n) + 1)
        out += up/down; 
    }
    out = (22/14) - out
    return out
}

function arctan(x){
    var out = 0;
    for(var n=0; n<6; n++)
    {
        var up = ((-1)**n)*(x**((2*n)+1));
        var down = (2*n)+1
        out += up/down; 
    }
    return out
}

var degree = 180/(22/7);
 
function arcsin(x)
{
  var out = (22/14) - arccos(x)
    return  out
}

app.get('/trigonometry', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var x = req.query.x;
  var f = req.query.func;
  
  res.send(""+trig(x,f))
  
})

app.get('/arcsin', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var x = req.query.x;
 
  res.send("Arcsin("+x+") = "+arcsin(x)*degree)
})

app.get('/arccos', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var x = req.query.x;
 
  res.send("Arccos("+x+") = "+arccos(x)*degree)
})

app.get('/arctan', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var x = req.query.x;
 
  res.send("Arctan("+x+") = "+arctan(x)*degree)
})


// (GCF,LCM, Squre-root, Cube-root and Nth-root
function gcf(a,b) {
    if (b > a) {var temp = a; a = b; b = temp;}

    while (true) {
        if (b == 0){
            return a
        } 
        a %= b;
        if (a == 0){
            return b
        } 
        b %= a;
    }
}

function lcm(a,b){
    let min = (a > b) ? a : b;

    while (true) {
        if (min % a == 0 && min % b == 0) {
            return min
        }
        min++;
    }
}

app.get('/gcf', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var x = req.query.x;
  var y = req.query.y;
 
  res.send("GCF: "+gcf(x,y))
})

app.get('/lcm', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var x = req.query.x;
  var y = req.query.y;
 
  res.send("LCM: "+lcm(x,y))
})

app.get('/root', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var num = req.query.num;
  var root = req.query.root;
 
  res.send("Root: "+ num ** (1/root))
})

// Logarithm

function nearest_power(n)
{
    var pow = 0;
    while(power(10,pow)<=n)
    {
        pow++;
    }
    return pow-1;
}

function Log_fn(n) 
{ 
    var np,out="";

    for(var i=0; i<6; i++){
        np = nearest_power(n); //1
        if(out == "")out += np.toString()+'.';
        else out += np.toString();
        n = n / power(10,np) //3
        n = power(n,10) 
    }
    return out;
} 

app.get('/log', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var num = req.query.num;
  res.send("Log("+num+"): "+Log_fn(num))
})

app.get('/natural_log', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var num = req.query.num;
  res.send("Natural Log("+num+"): "+Log_fn(num) * 2.303)
})

app.get('/antilog', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var num = req.query.num;
  res.send("Anti Log: "+ 10 ** num)
})

function amps_to_w_converter(current,voltage,unit,pf,voltage_type){

    var kw = 0;

    if(unit == 'dc')
    {
        kw = current * (voltage);
    }
    else if(unit == 'ac-single')
    {
        kw = pf * current * (voltage);
    }
    else if(unit == 'ac-triple')
    {
        if(voltage_type == 'l-l')
        {
            kw = 1.732 * pf * current * (voltage);
        }
        else if(voltage_type == 'l-n')
        {
            kw = 3 * pf * current * (voltage);
        }
    }
    return kw;        
}

function amps_to_va_converter(current,voltage,unit,voltage_type){

    var kva = 0;
    if(unit == 'single')
    {
        kva = current * (voltage);
    }
    else if(unit == 'three')
    {
        if(voltage_type == 'l-l')
        {
            kva = 1.732 *  current * (voltage/1000);
        }
        else if(voltage_type == 'l-n')
        {
            kva = 3 * current * (voltage/1000);
        }
    }
    return kva;
}

function amps_to_volts_converter(current,unit,term2){
    var kv = 0
    if(unit == 'watts')
    {
        kv = (term2/current);
    }else if(unit == 'ohms')
    {
        kv = (term2*current);
    }
  return kv;
}


function va_to_w_converter(va,pf)
{
    return va*pf 
}

function va_to_amps_converter(va,v,phase,voltage_type){
    
    var amp = 0;
    if(phase == 'single')
    {
        amp =va/v;
    }
    else if(phase == 'three')
    {    
        if(voltage_type == 'l-l')
        {
            amp = va/(1.732*v)
        }
        else if(voltage_type == 'l-n')
        {
            amp = va/(3*v);
        }
    }
    return amp;
}

function w_to_v_converter(w,a,ct,pf,vt){
    var out = 0
    if(ct=='dc'){
        out = w/a;
    }
    else if(ct=='ac-single')
    {
        out = w/(pf*a); 
    }
    else if(ct=='ac-triple'){
        if(vt == 'l-l')out = w/(1.732*pf*a)
        else if(vt == 'l-n')out = w/(3*pf*a)
    }
    return out
}

function w_to_amps_converter(w,v,ct,pf,vt){

  var out = 0
    if(ct=='dc'){
        out = w/v;
    }
    else if(ct=='ac-single')
    {
        out = w/(pf*v); 
    }
    else if(ct=='ac-triple'){
        if(vt == 'l-l')out = w/(1.732*pf*v)
        else if(vt == 'l-n')out = w/(3*pf*v)
    }
  return out

}

function v_to_w_converter(v,a,ct,pf,vt){

    var out = 0;
    if(ct=='dc'){
        out = v*a;
    }
    else if(ct=='ac-single')
    {
        out = v*pf*a; 
    }
    else if(ct=='ac-triple'){
        if(vt == 'l-l')out = v*1.732*pf*a;
        else if(vt == 'l-n')out = v*3*pf*a;
    }
    return out;
}


function volts_to_amps_converter(v,type,type_unit){
    var amps = 0

    if(type_unit == 'watts'){
        amps = type/v;
    }else if(type_unit == 'ohms'){
        amps = v/type;
    } 
  
    return amps;
  
}




app.get('/a2w', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var current = req.query.i
  var voltage = req.query.v
  var unit = req.query.unit
  var pf = req.query.pf
  var voltage_type = req.query.vt

  
  res.send("Watts: "+amps_to_w_converter(current,voltage,unit,pf,voltage_type))
})

app.get('/a2va', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var current = req.query.i
  var voltage = req.query.v
  var unit = req.query.unit
  var voltage_type = req.query.vt

  
  res.send("Volt-Amps: "+amps_to_va_converter(current,voltage,unit,voltage_type))
})

app.get('/a2v', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var current = req.query.i;
  var unit = req.query.unit;
  var withh = req.query.with;

  res.send("Volts: "+amps_to_volts_converter(current,unit,withh))
})      


app.get('/va2w', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var va = req.query.va;
  var pf = req.query.pf;
 
  res.send("Watts: "+va_to_w_converter(va,pf))
})      


app.get('/va2a', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var va = req.query.va;
  var v = req.query.v;
  var phase = req.query.phase;
  var vt = req.query.vt;
 
 
  res.send("Amps: "+va_to_amps_converter(va,v,phase,vt))
})      


app.get('/w2va', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var w = req.query.w;
  var pf = req.query.pf;
  
  res.send("Volt-Amps: "+w/pf+" VA")
})      


app.get('/w2v', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var w = req.query.w;
  var a = req.query.a;
  var pf = req.query.pf;
  var ct = req.query.ct;
  var vt = req.query.vt;
  
  res.send("Volts: "+w_to_v_converter(w,a,ct,pf,vt)+" V")
})      

app.get('/w2j', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var w = req.query.w;
  var t = req.query.t;
  
  res.send("Joules: "+w*t+" J")
})      

app.get('/w2a', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var w = req.query.w;
  var v = req.query.v;
  var pf = req.query.pf;
  var ct = req.query.ct;
  var vt = req.query.vt;
  
  res.send("Current: "+w_to_amps_converter(w,v,ct,pf,vt)+" A")
})      

app.get('/j2w', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var j = req.query.j;
  var t = req.query.t;
  
  res.send("Watts: "+j/t+" W")
})      


app.get('/j2v', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var j = req.query.j;
  var c = req.query.c;
  
  res.send("Volts: "+j/c+" V")
})      


app.get('/v2w', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var v = req.query.v;
  var a = req.query.a;
  var pf = req.query.pf;
  var ct = req.query.ct;
  var vt = req.query.vt;
  
  res.send("Watts: "+v_to_w_converter(v,a,ct,pf,vt)+" W")
})      

app.get('/v2j', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var v = req.query.v;
  var c = req.query.c;
  
  res.send("Joules: "+v*c+" J")
})      

app.get('/v2a', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var v = req.query.v;
  var t = req.query.t;
  var u = req.query.u;
 
  
  res.send("Current : "+volts_to_amps_converter(v,t,u)+" A")
})      

let keys;
let enc;

app.get('/rsa_enc', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var message = Buffer.from(req.query.message, 'utf8');
  keys = crypto.generateKeyPairSync("rsa", {modulusLength: 2048})
  
  enc = crypto.publicEncrypt(keys.publicKey, message);
  res.send(enc.toString("base64"))
})      

app.get('/rsa_dec', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var data = req.query.data;

  let dec1 = crypto.privateDecrypt(keys.privateKey, enc);
  res.send(dec1.toString())
})      



app.listen(port);