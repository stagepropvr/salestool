var python = 'http://127.0.0.1:5000/';
var js = 'http://localhost:3000/';
var php_server = 'http://localhost:81/api/index.php/'
// Question 1
function electricity_changed(selected){
    switch(selected.options[selected.selectedIndex].value)
    {
        case 'a':
            document.getElementById('convert_to').innerHTML = ` <select id="eTo"> <option value="1">Watts</option> <option value="2">Volt-Amps</option> <option value="3">Volts</option> </select> `;
            break;
        case 'va':
            document.getElementById('convert_to').innerHTML = ` <select id="eTo"> <option value="w">Watts</option> <option value="a">Amps</option> </select> `;
            break;
        case 'w':
            document.getElementById('convert_to').innerHTML = `<select id="eTo"> <option value="va">Volt-Amps</option> <option value="v">Volts</option> <option value="j">Joules</option> <option value="a">Amps</option> </select>`;
            break;
        case 'v':
            document.getElementById('convert_to').innerHTML = `<select id="eTo"> <option value="w">Watts</option> <option value="j">Joules</option> <option value="a">Amps</option> </select>`
            break;
        case 'j':
            document.getElementById('convert_to').innerHTML = ` <select id="eTo"> <option value="w">Watts</option> <option value="v">Volts</option> </select>`;
            break;
    }
}

// Question 5 Statistics
function sd(){
    document.getElementById('answer').innerHTML = 'Loading...'        
    document.getElementById('answer_py').innerHTML = 'Loading...'        

    var data = document.getElementById('sd_data').value;
    data = data.split(',');

    let request = new XMLHttpRequest();            
    request.open('GET', js+'deviation?data='+data);
    request.responseType = 'text';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'deviation?data='+data);
    py.responseType = 'text';  
    py.onload = function() {
        console.log(py.response)
        document.getElementById('answer_py').innerHTML = py.response;        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'deviation?data='+data);
    php.responseType = 'text';  
    php.onload = function() {
        console.log(php.response)
        document.getElementById('answer_php').innerHTML = php.response;        
    };
    php.send();

    
}


function variance(){
    document.getElementById('answer').innerHTML = 'Loading...'        
 
    var data = document.getElementById('sd_data').value;
    data = data.split(',');

    let request = new XMLHttpRequest();            
    request.open('GET', js+'variance?data='+data);
    request.responseType = 'text';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'variance?data='+data);
    py.responseType = 'text';  
    py.onload = function() {
        console.log(py.response)
        document.getElementById('answer_py').innerHTML = py.response;        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'variance?data='+data);
    php.responseType = 'text';  
    php.onload = function() {
        console.log(php.response)
        document.getElementById('answer_php').innerHTML = php.response;        
    };
    php.send();
}

function linear_regression(){
    document.getElementById('answer').innerHTML = 'Loading...'        
 
    var x = document.getElementById('regx_data').value;
    var y = document.getElementById('regy_data').value;

    let request = new XMLHttpRequest();            
    request.open('GET', js+'linear_reg?x='+x+'&y='+y);
    request.responseType = 'text';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'linear_reg?x='+x+'&y='+y);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'linear_reg?x='+x+'&y='+y);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();
}  

// Question 4 - Trigonometry
function trigonometry(func)
{
    document.getElementById('answer').innerHTML = 'Loading...'        

    var x = document.getElementById('trig_data').value;    

    let request = new XMLHttpRequest();            
    request.open('GET', js+'trigonometry?x='+x+'&func='+func);
    request.responseType = 'text';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'trigonometry?x='+x+'&func='+func);
    py.responseType = 'text';  
    py.onload = function() {
        console.log(py.response)
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'trigonometry?x='+x+'&func='+func);
    php.responseType = 'text';  
    php.onload = function() {
        console.log(php.response)
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();

}

