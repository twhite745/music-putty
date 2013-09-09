<?php
  include ("functions.php");
  echo(generateHead());
  $bands = getBands();
  echo(generateBands($bands));
  echo(generateFoot());
?>

