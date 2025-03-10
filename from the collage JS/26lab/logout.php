<?php
session_start();
unset($_SESSION['login']);
session_destroy();
header('Location: /siteExample/26lab/');
die();