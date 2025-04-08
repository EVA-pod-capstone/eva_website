<?php    
    // gets entire POST body
    $data = file_get_contents('php://input');
    $json_data = json_decode($data);
    $lat = $json_data->latitude;
    $long = $json_data->longitude;
    // write the data out to the file
    $fp = fopen("/var/www/html/uploads/".$lat."_".$long.".json", "wb");

    fwrite($fp, $data);
    fclose($fp);
?>
