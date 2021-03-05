<?php
include('functions_1.php');
include('functions_2.php');
include('qrcode.php');

header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');    
$method = explode("/",explode("?",$_SERVER['REQUEST_URI'])[0])[3];
session_start();
$requestMethod = $_SERVER['REQUEST_METHOD'];

if (in_array($requestMethod, ["GET", "POST", "PUT", "DELETE", "OPTIONS"])) {
    $requestMethodArray = array();
    $requestMethodArray = $_REQUEST;    

// Exercise 1 
    // Question 1
    if($method == "diffrence"){
        $from = $requestMethodArray['from'];
        $to = $requestMethodArray['to'];
        echo dateDiffrence($from,$to);
    }

    if($method == "union"){
        $set_a = $requestMethodArray['a'];
        $set_b = $requestMethodArray['b'];
        echo union($set_a,$set_b);
    }

    if($method == "minus"){
        $set_a = $requestMethodArray['a'];
        $set_b = $requestMethodArray['b'];
        echo minus($set_a,$set_b);
    }

    if($method == "intersection"){
        $set_a = $requestMethodArray['a'];
        $set_b = $requestMethodArray['b'];
        echo intersection($set_a,$set_b);
    }

    if($method == "otp"){
        $len = $requestMethodArray['length'];
        echo otp($len);
    }

    if($method == "numberinwords"){
        $num = $requestMethodArray['num'];
        echo numInWords($num);
    }

    if($method == "transpose"){
        $matrix = json_decode($requestMethodArray['matrix']);
        echo json_encode(transpose($matrix));
    }

    if($method == "diagonol"){
        $matrix = json_decode($requestMethodArray['matrix']);
        $type = $requestMethodArray['type'];
        echo json_encode(diagonal($matrix,$type));
    }

    if($method == "checksum"){
        $words = $requestMethodArray['words'];
        echo md5($words);
    }

    if($method == "barcode"){
        $data = $requestMethodArray['data'];
        barcode($data);
        $data = file_get_contents('images/barcode.png');
        $base64 = 'data:image/png'.';base64,' . base64_encode($data);
		echo $base64;
    }

    if($method == "qrcode"){
        $data = $requestMethodArray['data'];
        
        $generator = new QRCode($data, "f=8&ms=r&md=0.8");
		echo $generator->output_image();
    }

    if ($method == "captcha") {
		$captcha = otp(10); 
        $im = imagecreatetruecolor(75, 30); 
		$bgColor = imagecolorallocate($im, rand(0,100), rand(0,100), rand(0,100)); 
		$textColor = imagecolorallocate($im, rand(200,255), rand(200,255), rand(200,255)); 
        imagefill($im, 0, 0, $bgColor); 
		imagestring($im, 0, 0, 0, $captcha, $textColor); 

        
		define('BASE_DIR', dirname(__FILE__).'/images/');
		$file = BASE_DIR . 'images' . '.png';
		imagepng($im,$file);
		imagedestroy($im);
    
        $data = file_get_contents('images/images.png');
        $base64 = 'data:image/png'.';base64,' . base64_encode($data);
		echo $base64;
	}
    
// Exercise 2
    // Question 1
    if($method == "a2w"){
        $current = $requestMethodArray['i'];
        $voltage = $requestMethodArray['v'];
        $unit = $requestMethodArray['unit'];
        $pf = $requestMethodArray['pf'];
        $voltage_type = $requestMethodArray['vt'];
        echo("Watts: ".amps_to_w_converter($current,$voltage,$unit,$pf,$voltage_type));
    }

    if($method == "a2va"){
        $current = $requestMethodArray['i'];
        $voltage = $requestMethodArray['v'];
        $unit = $requestMethodArray['unit'];
        $voltage_type = $requestMethodArray['vt'];
        echo("Volt-Amps: ".amps_to_va_converter($current,$voltage,$unit,$voltage_type));
    }

    if($method == "a2v"){
        $current = $requestMethodArray['i'];
        $unit = $requestMethodArray['unit'];
        $with = $requestMethodArray['with'];
        echo("Volts: ".amps_to_volts_converter($current,$unit,$with));
    }

    if($method == "va2w"){
        $va = $requestMethodArray['va'];
        $pf = $requestMethodArray['pf'];
        echo("Watts: ".va_to_w_converter($va,$pf));
    }

    if($method == "va2a"){
        $va = $requestMethodArray['va'];
        $v = $requestMethodArray['v'];
        $phase = $requestMethodArray['phase'];
        $vt = $requestMethodArray['vt'];
        echo("Amps: ".va_to_amps_converter($va,$v,$phase,$vt));
    }

    // Watts
    if($method == "w2va"){
        $w = $requestMethodArray['w'];
        $pf = $requestMethodArray['pf'];
        echo("Volt-Amps: ".$w/$pf." VA");
    }
    if($method == "w2v"){
        $w = $requestMethodArray['w'];
        $a = $requestMethodArray['a'];
        $pf = $requestMethodArray['pf'];
        $ct = $requestMethodArray['ct'];
        $vt = $requestMethodArray['vt'];
      
        echo("Volts: ".w_to_v_converter($w,$a,$ct,$pf,$vt)." V");
    }
    if($method == "w2j"){
        $w = $requestMethodArray['w'];
        $t = $requestMethodArray['t'];
        echo("Joules: ".($w*$t)." J");
    }
    if($method == "w2a"){
        $w = $requestMethodArray['w'];
        $v = $requestMethodArray['v'];
        $pf = $requestMethodArray['pf'];
        $ct = $requestMethodArray['ct'];
        $vt = $requestMethodArray['vt'];
        echo("Current: ".w_to_amps_converter($w,$v,$ct,$pf,$vt)." A");
    }

    // Joules
    if($method == "j2w"){
        $j = $requestMethodArray['j'];
        $t = $requestMethodArray['t'];
        echo("Watts: ".($j/$t)." W");
    }
    if($method == "j2v"){
        $j = $requestMethodArray['j'];
        $c = $requestMethodArray['c'];
        echo("Volts: ".($j/$c)." V");
    }

    // Volts
    if($method == "v2w"){
        $v = $requestMethodArray['v'];
        $a = $requestMethodArray['a'];
        $pf = $requestMethodArray['pf'];
        $ct = $requestMethodArray['ct'];
        $vt = $requestMethodArray['vt'];
        echo("Watts: ".v_to_w_converter($v,$a,$ct,$pf,$vt)." W");
    }
    if($method == "v2j"){
        $c = $requestMethodArray['c'];
        $v = $requestMethodArray['v'];
        echo("Joules: ".($c*$v)." J");
    }
    if($method == "v2a"){
        $v = $requestMethodArray['v'];
        $t = $requestMethodArray['t'];
        $u = $requestMethodArray['u'];        
        echo("Current : ".volts_to_amps_converter($v,$t,$u)." A");
    }

    // Question 2
    if($method == "log"){
        $num = $requestMethodArray['num'];
        echo "Log(".$num."): ".Log_fn($num);
    }
    if($method == "natural_log"){
        $num = $requestMethodArray['num'];
        echo "Natural Log(".$num."): ".Log_fn($num)*(2.303);
    }
    if($method == "antilog"){
        $num = $requestMethodArray['num'];
        echo "AntiLog(".$num."): ".pow(10,$num);
    }

    // Question 3
    if($method == "gcf"){
        $x = $requestMethodArray['x'];
        $y = $requestMethodArray['y'];
        echo "GCF: ".gcf($x,$y);
    }
    if($method == "lcm"){
        $x = $requestMethodArray['x'];
        $y = $requestMethodArray['y'];
        echo "LCM: ".lcm($x,$y);
    }
    if($method == "root"){
        $num = $requestMethodArray['num'];
        $root = $requestMethodArray['root'];
        echo "Root: ".pow($num,1/$root);
    }
    // Question 4
    if($method == "trigonometry"){
        $x = $requestMethodArray['x'];
        $f = $requestMethodArray['func'];
        echo trig($x,$f);
    }
    if($method == "arcsin"){
        $degree = 180/(22/7); 
        $x = $requestMethodArray['x'];
        echo arcsin($x)*$degree;
    }
    if($method == "arccos"){
        $degree = 180/(22/7); 
        $x = $requestMethodArray['x'];
        echo arccos($x)*$degree;
    }
    if($method == "arctan"){
        $degree = 180/(22/7); 
        $x = $requestMethodArray['x'];
        echo arctan($x)*$degree;
    }
    // Question 5
    if($method == "deviation"){
        $data = explode(',',$requestMethodArray['data']);
        echo "Standard Deviation: ".round(mean_of_squareddiffrence($data) ** (1/2),2);
    }

    if($method == "variance"){
        $data = explode(',',$requestMethodArray['data']);
        echo "Variance: ".round(mean_of_squareddiffrence($data),2);
    }
    
    if($method == "linear_reg"){
        $x = $requestMethodArray['x'];
        $y = $requestMethodArray['y'];

        echo "Linear Regression: ".linear_regression($x,$y) ;
    }

    if($method =="rsa-enc")
    {
        $data = $requestMethodArray['message'];
        echo rsa_enc($data);
    }

    if($method =="rsa-dec")
    {
        $data = $requestMethodArray['data'];
        echo rsa_dec($data);
    }

    
}

// function encrypt($data,$pubkey)
// {
//     if (openssl_public_encrypt($data, $encrypted, $pubkey))
//         $data = base64_encode($encrypted);
//     else
//         throw new Exception('Unable to encrypt data. Perhaps it is bigger than the key size?');

//     return $data;
// }

// function decrypt($data,$privkey)
// {
//     if (openssl_private_decrypt(base64_decode($data), $decrypted, $this->privkey))
//         $data = $decrypted;
//     else
//         $data = '';

//     return $data;
// }

?>