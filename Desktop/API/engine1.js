var python = 'http://127.0.0.1:5000/';
var js = 'http://localhost:3000/';
var php_server = 'http://localhost:81/api/index.php/'

        
function load(){
    document.getElementById("captcha").removeAttribute('src');
    document.getElementById("captcha_py").removeAttribute('src');
    document.getElementById("captcha_php").removeAttribute('src');

    document.getElementById('answer').innerHTML = '';
    document.getElementById('answer_py').innerHTML = '';
    document.getElementById('answer_php').innerHTML = '';
}
        // Problem 1
        //Write Code
        function diffrence(){
            load();
            var from = (document.getElementById("fromdate").value);
            var to = (document.getElementById("todate").value);

            let request = new XMLHttpRequest();
            request.open('GET', js+'diffrence?from='+from+'&to='+to);            
            request.responseType = 'text';  
            request.onload = function() {
                document.getElementById('answer').innerHTML = request.response;
            };
            request.send();
            diffrence_py();
        }

        function diffrence_py(){
            var from = document.getElementById("fromdate").value;
            var to = document.getElementById("todate").value;
            document.getElementById('answer_py').innerHTML = '...';
          
            let request = new XMLHttpRequest();
            request.open('GET', 'http://127.0.0.1:5000/diffrence?from='+from+'&to='+to);
            request.responseType = 'text';  

            request.onload = function() {
                document.getElementById('answer_py').innerHTML = request.response;
            };
            request.send();

            let php = new XMLHttpRequest();
            php.open('GET', php_server+'diffrence?from='+from+'&to='+to);
            php.responseType = 'text';  

            php.onload = function() {
                document.getElementById('answer_php').innerHTML = php.response;
            };
            php.send();
        }

        // Problem 2
        function union() {
            load();
            var seta = document.getElementById("seta").value;
            var setb = document.getElementById("setb").value;

            let request = new XMLHttpRequest();
            request.open('GET', js+'union?a='+seta+'&b='+setb);            
            request.responseType = 'text';  

            request.onload = function() {
                document.getElementById('answer').innerHTML = request.response;
            };
            request.send();
            union_py();
        }

        function union_py() {
            var seta = document.getElementById("seta").value;
            var setb = document.getElementById("setb").value;

            let request = new XMLHttpRequest();
            request.open('GET', 'http://127.0.0.1:5000/union?a='+seta+'&b='+setb);            
            request.responseType = 'text';  

            request.onload = function() {
                console.log(request.response);
                document.getElementById('answer_py').innerHTML = request.response;
            };
            request.send();

            let php = new XMLHttpRequest();
            php.open('GET', php_server+'union?a='+seta+'&b='+setb);            
            php.responseType = 'text';  

            php.onload = function() {
                console.log(php.response);
                document.getElementById('answer_php').innerHTML = php.response;
            };
            php.send();
        }

        function minus(a) {
            load();
            var seta = document.getElementById("seta").value;
            var setb = document.getElementById("setb").value;

            let request = new XMLHttpRequest();
            if(a == 1)request.open('GET', js+'minus?a='+seta+'&b='+setb);            
            else if(a == 2)request.open('GET', js+'minus?a='+setb+'&b='+seta);            
            
            request.responseType = 'text';  

            request.onload = function() {
                console.log(request.response);
                document.getElementById('answer').innerHTML = request.response;
            };
            request.send();
            minus_py(a);
        }

        function minus_py(a) {
            var seta = document.getElementById("seta").value;
            var setb = document.getElementById("setb").value;

            let request = new XMLHttpRequest();
            let php = new XMLHttpRequest();

            if(a == 1){
                request.open('GET', python+'minus?a='+seta+'&b='+setb); 
                php.open('GET', php_server+'minus?a='+seta+'&b='+setb);            
            }else if(a == 2){
                request.open('GET', python+'minus?a='+setb+'&b='+seta); 
                php.open('GET', php_server+'minus?a='+setb+'&b='+seta);                       
            }
            request.responseType = 'text';  
            php.responseType = 'text';  

            request.onload = function() {
                document.getElementById('answer_py').innerHTML = request.response;
            };

            php.onload = function() {
                document.getElementById('answer_php').innerHTML = php.response;
            };
            request.send();
            php.send();

        }

        function intersection() {
            var seta = document.getElementById("seta").value;
            var setb = document.getElementById("setb").value;

            let request = new XMLHttpRequest();
            request.open('GET', js+'intersection?a='+seta+'&b='+setb);            
            request.responseType = 'text';  

            request.onload = function() {
                document.getElementById('answer').innerHTML = request.response;
            };
            request.send();
            intersection_py();
        }

        
        function intersection_py() {
            var seta = document.getElementById("seta").value;
            var setb = document.getElementById("setb").value;

            let request = new XMLHttpRequest();
            request.open('GET', python+'intersection?a='+seta+'&b='+setb);            
            request.responseType = 'text';  

            request.onload = function() {
                document.getElementById('answer_py').innerHTML = request.response;
            };
            request.send();

            let php = new XMLHttpRequest();
            php.open('GET', php_server+'intersection?a='+seta+'&b='+setb);            
            php.responseType = 'text';  

            php.onload = function() {
                document.getElementById('answer_php').innerHTML = php.response;
            };
            php.send();
        }


        // Problem 9
        function otp_gen() {
            load();
            let request = new XMLHttpRequest();
            var length = document.getElementById("otplen").value;
            if(!length)
            {
                length = randomIntFromInterval(5,15);
            }
            request.open('GET', js+'otp?length='+length);            
            request.responseType = 'text';  

            request.onload = function() {
                console.log(request.response);
                document.getElementById('answer').innerHTML = request.response;
            };
            request.send();
            otp_gen_py();
        }

        function otp_gen_py() {
            let request = new XMLHttpRequest();
            let php = new XMLHttpRequest();
            
            var length = document.getElementById("otplen").value;
            
            if(!length)
            {
                length = randomIntFromInterval(5,15);
            }
            request.open('GET', python+'otp?length='+length);            
            request.responseType = 'text';  

            request.onload = function() {
                console.log(request.response);
                document.getElementById('answer_py').innerHTML = request.response;
            };
            request.send();

            php.open('GET', php_server+'otp?length='+length);            
            php.responseType = 'text';  

            php.onload = function() {
                document.getElementById('answer_php').innerHTML = php.response;
            };
            php.send();
        }

        // Problem 4
        // Rupees And Paise in Indian Form

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

        function NumInWords () {
            load();
            var number = document.getElementById("figure").value;
            let request = new XMLHttpRequest();
            request.open('GET', js+'numberinwords?num='+number);
            
            request.responseType = 'text';  

            request.onload = function() {
                document.getElementById('answer').innerHTML = request.response;
            };
            request.send();
            NumInWords_py();
        }

        function NumInWords_py () {
            var number = document.getElementById("figure").value;
         
            let request = new XMLHttpRequest();
            request.open('GET', python+'numberinwords?num='+number);            
            request.responseType = 'text';  
            request.onload = function() {
                document.getElementById('answer_py').innerHTML = request.response;
            };
            request.send();

            let php = new XMLHttpRequest();
            php.open('GET', php_server+'numberinwords?num='+number);            
            php.responseType = 'text';  
            php.onload = function() {
                document.getElementById('answer_php').innerHTML = php.response;
            };
            php.send();

        }

        function get_matrix(rows,cols){

            var mat = [],count=0;

            for(var i=0; i<rows; i++)
            {
                var array = [];
                for(var j=0; j<cols; j++)
                {
                    array.push(document.getElementById("cell_"+count).value);
                    count++;
                }
                mat.push(array);
            }
            return mat;
        }

        function transpose() {
            load();
            var rows = document.getElementById("rows").value;
            var cols = document.getElementById("cols").value;

            var original =  get_matrix(rows,cols);
            let request = new XMLHttpRequest();
            
            request.open('GET', js+'transpose?matrix='+encodeURIComponent(JSON.stringify(original)));
            
            request.responseType = 'json';  

            request.onload = function() {
                display_matrix(request.response,cols,rows,'answer');
            };
            request.send();
            transpose_py();
        }

        function transpose_py() {
            
            var rows = document.getElementById("rows").value;
            var cols = document.getElementById("cols").value;

            var original =  get_matrix(rows,cols);
            let request = new XMLHttpRequest();
            request.open('GET', python+'transpose?matrix='+encodeURIComponent(JSON.stringify(original)));            
            request.responseType = 'json';  
            request.onload = function() {
                display_matrix(request.response,cols,rows,'answer_py');
            };
            request.send();

            let php = new XMLHttpRequest();
            php.open('GET', php_server+'transpose?matrix='+encodeURIComponent(JSON.stringify(original)));            
            php.responseType = 'json';  
            php.onload = function() {
                display_matrix(php.response,cols,rows,'answer_php');
            };
            php.send();
        }


        function diagonol(type){
            load();
            var rows = document.getElementById("rows").value;
            var cols = document.getElementById("cols").value;

            var original =  get_matrix(rows,cols);

            let request = new XMLHttpRequest();            
            request.open('GET', js+'diagonol?matrix='+encodeURIComponent(JSON.stringify(original))+'&type='+type);
            request.responseType = 'json';  
            request.onload = function() {
                display_matrix(request.response,cols,rows,'answer');
            };
            request.send();
            diagonol_py(type);
        }

        function diagonol_py(type){
            var rows = document.getElementById("rows").value;
            var cols = document.getElementById("cols").value;

            var original =  get_matrix(rows,cols);

            let request = new XMLHttpRequest();            
            request.open('GET', python+'diagonol?matrix='+encodeURIComponent(JSON.stringify(original))+'&type='+type);
            request.responseType = 'json';  
            request.onload = function() {
                display_matrix(request.response,cols,rows,'answer_py');
            };
            request.send();

            let php = new XMLHttpRequest();            
            php.open('GET', php_server+'diagonol?matrix='+encodeURIComponent(JSON.stringify(original))+'&type='+type);
            php.responseType = 'json';  
            php.onload = function() {
                display_matrix(php.response,cols,rows,'answer_php');
            };
            php.send();
        
        
        }
        function display_matrix(mat,rows,cols,place){
            var res = "<table>";
            // Loop to display the elements of 2D array. 
            for (var i = 0; i < rows; i++) { 
                res += '<tr>'
                for (var j = 0; j < cols; j++) 
                { 
                    res += '<td class="matrix_cell">'+mat[i][j]+'</td>';
                } 
                res += "</td>"; 
            } 
            res += '</table>';

            document.getElementById(place).innerHTML = res;            
        }

        function generateMatrix(){
            var rows = document.getElementById("rows").value;
            var cols = document.getElementById("cols").value;

            var table = '<table>';
            var count = 0;

                for (var i = 0; i < rows; i++) { 
                    table += '<tr>';
                    for (var j = 0; j < cols; j++) 
                    { 
                        table += '<td><input class="matrix_cell" id='+"cell_"+(count++)+'><td>'
                    } 
                table += "</tr>"; 
                }
            table += '</table>'

            document.getElementById('input_matrix').innerHTML = table;            
        }

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

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var answer;
        
    function createCaptcha(str){
        load();
        if(str)
        {
            var captcha_input = document.getElementById("cpatchaTextBox").value;
            if(captcha_input == answer)
            {
                document.getElementById("captcha_result").innerHTML = "Correct Answer";
            }else{
                document.getElementById("captcha_result").innerHTML = "Wrong Answer";         
            }
            console.log(captcha_input);
        }else{
            let request = new XMLHttpRequest();            
            request.open('GET', js+'captcha');
            request.responseType = 'text';  
            request.onload = function() {
                var res = request.response.split("thecaptchafollows");        
                answer = res[0];
                // document.getElementById("answer").innerHTML = `<input type="text" placeholder="Captcha" id="catchaTextBox_js"/>  <button class="btn btn-primary" onclick="createCaptcha_js('clicked')">Verify</button>`;
                document.getElementById("captcha").setAttribute('src', res[1]);
            };
            request.send();
            createCaptcha_py();
        }
   
    }

    function createCaptcha_py(){
        let request = new XMLHttpRequest();            
        request.open('GET', 'http://127.0.0.1:5000/captcha');
        request.responseType = 'text';  
        request.onload = function() {
            // document.getElementById("answer_py").innerHTML = `<input type="text" placeholder="Captcha" id="catchaTextBox_py"/>  <button class="btn btn-primary" onclick="createCaptcha_py('clicked')">Verify</button>`
            document.getElementById("captcha_py").setAttribute('src', request.response);
        };
        request.send();

        let php = new XMLHttpRequest();            
        php.open('GET', php_server+'captcha');
        php.responseType = 'text';  
        php.onload = function() {
            // document.getElementById("answer_php").innerHTML = `<input type="text" placeholder="Captcha" id="catchaTextBox_py"/>  <button class="btn btn-primary" onclick="createCaptcha_py('clicked')">Verify</button>`
            document.getElementById("captcha_php").setAttribute('src', php.response);
        };
        php.send();
    }
    

    function qrcode(){
        load()
        var text = document.getElementById("qrcodeTextBox").value;
        let request = new XMLHttpRequest();            
        request.open('GET', js+'qrcode/?code='+text);
        request.responseType = 'text';  
        request.onload = function() {
            document.getElementById("captcha").setAttribute('src', request.response);
        };
        request.send();
        qrcode_py();
    }


    function qrcode_py(){

        var text = document.getElementById("qrcodeTextBox").value;
        
        let request = new XMLHttpRequest();            
        request.open('GET', 'http://127.0.0.1:5000/qrcode/?data='+text);
        request.responseType = 'text';  
        request.onload = function() {
            document.getElementById("captcha_py").setAttribute('src', request.response);
        };
        request.send();

        let php = new XMLHttpRequest();            
        php.open('GET', php_server+'qrcode/?data='+text);
        php.responseType = 'text';  
        php.onload = function() {
            document.getElementById("captcha_php").setAttribute('src', php.response);
        };
        php.send();
    }

    function barcode(){
        load();
        var text = document.getElementById('barcodeTextBox').value;
        let request = new XMLHttpRequest();            
            request.open('GET', js+'barcode?text='+text);
    
            request.responseType = 'text';  
            request.onload = function() {
                document.getElementById("captcha").setAttribute('src', request.response);
            };
            request.send();
            barcode_py();
    }
    

    function barcode_py(){

        var text = document.getElementById("barcodeTextBox").value;
        
        let request = new XMLHttpRequest();            
        request.open('GET', 'http://127.0.0.1:5000/barcode/?data='+text);
        request.responseType = 'text';  
        request.onload = function() {
            document.getElementById("captcha_py").setAttribute('src', request.response);

        };
        request.send();

        let php = new XMLHttpRequest();            
        php.open('GET', php_server+'barcode/?data='+text);
        php.responseType = 'text';  
        php.onload = function() {
            document.getElementById("captcha_php").setAttribute('src', php.response);
        };
        php.send();
    }

    function checksum(){
        load();
        let request = new XMLHttpRequest();            
        var words = document.getElementById('checksumTextBox').value;
        request.open('GET', js+'checksum?words='+words);            
        request.responseType = 'text';  

        request.onload = function() {
            console.log(request.response);
            document.getElementById('answer').innerHTML = request.response;
        };
        request.send();
        checksum_py();
   }

    function checksum_py(){
    
        document.getElementById('answer_py').innerHTML = '...';
        let request = new XMLHttpRequest();            
        var words = document.getElementById('checksumTextBox').value;
        request.open('GET', python+'checksum?words='+words);            
        request.responseType = 'text';  

        request.onload = function() {
            console.log(request.response);
            document.getElementById('answer_py').innerHTML = request.response;
        };
        request.send();

        let php = new XMLHttpRequest();     
        php.open('GET', php_server+'checksum?words='+words);            
        php.responseType = 'text';  
        php.onload = function() {
            document.getElementById('answer_php').innerHTML = php.response;
        };
        php.send();
       
       
    }


