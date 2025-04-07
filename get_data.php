
<?php
// Allow requests from any origin (you can restrict this to a specific domain for more security)
header('Access-Control-Allow-Origin: *');

// Allow certain HTTP methods (GET, POST, etc. - adjust as needed)
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

// Allow certain headers (you may want to adjust or restrict these based on your needs)
header('Access-Control-Allow-Headers: Content-Type');

// Handle the OPTIONS method (this is important for preflight requests)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // If it's an OPTIONS request, we just return 200 OK
    http_response_code(200);
    exit;
}

// Get the current directory
$currentDir = dirname(__FILE__);
$filePath = $currentDir . '/Data/AllLatLng.json';

// Check if the file exists
if (file_exists($filePath)) {
    // Read the file content
    $jsonContent = file_get_contents($filePath);

    // Set the response header to tell the client we're sending JSON
    header('Content-Type: application/json');

    // Echo the JSON content to the client
    echo $jsonContent;
} else {
    // Handle the error if the file doesn't exist
    echo json_encode(["error" => "File not found"]);
}
?>
