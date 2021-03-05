const express = require('express')
const app = express()
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

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
  
  var length = req.query.length-1;
  var mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_+-={}[]:";\'>?,./|\\';

  var result = "";
  for (var i = 0; i <= length; i++){
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

app.get('/numberinwords', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var result = "";
  var number = req.query.num;

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


  res.send(result+' Rupees');  
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
          if(i>j && type==1)original[i][j] = 0;
          if(i+j >= size && type == 2)original[i][j] = 0;
          if(i+j < size-1 && type == 3)original[i][j] = 0;
          if(i<j && type==4)original[i][j] = 0;
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


 

 

        




app.listen(port);