function arcsin()
{
    document.getElementById('answer').innerHTML = 'Loading...'        
 
    var x = document.getElementById('trig_arc_data').value;    

    let request = new XMLHttpRequest();            
    request.open('GET', js+'arcsin?x='+x);
    request.responseType = 'text';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send()

    let py = new XMLHttpRequest();            
    py.open('GET', python+'arcsin?x='+x);
    py.responseType = 'text';  
    py.onload = function() {
        console.log(py.response)
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'arcsin?x='+x);
    php.responseType = 'text';  
    php.onload = function() {
        console.log(php.response)
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();
}

function arccos()
{
    document.getElementById('answer').innerHTML = 'Loading...'        
 
    var x = document.getElementById('trig_arc_data').value;    

    let request = new XMLHttpRequest();            
    request.open('GET', js+'arccos?x='+x);
    request.responseType = 'text';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'arccos?x='+x);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'arccos?x='+x);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();

}

function arctan()
{
    document.getElementById('answer').innerHTML = 'Loading...'        
 
    var x = document.getElementById('trig_arc_data').value;    

    let request = new XMLHttpRequest();            
    request.open('GET', js+'arctan?x='+x);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'arctan?x='+x);
    py.responseType = 'text';  
    py.onload = function() {
        console.log(py.response)
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'arctan?x='+x);
    php.responseType = 'text';  
    php.onload = function() {
        console.log(php.response)
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();

}


function currenttype_changed(selected){
    if(selected.options[selected.selectedIndex].value == 'dc')
    {
        document.getElementById('amps_ext').innerHTML = '';
    }
    else if(selected.options[selected.selectedIndex].value == 'ac-single')
    {
        var input =` <label>Enter power factor</label> <div class="input-group"> <input id="pf_1" type="text" class="form-control"> </div> `

        document.getElementById('amps_ext').innerHTML = input;
    }
    else if(selected.options[selected.selectedIndex].value == 'ac-triple')
    {
        document.getElementById('amps_ext').innerHTML = ` <div class="form-group"> <label>Select Voltage Type</label> <select class="form-control" id="voltage_type_1" > <option value='l-l'>Line To Line Voltage</option> <option value='l-n'>Line To Neutral Voltage</option> </select> </div> <label>Enter power factor</label> <div class="input-group"> <input id="pf_1" type="text" class="form-control"> </div> `;
    }
}

function currenttype_7_changed(selected){
    if(selected.options[selected.selectedIndex].value == 'dc')
    {
        document.getElementById('watts_7_ext').innerHTML = '';
    }
    else if(selected.options[selected.selectedIndex].value == 'ac-single')
    {
        var input =` <label>Enter power factor</label> <div class="input-group"> <input id="pf_7" type="text" class="form-control"> </div> `

        document.getElementById('watts_7_ext').innerHTML = input;
    }
    else if(selected.options[selected.selectedIndex].value == 'ac-triple')
    {
        document.getElementById('watts_7_ext').innerHTML = ` <div class="form-group"> <label>Select Voltage Type</label> <select class="form-control" id="voltage_type_7" > <option value='l-l'>Line To Line Voltage</option> <option value='l-n'>Line To Neutral Voltage</option> </select> </div> <label>Enter power factor</label> <div class="input-group"> <input id="pf_7" type="text" class="form-control"> </div> `;
    }
}

function currenttype_9_changed(selected){
    if(selected.options[selected.selectedIndex].value == 'dc')
    {
        document.getElementById('watts_9_ext').innerHTML = '';
    }
    else if(selected.options[selected.selectedIndex].value == 'ac-single')
    {
        var input =` <label>Enter power factor</label> <div class="input-group"> <input id="pf_9" type="text" class="form-control"> </div> `

        document.getElementById('watts_9_ext').innerHTML = input;
    }
    else if(selected.options[selected.selectedIndex].value == 'ac-triple')
    {
        document.getElementById('watts_9_ext').innerHTML = ` <div class="form-group"> <label>Select Voltage Type</label> <select class="form-control" id="voltage_type_9" > <option value='l-l'>Line To Line Voltage</option> <option value='l-n'>Line To Neutral Voltage</option> </select> </div> <label>Enter power factor</label> <div class="input-group"> <input id="pf_9" type="text" class="form-control"> </div> `;
    }
}

