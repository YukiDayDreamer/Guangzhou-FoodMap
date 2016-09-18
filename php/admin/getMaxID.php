<?php

include "connection.php";  // php database connection file

$table = $_SESSION['table'];  // load table from connection.php

$sql = "SELECT max(`id`) as max_id FROM `$table` ";

$result = mysql_query($sql);

$row = mysql_fetch_row($result);

// if no items, max_id is 0
$maxID = $row[0];

print json_encode($maxID);

