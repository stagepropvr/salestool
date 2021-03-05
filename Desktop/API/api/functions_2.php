<?php
    // Question 1
    function amps_to_w_converter($current,$voltage,$unit,$pf,$voltage_type){
        $kw = 0;
        if($unit == 'dc')
        {
            $kw = $current * ($voltage);
        }
        else if($unit == 'ac-single')
        {
            $kw = $pf * $current * ($voltage);
        }
        else if($unit == 'ac-triple')
        {
            if($voltage_type == 'l-l')
            {
                $kw = 1.732 * $pf * $current * ($voltage);
            }
            else if($voltage_type == 'l-n')
            {
                $kw = 3 * $pf * $current * ($voltage);
            }
        }
        return $kw;        
    }
    
    function amps_to_va_converter($current,$voltage,$unit,$voltage_type){
    
        $kva = 0;
        if($unit == 'single')
        {
            $kva = $current * ($voltage);
        }
        else if($unit == 'three')
        {
            if($voltage_type == 'l-l')
            {
                $kva = 1.732 *  $current * ($voltage/1000);
            }
            else if($voltage_type == 'l-n')
            {
                $kva = 3 * $current * ($voltage/1000);
            }
        }
        return $kva;
    }
    
    function amps_to_volts_converter($current,$unit,$term2){
        $kv = 0;
        if($unit == 'watts')
        {
            $kv = ($term2/$current);
        }else if($unit == 'ohms')
        {
            $kv = ($term2*$current);
        }
    return $kv;
    }

    
function va_to_w_converter($va,$pf)
{
    return $va*$pf;
}

function va_to_amps_converter($va,$v,$phase,$voltage_type){
    
    $amp = 0;
    if($phase == 'single')
    {
        $amp =$va/$v;
    }
    else if($phase == 'three')
    {    
        if($voltage_type == 'l-l')
        {
            $amp = $va/(1.732*$v);
        }
        else if($voltage_type == 'l-n')
        {
            $amp = $va/(3*$v);
        }
    }
    return $amp;
}

function w_to_v_converter($w,$a,$ct,$pf,$vt){
    $out = 0;
    if($ct=='dc'){
        $out = $w/$a;
    }
    else if($ct=='ac-single')
    {
        $out = $w/($pf*$a); 
    }
    else if($ct=='ac-triple'){
        if($vt == 'l-l')$out = $w/(1.732*$pf*$a);
        else if($vt == 'l-n')$out = $w/(3*$pf*$a);
    }
    return $out;
}

function w_to_amps_converter($w,$v,$ct,$pf,$vt){

    $out = 0;
    if($ct=='dc'){
        $out = $w/$v;
    }
    else if($ct=='ac-single')
    {
        $out = $w/($pf*$v); 
    }
    else if($ct=='ac-triple'){
        if($vt == 'l-l')$out = $w/(1.732*$pf*$v);
        else if($vt == 'l-n')$out = $w/(3*$pf*$v);
    }
return $out;

}

function v_to_w_converter($v,$a,$ct,$pf,$vt){

    $out = 0;
    if($ct=='dc'){
        $out = $v*$a;
    }
    else if($ct=='ac-single')
    {
        $out = $v*$pf*$a; 
    }
    else if($ct=='ac-triple'){
        if($vt == 'l-l')$out = $v*1.732*$pf*$a;
        else if($vt == 'l-n')$out = $v*3*$pf*$a;
    }
    return $out;
}


function volts_to_amps_converter($v,$type,$type_unit){
    $amps = 0;

    if($type_unit == 'watts'){
        $amps = $type/$v;
    }else if($type_unit == 'ohms'){
        $amps = $v/$type;
    } 

    return $amps;

}

    
    // Question 2 Log
    function nearest_power($n)
    {
        $pow = 0;
        while(pow(10,$pow)<=$n)
        {
            $pow++;
        }
        return $pow-1;
    }


    function Log_fn($n) 
    { 
        for( $i=0; $i<6; $i++){
            $np = nearest_power($n);
            if($i == 0)$out = $np.'.';
            else $out = $out.$np;
            $n = $n / pow(10,$np); //3
            $n = pow($n,10);
        }
        return $out;
    } 

    // Question 3 GCF,LCM,Roots
    function gcf($a,$b) {
        if ($b > $a) { $temp = $a; $a = $b; $b = $temp;}
    
        while (true) {
            if ($b == 0){
                return $a;
            } 
            $a %= $b;
            if ($a == 0){
                return $b;
            } 
            $b %= $a;
        }
    }
    
    function lcm($a,$b){
        $min = ($a > $b) ? $a : $b;
    
        while (true) {
            if ($min % $a == 0 && $min % $b == 0) {
                return $min;
            }
            $min++;
        }
    }

