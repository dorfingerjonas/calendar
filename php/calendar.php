<?php
$req = $_POST['req'];

if ($req === 'dataRequest') {
    $file = fopen("../data2019.csv", "r") or die("Unable to open file!");
    $content = [];
    $terms = [];
    
    while (!feof($file)) {
        $content[] = fgets($file);
    }
    
    for ($i = 1; $i < sizeof($content); $i++) {
        $lineContent = explode(";", $content[$i]);
        $line = [];
        $line[] = $lineContent[0];
        $line[] = $lineContent[1] . " " . $lineContent[2];
        $line[] = $lineContent[3] . " " . $lineContent[4];
        $line[] = strtolower($lineContent[5]);
        $line[] = strtolower($lineContent[6]);
        $terms[] = $line;
    }
    
    echo json_encode($terms);
} else {
    $file = fopen("../data2019.csv", "a") or die("Unable to open file!");
    fwrite($file, "\n" . $req);
    fclose($file);

    $response = [];
    $response[] = 'success';

    echo json_encode($response);
}