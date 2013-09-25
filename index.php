<?php
$f3=require('lib/base.php');
$f3->config('config.ini');
$f3->set('db', new DB\SQL(
    'mysql:host=localhost;dbname=musicPutty',
    'root',
    'hello'
));
$f3->run();
?>
