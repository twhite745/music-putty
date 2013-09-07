<?php 
include('phpClasses.php');
$con = mysqliConnect();
$songs = getSongs($con);
$bID = 1;
echoHead();
$albums = getAlbums($con,$bID);
var_dump($albums);


generateAlbums($albums,$songs);
echoFoot();
?>

