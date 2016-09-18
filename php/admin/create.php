<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

header("Content-type: text/html;charset=utf-8"); //utf-8
include "connection.php";  // php database connection file

$table = $_SESSION['table'];

// decode json data
$item = json_decode($_POST['json']);

// data
$name = addslashes($item->{'name'});
$label = addslashes($item->{'label'});
$recommendation = $item->{'recommendation'};
$full = $item->{'full'};
$lat = $item->{'lat'};
$lng = $item->{'lng'};
$thumbnail = $item->{'thumbnail'};
$description = addslashes($item->{'description'});
$path = $item->{'path'};
$pathID = $item->{'pathID'};
$pathOnly = $item->{'pathOnly'};
$price = $item->{'price'};

// sql
$sql = "INSERT INTO `$table`(`name`, `label`, `recommendation`, "
        . "`full`, `lat`, `lng`, `thumbnail`, `description`, "
        . "`path`, `pathID`, `pathOnly`, `price`) "
        . "VALUES "
        . "('$name','$label','$recommendation',"
        . "'$full','$lat','$lng','$thumbnail','$description',"
        . "'$path','$pathID','$pathOnly','$price')";

mysql_query($sql);  // exec sql query

mysql_close();
