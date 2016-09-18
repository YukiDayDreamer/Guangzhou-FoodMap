<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
<title>Plupload - Form dump</title>
</head>
<body style="font: 13px Verdana; background: #eee; color: #333">
	
<h1>上傳狀態</h1>

<p>已處理文件</p>

<table>
	<tr>
		<th>文件</th>
		<th>狀態</th>
	</tr>
	<?php $count = 0; foreach ($_POST as $name => $value) { ?>
	<tr class="<?php echo $count % 2 == 0 ? 'alt' : ''; ?>">
		<td><?php echo htmlentities(stripslashes($name)) ?></td>
		<td><?php echo nl2br(htmlentities(stripslashes($value))) ?></td>
	</tr>
	<?php } ?>
</table>

</body>
</html>