function currenttype_12_changed(selected){
    if(selected.options[selected.selectedIndex].value == 'dc')
    {
        document.getElementById('watts_12_ext').innerHTML = '';
    }
    else if(selected.options[selected.selectedIndex].value == 'ac-single')
    {
        var input =` <label>Enter power factor</label> <div class="input-group"> <input id="pf_12" type="text" class="form-control"> </div> `

        document.getElementById('watts_12_ext').innerHTML = input;
    }
    else if(selected.options[selected.selectedIndex].value == 'ac-triple')
    {
        document.getElementById('watts_12_ext').innerHTML = ` <div class="form-group"> <label>Select Voltage Type</label> <select class="form-control" id="voltage_type_12" > <option value='l-l'>Line To Line Voltage</option> <option value='l-n'>Line To Neutral Voltage</option> </select> </div> <label>Enter power factor</label> <div class="input-group"> <input id="pf_12" type="text" class="form-control"> </div> `;
    }
}


function calc_type_changed(selected){
    if(selected.options[selected.selectedIndex].value == 'ohms')
    {
        document.getElementById('calc_type_3_label').innerHTML = 'Enter Ohms';
        document.getElementById('calc_type_3_unit').innerHTML = 'Ohms';
    }
    else if(selected.options[selected.selectedIndex].value == 'watts')
    {
        document.getElementById('calc_type_3_label').innerHTML = 'Enter Watts';
        document.getElementById('calc_type_3_unit').innerHTML = 'Watts';
    }
}

function calc_type_14_changed(selected){
    if(selected.options[selected.selectedIndex].value == 'ohms')
    {
        document.getElementById('calc_type_14_label').innerHTML = 'Enter Ohms';
        document.getElementById('calc_type_14_unit').innerHTML = 'Ohms';
    }
    else if(selected.options[selected.selectedIndex].value == 'watts')
    {
        document.getElementById('calc_type_14_label').innerHTML = 'Enter Watts';
        document.getElementById('calc_type_14_unit').innerHTML = 'Watts';
    }
}

function changed2(selected){
    if(selected.options[selected.selectedIndex].value == 'single')
    {
        document.getElementById('amps_input_2').innerHTML = '';
    }
    else if(selected.options[selected.selectedIndex].value == 'three')
    {
        var input ='<select id="voltage_type_2"><option value="line">Line to line voltage</option><option value="neutral">Line to neutral voltage</option></select>';
        document.getElementById('amps_input_2').innerHTML = input;
    }
}
function amps_to_w_converter(){
    document.getElementById('answer').innerHTML = 'Loading...'        

    var current = document.getElementById('current_1').value;
    var voltage = document.getElementById('voltage_1').value;
    var unit = document.getElementById('current_type_1').value;
    var pf = 'null';
    var voltage_type = 'null';

    if(unit == 'ac-single')pf = document.getElementById('pf_1').value;
    else if(unit == 'ac-triple')
    {
        pf = document.getElementById('pf_1').value
        voltage_type = document.getElementById('voltage_type_1').value
    }

    let request = new XMLHttpRequest();            
    request.open('GET', js+'a2w?i='+current+'&v='+voltage+'&pf='+pf+'&vt='+voltage_type+'&unit='+unit);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'a2w?i='+current+'&v='+voltage+'&pf='+pf+'&vt='+voltage_type+'&unit='+unit);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'a2w?i='+current+'&v='+voltage+'&pf='+pf+'&vt='+voltage_type+'&unit='+unit);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();

}

function amps_to_va_converter(){
    document.getElementById('answer').innerHTML = '...';

    var current = document.getElementById('current_2').value;
    var voltage = document.getElementById('voltage_2').value;
    var unit = document.getElementById('phase_type_2').value;
    var voltage_type = "null";

    if(unit == 'three')
    {
        voltage_type = document.getElementById('volt_type_2').value
    }

    let request = new XMLHttpRequest();            
    request.open('GET', js+'a2va?i='+current+'&v='+voltage+'&vt='+voltage_type+'&unit='+unit);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'a2va?i='+current+'&v='+voltage+'&vt='+voltage_type+'&unit='+unit);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'a2va?i='+current+'&v='+voltage+'&vt='+voltage_type+'&unit='+unit);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();


}

