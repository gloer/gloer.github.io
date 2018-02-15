 <?php

        $str_json = file_get_contents('php://input');

        $obj = json_decode($str_json);

        $dom_tider = $obj->{'dominant'};
        $d1 = $dom_tider[0];
        $d2 = $dom_tider[1];
        $d3 = $dom_tider[2];
        $d4 = $dom_tider[3];
        $d5 = $dom_tider[4];

        $non_tider = $obj->{'nondominant'};
        $n1 = $non_tider[0];
        $n2 = $non_tider[1];
        $n3 = $non_tider[2];
        $n4 = $non_tider[3];
        $n5 = $non_tider[4];

        $msg = "Resultat fra testen: \n";
        $msg .= "Average dominant hand: " . $obj->{'dominantAverage'} . "\n";
        $msg .= "Average non-dominant hand: " . $obj->{'nondominantAverage'} . "\n";
        $msg .= "Dominant hand: " . $d1 . ", " . $d2 . ", " . $d3 . ", " . $d4 . ", " . $d5 . "\n";
        $msg .= "Non-Dominant hand: " . $n1 . ", " . $n2 . ", " . $n3 . ", " . $n4 . ", " . $n5 . "\n";
        $msg .= "\n\nHilsen oss i Tap Counter - Vestre Viken";

        mail($obj->{'receiver'}, $obj->{'tittel'}, $msg, );
 

?>
