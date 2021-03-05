<?php
    // Question 1
    
    function dateDiffrence($from,$to){
        $from = explode('T',$from);
        $to = explode('T',$to);
        $from_date = explode('-',$from[0]);
        $to_date = explode('-',$to[0]);
        $result = [];
        $days = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        $result[0] = 0;

        if($to_date[0] > $from_date[0])
        {
            $to_date[1] = intval($to_date[1]) + 12*($to_date[0]-$from_date[0]);
        }

        if($from_date[2] < $to_date[2])
        {
            $result[1] = $to_date[1] - $from_date[1]; //months
            $result[2] = $to_date[2] - $from_date[2]; //days
        }

        if($from_date[2] > $to_date[2])
        {
            $result[1] = $to_date[1] - $from_date[1] - 1; //months
            $result[2] = $days[intval($from_date[1])]-($from_date[2]) + intval($to_date[2]);
        }

        if($from_date[2] == $to_date[2])
        {
            $result[1] = $to_date[1] - $from_date[1]; //months
            $result[2] = 0;
        }

        while($result[1] > 12)
        {
            $result[0]++;
            $result[1] -= 12;
        }
        return($result[0]." years ".$result[1]." months ".$result[2]." days");
    }
 
    // Question 2
    function union($set_a,$set_b)
    {
        $a = explode(',',$set_a);
        $b = explode(',',$set_b);

        for($i=0; $i<count($b); $i++)
        {
            if(!array_search($b[$i],$a)){
                array_push($a,$b[$i]);
            }
        }

        $out = "";

        for($i=0; $i<count($a); $i++)
        {
            $out .= $a[$i];
            if($i!= count($a)-1)
            {
                $out .= ',';
            }
        }

        echo "Union: ".$out;
    }
    
    function minus($set_a,$set_b)
    {        
        $a = explode(",",$set_a);
        $b = explode(",",$set_b);
      
        $out = "";

        for($i=0; $i<count($a); $i++)
        {
            if (!in_array($a[$i], $b))
            {
                $out.=$a[$i];
                if($i!=count($a)-1)
                {
                    $out.=',';
                }
            }
        }    
        echo "Minus: ".$out;    
    }

    function intersection($set_a,$set_b)
    {        
        $a = explode(",",$set_a);
        $b = explode(",",$set_b);
      
        $out = "";

        for($i=0; $i<count($a); $i++)
        {
            if (in_array($a[$i], $b))
            {
                $out.=$a[$i];
                if($i!=count($a)-1)
                {
                    $out.=',';
                }
            }
        }    
        echo "Intersection: ".$out;    
    }

    // OTP
    function random() {
        return (float)rand()/(float)getrandmax();
    }

    function otp($length)
    {
        $mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_+-={}[]:";\'>?,./|\\';
        $mask = str_split($mask);
        $result = "";
        for ($i = 0; $i < $length; $i++){
            $result .= $mask[floor(random()*count($mask))];
        } 
        return $result;  
    }

    function getName($num){

        $first = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
        $tens = ['', '', 'Twenty ','Thirty ','Forty ','Fifty ', 'Sixty ','Seventy ','Eighty ','Ninety '];
        $result = "";
    
        if((floor($num/100))%10){
            $result = $first[floor($num/100)%10]."Hundred "; //For Hundred
            $num = $num%100;
        } 
    
        if(floor($num/10) == 1)$result .= $first[$num]; // For 11 - 19
        else $result .= $tens[floor($num/10)] . $first[$num%10]; // Rem Numbers
    
        return $result;
    
    }

    function getCurrencyName($code){
        switch($code)
          {
            case "INR":return 'Indian Rupees'; break;
            case "USD":return 'United States Dollars'; break;
            case "EUR":return 'European euro'; break;
            case "QAR":return 'Qatari riyal'; break;
            case "RUB":return 'Russian ruble'; break;
            default: return $code; break;    
          }
      }
      
    
    function numInWords($num) {
        $result = "";
        $input = explode(" ",$num);
        $number = $input[0];
        $currency = getCurrencyName($input[1]);

      if(floor($number/10000000)){
          $crores = floor($number/10000000); 
    
          if(floor($crores/100000)){
              $result .=  getName(floor($crores/100000)) . "Lakh ";
              $crores = $crores %100000;                        
          }
          if(floor($crores/1000)){
              $result .= getName(floor($crores/1000)) ." Thousand ";
              $crores = $crores%1000;
          }
    
          $result .= getName($crores) . "Crores ";
          $number = $number %10000000;
      }
      if(floor($number/100000)){
          $result .=  getName(floor($number/100000)) . "Lakh ";
          $number = $number %100000;                        
      }
      if(floor($number/1000)){
          $result .= getName(floor($number/1000)) ." Thousand ";
          $number = $number%1000;
      }
    
      $result .= getName($number);
    
    
      echo $result.' '.$currency;  
    }

    function transpose($original)
    {
        $copy = [];
        for ($i = 0; $i < count($original); ++$i) {
            for ($j = 0; $j < count($original[$i]); ++$j) {
                if ($original[$i][$j] === NULL) continue;
                if (!array_key_exists($j,$copy)) $copy[$j] = [];
                $copy[$j][$i] = $original[$i][$j];
            }
        }  
        return $copy;  
    }

    function diagonal($original,$type){
        $size = count($original);
        
        for ($i = 0; $i < $size; $i++) { 
            for ($j = 0; $j < $size; $j++) 
            {
                if($i>$j && $type==1)$original[$i][$j] = "";
                if($i+$j >= $size && $type == 2)$original[$i][$j] = "";
                if($i+$j < $size-1 && $type == 3)$original[$i][$j] = "";
                if($i<$j && $type==4)$original[$i][$j] = "";
            } 
        } 
        
        return $original;  
      }
  
    //   RSA

    function rsa_enc($data)
    {
        $public_key = file_get_contents('public.pem');
        GLOBAL $b64;
    
        if(openssl_public_encrypt($data, $encrypted, $public_key))
        {
            $b64 = base64_encode($encrypted);
        }
        return $b64;    
    }

    function rsa_dec($data){
        $b64_dec = base64_decode($data);
        $private_key = file_get_contents('private.pem');
        openssl_private_decrypt($b64_dec, $decrypted, $private_key);
        return $decrypted;
    }

	function barcode($text) {
        $filepath="images/barcode.png"; 
        $size="50"; 
        $orientation="horizontal"; 
        $code_type="code128"; 
        $print=false;
        $SizeFactor=1;
		$code_string = "";
		// Translate the $text into barcode the correct $code_type
		if ( in_array(strtolower($code_type), array("code128", "code128b")) ) {
			$chksum = 104;
			// Must not change order of array elements as the checksum depends on the array's key to validate final code
			$code_array = array(" "=>"212222","!"=>"222122","\""=>"222221","#"=>"121223","$"=>"121322","%"=>"131222","&"=>"122213","'"=>"122312","("=>"132212",")"=>"221213","*"=>"221312","+"=>"231212",","=>"112232","-"=>"122132","."=>"122231","/"=>"113222","0"=>"123122","1"=>"123221","2"=>"223211","3"=>"221132","4"=>"221231","5"=>"213212","6"=>"223112","7"=>"312131","8"=>"311222","9"=>"321122",":"=>"321221",";"=>"312212","<"=>"322112","="=>"322211",">"=>"212123","?"=>"212321","@"=>"232121","A"=>"111323","B"=>"131123","C"=>"131321","D"=>"112313","E"=>"132113","F"=>"132311","G"=>"211313","H"=>"231113","I"=>"231311","J"=>"112133","K"=>"112331","L"=>"132131","M"=>"113123","N"=>"113321","O"=>"133121","P"=>"313121","Q"=>"211331","R"=>"231131","S"=>"213113","T"=>"213311","U"=>"213131","V"=>"311123","W"=>"311321","X"=>"331121","Y"=>"312113","Z"=>"312311","["=>"332111","\\"=>"314111","]"=>"221411","^"=>"431111","_"=>"111224","\`"=>"111422","a"=>"121124","b"=>"121421","c"=>"141122","d"=>"141221","e"=>"112214","f"=>"112412","g"=>"122114","h"=>"122411","i"=>"142112","j"=>"142211","k"=>"241211","l"=>"221114","m"=>"413111","n"=>"241112","o"=>"134111","p"=>"111242","q"=>"121142","r"=>"121241","s"=>"114212","t"=>"124112","u"=>"124211","v"=>"411212","w"=>"421112","x"=>"421211","y"=>"212141","z"=>"214121","{"=>"412121","|"=>"111143","}"=>"111341","~"=>"131141","DEL"=>"114113","FNC 3"=>"114311","FNC 2"=>"411113","SHIFT"=>"411311","CODE C"=>"113141","FNC 4"=>"114131","CODE A"=>"311141","FNC 1"=>"411131","Start A"=>"211412","Start B"=>"211214","Start C"=>"211232","Stop"=>"2331112");
			$code_keys = array_keys($code_array);
			$code_values = array_flip($code_keys);
			for ( $X = 1; $X <= strlen($text); $X++ ) {
				$activeKey = substr( $text, ($X-1), 1);
				$code_string .= $code_array[$activeKey];
				$chksum=($chksum + ($code_values[$activeKey] * $X));
			}
			$code_string .= $code_array[$code_keys[($chksum - (intval($chksum / 103) * 103))]];

			$code_string = "211214" . $code_string . "2331112";
		} elseif ( strtolower($code_type) == "code128a" ) {
			$chksum = 103;
			$text = strtoupper($text); // Code 128A doesn't support lower case
			// Must not change order of array elements as the checksum depends on the array's key to validate final code
			$code_array = array(" "=>"212222","!"=>"222122","\""=>"222221","#"=>"121223","$"=>"121322","%"=>"131222","&"=>"122213","'"=>"122312","("=>"132212",")"=>"221213","*"=>"221312","+"=>"231212",","=>"112232","-"=>"122132","."=>"122231","/"=>"113222","0"=>"123122","1"=>"123221","2"=>"223211","3"=>"221132","4"=>"221231","5"=>"213212","6"=>"223112","7"=>"312131","8"=>"311222","9"=>"321122",":"=>"321221",";"=>"312212","<"=>"322112","="=>"322211",">"=>"212123","?"=>"212321","@"=>"232121","A"=>"111323","B"=>"131123","C"=>"131321","D"=>"112313","E"=>"132113","F"=>"132311","G"=>"211313","H"=>"231113","I"=>"231311","J"=>"112133","K"=>"112331","L"=>"132131","M"=>"113123","N"=>"113321","O"=>"133121","P"=>"313121","Q"=>"211331","R"=>"231131","S"=>"213113","T"=>"213311","U"=>"213131","V"=>"311123","W"=>"311321","X"=>"331121","Y"=>"312113","Z"=>"312311","["=>"332111","\\"=>"314111","]"=>"221411","^"=>"431111","_"=>"111224","NUL"=>"111422","SOH"=>"121124","STX"=>"121421","ETX"=>"141122","EOT"=>"141221","ENQ"=>"112214","ACK"=>"112412","BEL"=>"122114","BS"=>"122411","HT"=>"142112","LF"=>"142211","VT"=>"241211","FF"=>"221114","CR"=>"413111","SO"=>"241112","SI"=>"134111","DLE"=>"111242","DC1"=>"121142","DC2"=>"121241","DC3"=>"114212","DC4"=>"124112","NAK"=>"124211","SYN"=>"411212","ETB"=>"421112","CAN"=>"421211","EM"=>"212141","SUB"=>"214121","ESC"=>"412121","FS"=>"111143","GS"=>"111341","RS"=>"131141","US"=>"114113","FNC 3"=>"114311","FNC 2"=>"411113","SHIFT"=>"411311","CODE C"=>"113141","CODE B"=>"114131","FNC 4"=>"311141","FNC 1"=>"411131","Start A"=>"211412","Start B"=>"211214","Start C"=>"211232","Stop"=>"2331112");
			$code_keys = array_keys($code_array);
			$code_values = array_flip($code_keys);
			for ( $X = 1; $X <= strlen($text); $X++ ) {
				$activeKey = substr( $text, ($X-1), 1);
				$code_string .= $code_array[$activeKey];
				$chksum=($chksum + ($code_values[$activeKey] * $X));
			}
			$code_string .= $code_array[$code_keys[($chksum - (intval($chksum / 103) * 103))]];

			$code_string = "211412" . $code_string . "2331112";
		} elseif ( strtolower($code_type) == "code39" ) {
			$code_array = array("0"=>"111221211","1"=>"211211112","2"=>"112211112","3"=>"212211111","4"=>"111221112","5"=>"211221111","6"=>"112221111","7"=>"111211212","8"=>"211211211","9"=>"112211211","A"=>"211112112","B"=>"112112112","C"=>"212112111","D"=>"111122112","E"=>"211122111","F"=>"112122111","G"=>"111112212","H"=>"211112211","I"=>"112112211","J"=>"111122211","K"=>"211111122","L"=>"112111122","M"=>"212111121","N"=>"111121122","O"=>"211121121","P"=>"112121121","Q"=>"111111222","R"=>"211111221","S"=>"112111221","T"=>"111121221","U"=>"221111112","V"=>"122111112","W"=>"222111111","X"=>"121121112","Y"=>"221121111","Z"=>"122121111","-"=>"121111212","."=>"221111211"," "=>"122111211","$"=>"121212111","/"=>"121211121","+"=>"121112121","%"=>"111212121","*"=>"121121211");

			// Convert to uppercase
			$upper_text = strtoupper($text);

			for ( $X = 1; $X<=strlen($upper_text); $X++ ) {
				$code_string .= $code_array[substr( $upper_text, ($X-1), 1)] . "1";
			}

			$code_string = "1211212111" . $code_string . "121121211";
		} elseif ( strtolower($code_type) == "code25" ) {
			$code_array1 = array("1","2","3","4","5","6","7","8","9","0");
			$code_array2 = array("3-1-1-1-3","1-3-1-1-3","3-3-1-1-1","1-1-3-1-3","3-1-3-1-1","1-3-3-1-1","1-1-1-3-3","3-1-1-3-1","1-3-1-3-1","1-1-3-3-1");

			for ( $X = 1; $X <= strlen($text); $X++ ) {
				for ( $Y = 0; $Y < count($code_array1); $Y++ ) {
					if ( substr($text, ($X-1), 1) == $code_array1[$Y] )
						$temp[$X] = $code_array2[$Y];
				}
			}

			for ( $X=1; $X<=strlen($text); $X+=2 ) {
				if ( isset($temp[$X]) && isset($temp[($X + 1)]) ) {
					$temp1 = explode( "-", $temp[$X] );
					$temp2 = explode( "-", $temp[($X + 1)] );
					for ( $Y = 0; $Y < count($temp1); $Y++ )
						$code_string .= $temp1[$Y] . $temp2[$Y];
				}
			}

			$code_string = "1111" . $code_string . "311";
		} elseif ( strtolower($code_type) == "codabar" ) {
			$code_array1 = array("1","2","3","4","5","6","7","8","9","0","-","$",":","/",".","+","A","B","C","D");
			$code_array2 = array("1111221","1112112","2211111","1121121","2111121","1211112","1211211","1221111","2112111","1111122","1112211","1122111","2111212","2121112","2121211","1121212","1122121","1212112","1112122","1112221");

			// Convert to uppercase
			$upper_text = strtoupper($text);

			for ( $X = 1; $X<=strlen($upper_text); $X++ ) {
				for ( $Y = 0; $Y<count($code_array1); $Y++ ) {
					if ( substr($upper_text, ($X-1), 1) == $code_array1[$Y] )
						$code_string .= $code_array2[$Y] . "1";
				}
			}
			$code_string = "11221211" . $code_string . "1122121";
		}

		// Pad the edges of the barcode
		$code_length = 20;
		if ($print) {
			$text_height = 30;
		} else {
			$text_height = 0;
		}
		
		for ( $i=1; $i <= strlen($code_string); $i++ ){
			$code_length = $code_length + (integer)(substr($code_string,($i-1),1));
			}

		if ( strtolower($orientation) == "horizontal" ) {
			$img_width = $code_length*$SizeFactor;
			$img_height = $size;
		} else {
			$img_width = $size;
			$img_height = $code_length*$SizeFactor;
		}

		$image = imagecreate($img_width, $img_height + $text_height);
		$black = imagecolorallocate ($image, 0, 0, 0);
		$white = imagecolorallocate ($image, 255, 255, 255);

		imagefill( $image, 0, 0, $white );
		if ( $print ) {
			imagestring($image, 5, 31, $img_height, $text, $black );
		}

		$location = 10;
		for ( $position = 1 ; $position <= strlen($code_string); $position++ ) {
			$cur_size = $location + ( substr($code_string, ($position-1), 1) );
			if ( strtolower($orientation) == "horizontal" )
				imagefilledrectangle( $image, $location*$SizeFactor, 0, $cur_size*$SizeFactor, $img_height, ($position % 2 == 0 ? $white : $black) );
			else
				imagefilledrectangle( $image, 0, $location*$SizeFactor, $img_width, $cur_size*$SizeFactor, ($position % 2 == 0 ? $white : $black) );
			$location = $cur_size;
		}
		
        define('BASE_DIR', dirname(__FILE__).'/images/');
		$file = BASE_DIR . 'barcode' . '.png';
	
		// Draw barcode to the screen or save in a file
		if ( $filepath=="" ) {
			header ('Content-type: image/png');
			imagepng($image);
			imagedestroy($image);
		} else {
			imagepng($image,$file);
			imagedestroy($image);		
		}
	}
?>