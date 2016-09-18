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
$id = $item->{'id'};
$name = $item->{'name'};
$label = $item->{'label'};
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
$sql = "UPDATE `$table` SET "
        . "`name`='$name',`label`='$label',`recommendation`='$recommendation',"
        . "`full`='$full',`lat`='$lat',`lng`='$lng',`thumbnail`='$thumbnail',"
        . "`description`='$description',`path`='$path',`pathID`='$pathID',"
        . "`pathOnly`='$pathOnly',`price`='$price' WHERE `id`= '$id' ";

mysql_query($sql);  // exec sql query

mysql_close();
