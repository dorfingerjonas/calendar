<?php
$file = fopen("../data2019.csv", "r") or die("Unable to open file!");
$content = [];

while (!feof($file)) {
    $content[] = fgets($file);
}

echo json_encode($content);