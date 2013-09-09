<?php
  include ("functions.php");
  echo(generateHead());
  $albums = getAlbumsByBand(1);
  echo(generateAlbums($albums));
  echo(generateFoot());
?>