function amps_to_volts_converter(){
    document.getElementById('answer').innerHTML = '...';
    var current = document.getElementById('current_3').value;
    var unit = document.getElementById('calc_type_3').value;
    var withh = document.getElementById('voltage_3').value;
    
    let request = new XMLHttpRequest();            
    request.open('GET', js+'a2v?i='+current+'&unit='+unit+'&with='+withh);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'a2v?i='+current+'&unit='+unit+'&with='+withh);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'a2v?i='+current+'&unit='+unit+'&with='+withh);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();

}

function va_to_w_converter(){
    document.getElementById('answer').innerHTML = '...';
    var va = document.getElementById('voltamps_2').value; 
    var pf = document.getElementById('pf_5').value;

    let request = new XMLHttpRequest();            
    request.open('GET', js+'va2w?va='+va+'&pf='+pf);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    let py = new XMLHttpRequest();            
    py.open('GET', python+'va2w?va='+va+'&pf='+pf);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();    

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'va2w?va='+va+'&pf='+pf);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    


}

function va_to_amps_converter(){
    document.getElementById('answer').innerHTML = '...';
    var va = document.getElementById('voltamps_1').value; 
    var v = document.getElementById('voltage_4').value; 
    var phase = document.getElementById('phase_type_4').value;
    var vt = 'null'

    if(phase == 'three')vt = document.getElementById('volt_type_4').value


    let request = new XMLHttpRequest();            
    request.open('GET', js+'va2a?va='+va+'&v='+v+'&phase='+phase+'&vt='+vt);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    
    let py = new XMLHttpRequest();            
    py.open('GET', python+'va2a?va='+va+'&v='+v+'&phase='+phase+'&vt='+vt);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send(); 

    
    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'va2a?va='+va+'&v='+v+'&phase='+phase+'&vt='+vt);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    

}

function w_to_va_converter(){
    document.getElementById('answer').innerHTML = '...'
    var w = document.getElementById('watts_6').value; 
    var pf = document.getElementById('pf_6').value;

    let request = new XMLHttpRequest();            
    request.open('GET', js+'w2va?w='+w+'&pf='+pf);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    let py = new XMLHttpRequest();            
    py.open('GET', python+'w2va?w='+w+'&pf='+pf);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();    

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'w2va?w='+w+'&pf='+pf);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    

}

function w_to_v_converter(){
    document.getElementById('answer').innerHTML = '...'
    var w = document.getElementById('watts_7').value; 
    var a = document.getElementById('amps_7').value; 
    var ct = document.getElementById('current_type_7').value;
    var pf = 'null';
    var vt = 'null';

    if(ct=='ac-single')pf = document.getElementById('pf_7').value;
    else if(ct=='ac-triple'){
        pf = document.getElementById('pf_7').value;
        vt = document.getElementById('voltage_type_7').value;
    }

    let request = new XMLHttpRequest();            
    request.open('GET', js+'w2v?w='+w+'&a='+a+'&ct='+ct+'&pf='+pf+'&vt='+vt);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    let py = new XMLHttpRequest();            
    py.open('GET', python+'w2v?w='+w+'&a='+a+'&ct='+ct+'&pf='+pf+'&vt='+vt);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();    

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'w2v?w='+w+'&a='+a+'&ct='+ct+'&pf='+pf+'&vt='+vt);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    

}

function w_to_j_converter(){
    document.getElementById('answer').innerHTML = '...'
    var w = document.getElementById('watts_8').value; 
    var t = document.getElementById('time_8').value;

    let request = new XMLHttpRequest();            
    request.open('GET', js+'w2j?w='+w+'&t='+t);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    let py = new XMLHttpRequest();            
    py.open('GET', python+'w2j?w='+w+'&t='+t);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();    

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'w2j?w='+w+'&t='+t);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    

}