// Question 4 Trigonometery
    function factorial($x)
    {
        if($x == 0) return 1;
        return $x * factorial($x-1);
    }


    function power($n,$x)
    {
        if($x==0)return 1;
        $out = $n;
        for($i=1;$i<$x; $i++)
        {
            $out *= $n;
        }
        return $out;
    }

    function sine($angle)
    {
        $x = $angle * (22/7)*(1/180);
        $total = 0;
        for($n=0; $n<10;$n++)
        {
            $ans = power(-1,$n)*power($x,2*$n+1)/factorial(2*$n+1);
            $total += $ans;
        }
        return $total;
    }


    function cosine($angle)
    {
        $x = $angle * (22/7)*(1/180);
        $total = 0;
        for($n=0; $n<10; $n++)
        {
            $ans = power(-1,$n)*power($x,2*$n)/factorial(2*$n);
            $total += $ans;
        }
        return $total;
    }

    function tangent($angle){return sine($angle)/cosine($angle);}
    function cot($angle){return cosine($angle)/sine($angle);}
    function sec($angle){return 1/cosine($angle);}
    function cosec($angle){return 1/sine($angle);}

function trig($x,$f)
{
  switch($f){
      case "sin":
        return round(sine($x),3);
      case "cos":
        return round(cosine($x),3);
      case "tan":
        return round(tangent($x),3);
      case "sec":
        return round(sec($x),3);
      case "cosec":
        return round(cosec($x),3);
      case "cot":
        return round(cot($x),3);
    default:
      return "error";
    }
} 

function arcsin($x)
{
    $out = (22/14) - arccos($x);
    return $out;
}

function arccos($x)
{
    $out = 0;
    for( $n=0; $n<6; $n++)
    {
        $up = factorial(2*$n)*($x**((2*$n)+1));
        $down = (2**(2*$n))*(factorial($n)**2)*((2*$n) + 1);
        $out += $up/$down; 
    }
    $out = (22/14) - $out;
    return $out;
}

function arctan($x){
    $out = 0;
    for( $n=0; $n<6; $n++)
    {
        $up = ((-1)**$n)*($x**((2*$n)+1));
        $down = (2*$n)+1;
        $out += $up/$down; 
    }
    return $out;
}

// Question 5 Statistics
function mean($data)
{
    $total = 0;
    for($i=0; $i<count($data); $i++)
    {
        $total += floatval($data[$i]);
    }
    return $total/count($data);
}

function mean_of_squareddiffrence($data)
{
    $total = 0;
    $m = mean($data); 
    for($i=0; $i<count($data); $i++)
    {
        $diffrence = $data[$i] - $m;
        $squared_diffrence = $diffrence*$diffrence;
        $total += $squared_diffrence;
    }
    return $total/count($data);    
}

// Linear Regression
function sum($data)
{
    $total = 0;
    for($i=0; $i<count($data); $i++)
    {
        $total += floatval($data[$i]);
    }
    return $total;
}


function sum_of_squares($data)
{
    $total = 0;
    for($i=0; $i<count($data); $i++)
    {
        $total += floatval($data[$i])*floatval($data[$i]);
    }
    return $total;
}


function sum_of_products($x,$y)
{
    $total = 0;
    for($i=0; $i<count($x); $i++)
    {
        $total += floatval($x[$i])*floatval($y[$i]);
    }
    return $total;
}

function linear_regression($x,$y){
    $x = explode(',',$x);
    $y = explode(',',$y);

    $sum_x = sum($x);
    $sum_y = sum($y);
    $sum_x2 = sum_of_squares($x);
    $sum_y2 = sum_of_squares($y);
    $sum_xy = sum_of_products($x,$y);

    $b = ($sum_xy - ($sum_x*$sum_y)/count($x))/($sum_x2-(($sum_x*$sum_x)/count($x)));
    $a = ($sum_y - $b*$sum_x)/count($x);

    $res = round($b,2)."X + ".round($a,2);
    return($res);

}  




?>