function rsa_encrypt()
{
    var message = document.getElementById('rsaTextBox').value;

    let request = new XMLHttpRequest();            
    request.open('GET', js+'rsa_enc?message='+message);            
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response;
    };
    request.send();

    let ppy = new XMLHttpRequest();            
    ppy.open('GET', python+'rsa-enc/?message='+message);            
    ppy.responseType = 'text';  
    ppy.onload = function() {
        document.getElementById('answer_py').innerHTML = ppy.response;
    };
    ppy.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'rsa-enc?message='+message);            
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response;
    };
    php.send();

}

function rsa_decrypt()
{
    var data = document.getElementById('answer').innerHTML;
    let request = new XMLHttpRequest();            
    request.open('GET', js+'rsa_dec?data='+data);            
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response;
        document.getElementById('answer_php').innerHTML = request.response;
    };
    request.send();

    data = document.getElementById('answer_py').innerHTML;
    let ppy = new XMLHttpRequest();            
    ppy.open('GET', python+'rsa-dec?data='+data);            
    ppy.responseType = 'text';  
    ppy.onload = function() {
        document.getElementById('answer_py').innerHTML = ppy.response;
    };
    ppy.send();

    data = document.getElementById('answer_php').innerHTML;
    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'rsa-dec?data='+data);            
    php.responseType = 'text';  
    php.onload = function() {
        // document.getElementById('answer_php').innerHTML = php.response;
    };
    php.send();
}

