<?php

//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);

header("Content-type: text/html;charset=utf-8"); //utf-8
include "connection.php";  // php database connection file

$table = $_SESSION['table'];  // table info from conneciton

$id = $_POST['id']; //$id = 2; // test only

$sql = "SELECT * FROM `$table` WHERE id = '$id'";  // only fetch one item

$result = mysql_query($sql);  // exec sql query

$row = array(mysql_fetch_assoc($result));  // fetch result to array

print json_encode($row);  // pass data

mysql_close();