function w_to_amps_converter(){
    document.getElementById('answer').innerHTML = '...'
    var w = document.getElementById('watts_9').value; 
    var v = document.getElementById('volts_9').value; 
    var ct = document.getElementById('current_type_9').value;
    var pf = 'null';
    var vt = 'null';

    if(ct=='ac-single')
    {
        pf = document.getElementById('pf_9').value;
    }
    else if(ct=='ac-triple'){
        pf = document.getElementById('pf_9').value;
        vt = document.getElementById('voltage_type_9').value;
  }

    let request = new XMLHttpRequest();            
    request.open('GET', js+'w2a?w='+w+'&v='+v+'&ct='+ct+'&pf='+pf+'&vt='+vt);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    let py = new XMLHttpRequest();            
    py.open('GET', python+'w2a?w='+w+'&v='+v+'&ct='+ct+'&pf='+pf+'&vt='+vt);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();    

    
    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'w2a?w='+w+'&v='+v+'&ct='+ct+'&pf='+pf+'&vt='+vt);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    

}

function j_to_w_converter(){
    document.getElementById('answer').innerHTML = '...';
    var j = document.getElementById('joules_10').value; 
    var t = document.getElementById('time_10').value;
    
    let request = new XMLHttpRequest();            
    request.open('GET', js+'j2w?j='+j+'&t='+t);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    let py = new XMLHttpRequest();            
    py.open('GET', python+'j2w?j='+j+'&t='+t);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();    

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'j2w?j='+j+'&t='+t);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    


}

function j_to_v_converter(){
    document.getElementById('answer').innerHTML = '...'
    var j = document.getElementById('joules_11').value; 
    var c = document.getElementById('coulombs_11').value;

    let request = new XMLHttpRequest();            
    request.open('GET', js+'j2v?j='+j+'&c='+c);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    let py = new XMLHttpRequest();            
    py.open('GET', python+'j2v?j='+j+'&c='+c);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();    

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'j2v?j='+j+'&c='+c);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    
}

function v_to_w_converter(){
    document.getElementById('answer').innerHTML = '...'
    var v = document.getElementById('volts_12').value; 
    var a = document.getElementById('amps_12').value; 
    var ct = document.getElementById('current_type_12').value;
    var pf = 'null';
    var vt = 'null';

    if(ct=='ac-single')
    {
        pf = document.getElementById('pf_12').value;
    }
    else if(ct=='ac-triple'){
        pf = document.getElementById('pf_12').value;
        vt = document.getElementById('voltage_type_12').value;
    }

    let request = new XMLHttpRequest();            
    request.open('GET', js+'v2w?v='+v+'&a='+a+'&ct='+ct+'&pf='+pf+'&vt='+vt);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    let py = new XMLHttpRequest();            
    py.open('GET', python+'v2w?v='+v+'&a='+a+'&ct='+ct+'&pf='+pf+'&vt='+vt);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();    

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'v2w?v='+v+'&a='+a+'&ct='+ct+'&pf='+pf+'&vt='+vt);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    

}


function v_to_j_converter(){
    
    document.getElementById('answer').innerHTML = '...'
    var v = document.getElementById('volts_13').value; 
    var c = document.getElementById('coulombs_13').value;

    let request = new XMLHttpRequest();            
    request.open('GET', js+'v2j?v='+v+'&c='+c);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    let py = new XMLHttpRequest();            
    py.open('GET', python+'v2j?v='+v+'&c='+c);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();    
    
    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'v2j?v='+v+'&c='+c);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    

}

function volts_to_amps_converter(){
    document.getElementById('answer').innerHTML = '...';
    var v = document.getElementById('volts_14').value;
    var type = document.getElementById('type_14').value;
    var type_unit = document.getElementById('calc_type_14').value;
 
    let request = new XMLHttpRequest();            
    request.open('GET', js+'v2a?v='+v+'&t='+type+'&u='+type_unit);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();    

    let py = new XMLHttpRequest();            
    py.open('GET', python+'v2a?v='+v+'&t='+type+'&u='+type_unit);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();    

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'v2a?v='+v+'&t='+type+'&u='+type_unit);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();    
}

function phasetype_changed(selected){

    if(selected.options[selected.selectedIndex].value == 'single')
    {
        document.getElementById('amps_2_ext').innerHTML = '';
    }
    else if(selected.options[selected.selectedIndex].value == 'three')
    {
        document.getElementById('amps_2_ext').innerHTML = `<div class="form-group"> <label>Select Voltage Type</label> <select class="form-control" id="volt_type_2"> <option value='l-l'>Line to Line Voltage</option> <option value='l-n'>Line to Neutral Voltage</option> </select> </div> `;
    }
}


