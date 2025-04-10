<?php    
    // gets entire POST body
    $data = file_get_contents('php://input');

    // write the data out to the file
    $fp = fopen("/var/www/html/uploads/AllLatLng.json", "wb");

    fwrite($fp, $data);
    fclose($fp);
?>
