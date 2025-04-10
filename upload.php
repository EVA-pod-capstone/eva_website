<?php    
    // gets entire POST body
    $data = file_get_contents('php://input');
    $json_data = json_decode($data);
    $lat = $json_data->latitude;
    $lng = $json_data->longitude;
    $lat_formatted = number_format((float)$lat, 4, '.', '');
    $lng_formatted = number_format((float)$lng, 4, '.', '');

    // write the data out to the file
    $fp = fopen("/var/www/html/uploads/".$lat_formatted."_".$lng_formatted.".json", "wb");

    fwrite($fp, $data);
    fclose($fp);
?>
