<?php 

include('phpClasses.php');

$con = mysqliConnect();
$result = getBands($con);

echoHead();
generateTiles($result);
echoFoot();

?>

