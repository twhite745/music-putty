<?php
class Requests {

	
  function getBands() {
    $a = 3;
    F3::set('result',F3::get('db')->exec('SELECT * FROM album'));
    $b = F3::get('result');
    
    var_dump ($b);
 }
/*
  static function getSongs() {
    $con = dbConnect();
    $json = array();
    $results = mysqli_query($con,"SELECT song.sID,song.aID,song.bID,song.sName,album.aName,band.bName FROM song
                       LEFT JOIN album ON album.aID=song.aID
                       LEFT JOIN band ON band.bID=song.bID");
    mysqli_close($con);
    while ($row = mysqli_fetch_assoc($results)) {
      $json[] = $row;
    }
    return json_encode($json);
  }

  function getSongsByAlbum($albumID) {
    $con = dbConnect();
    return mysqli_query($con,"SELECT song.sID,song.aID,song.bID,song.sName,album.aName,band.bName 
                       FROM song
                       LEFT JOIN album ON album.aID=song.aID
                       LEFT JOIN band ON band.bID=song.bID 
                       WHERE song.aID =".$albumID);
    mysqli_close($con);
  }

  function getSongsByBand($bandID) {
    $con = dbConnect();
    return mysqli_query($con,"SELECT song.sID,song.aID,song.bID,song.sName,album.aName,band.bName 
                       FROM song
                       LEFT JOIN album ON album.aID=song.aID
                       LEFT JOIN band ON band.bID=song.bID 
                       WHERE song.bID =".$bandID);
    mysqli_close($con);
  }

  function getAlbums() {
    $con = dbConnect();
    return mysqli_query($con,"SELECT album.aID,album.aName,album.bID,band.bName FROM album
                            LEFT JOIN band ON band.bID = album.bID");
    mysqli_close($con);
  }

  function getAlbumsByBand($bid) {
    $con = dbConnect();
    return mysqli_query($con,"SELECT album.aID,album.aName,album.bID,band.bName FROM album
                            LEFT JOIN band ON band.bID = album.bID WHERE band.bID=".$bid);
    mysqli_close($con);
  }*/
}
?>