function phasetype_2_changed(selected){

    if(selected.options[selected.selectedIndex].value == 'single')
    {
        document.getElementById('voltamps_1_ext').innerHTML = '';
    }
    else if(selected.options[selected.selectedIndex].value == 'three')
    {
        document.getElementById('voltamps_1_ext').innerHTML = `<div class="form-group"> <label>Select Voltage Type</label> <select class="form-control" id="volt_type_4"> <option value='l-l'>Line to Line Voltage</option> <option value='l-n'>Line to Neutral Voltage</option> </select> </div> `;
    }
}

// Question 3
function gcf()
{
    document.getElementById('answer').innerHTML = 'Loading...'        
 
    var x = document.getElementById('3_a').value;   
    var y = document.getElementById('3_b').value;     

    let request = new XMLHttpRequest();            
    request.open('GET', js+'gcf?x='+x+'&y='+y);
    request.responseType = 'text';  
    request.onload = function() {
        console.log(request.response)
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'gcf?x='+x+'&y='+y);
    py.responseType = 'text';  
    py.onload = function() {
        console.log(py.response)
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'gcf?x='+x+'&y='+y);
    php.responseType = 'text';  
    php.onload = function() {
        console.log(php.response)
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();
}


function lcm()
{
    document.getElementById('answer').innerHTML = 'Loading...'        
 
    var x = document.getElementById('3_a').value;   
    var y = document.getElementById('3_b').value;     

    let request = new XMLHttpRequest();            
    request.open('GET', js+'lcm?x='+x+'&y='+y);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'lcm?x='+x+'&y='+y);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'lcm?x='+x+'&y='+y);
    php.responseType = 'text';  
    php.onload = function() {
        console.log(php.response)
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();
}

function root(root)
{
    document.getElementById('answer').innerHTML = 'Loading...'        
 
    var number = document.getElementById('3_input').value;

    if(root == 'nth')
    {
        root = document.getElementById('nthroot').value;
    }
    
    let request = new XMLHttpRequest();            
    request.open('GET', js+'root?num='+number+'&root='+root);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'root?num='+number+'&root='+root);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'root?num='+number+'&root='+root);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();
}

// Question 2
function log()
{
    document.getElementById('answer').innerHTML = 'Loading...'        
    var number = document.getElementById('log_input').value;
    
    let request = new XMLHttpRequest();            
    request.open('GET', js+'log?num='+number);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'log?num='+number);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let pp = new XMLHttpRequest();            
    pp.open('GET', php_server+'log?num='+number);
    pp.responseType = 'text';  
    pp.onload = function() {
        document.getElementById('answer_php').innerHTML = pp.response        
    };
    pp.send();
}

function natural_log()
{
    document.getElementById('answer').innerHTML = 'Loading...'        
    var number = document.getElementById('log_input').value;
    let request = new XMLHttpRequest();            
    request.open('GET', js+'natural_log?num='+number);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'natural_log?num='+number);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let ph = new XMLHttpRequest();            
    ph.open('GET', php_server+'natural_log?num='+number);
    ph.responseType = 'text';  
    ph.onload = function() {
        document.getElementById('answer_php').innerHTML = ph.response        
    };
    ph.send();
}


function anti_log()
{
    document.getElementById('answer').innerHTML = 'Loading...'        

    var number = document.getElementById('log_input').value;
    let request = new XMLHttpRequest();            
    request.open('GET', js+'antilog?num='+number);
    request.responseType = 'text';  
    request.onload = function() {
        document.getElementById('answer').innerHTML = request.response        
    };
    request.send();

    let py = new XMLHttpRequest();            
    py.open('GET', python+'antilog?num='+number);
    py.responseType = 'text';  
    py.onload = function() {
        document.getElementById('answer_py').innerHTML = py.response        
    };
    py.send();

    let php = new XMLHttpRequest();            
    php.open('GET', php_server+'antilog?num='+number);
    php.responseType = 'text';  
    php.onload = function() {
        document.getElementById('answer_php').innerHTML = php.response        
    };
    php.send();
}
