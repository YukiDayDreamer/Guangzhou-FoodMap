<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

header("Content-type: text/html;charset=utf-8"); //utf-8
include "connection.php";  // php database connection file

$table = $_SESSION['table'];  // table info from conneciton

$sql = "SELECT * FROM `$table`";  // fetch all items

$result = mysql_query($sql);  // exec sql query

$rows = array();  // init return rows

while ($item = mysql_fetch_assoc($result)) {
    $rows[] = [
        'id' => (int) $item['id'], 'name' => $item['name'], 'label' => $item['label'],
        'recommendation' => (int) $item['recommendation'], 'full' => (int) $item['full'],
        'lat' => (double) $item['lat'], 'lng' => (double) $item['lng'],
        'thumbnail' => $item['thumbnail'], 'description' => $item['description'],
        'path' => $item['path'], 'pathID' => (int) $item['pathID'],
        'pathOnly' => (int) $item['pathOnly'], 'price' => $item['price'],
    ];
}

print json_encode($rows);

mysql_close();
