<?php
session_start();
if (empty($_SESSION['login'])) {
    header('location:/index.php');
    die();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The End!</title>
</head>
<body>
    <p>Ласкаво просимо що зайшли Користувач:<?=$_SESSION['login']?></p>
    <a href="/siteExample/26lab/logout.php">Вийти</a>
</body>
</html>