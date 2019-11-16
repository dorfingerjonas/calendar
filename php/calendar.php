<?php
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
    # $line[] = date("m/d/y H:i", strtotime($lineContent[1] . " " . $lineContent[2]));
    # $line[] = date("m/d/y H:i", strtotime($lineContent[3] . " " . $lineContent[4]));
    $line[] = $lineContent[1] . " " . $lineContent[2];
    $line[] = $lineContent[3] . " " . $lineContent[4];
    $line[] = strtolower($lineContent[5]);
    $terms[] = $line;
}

echo json_encode($terms);