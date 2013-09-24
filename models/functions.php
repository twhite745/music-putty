<?php

  function generateHead() {
  return '
    <html>
    <head>
    <link rel="stylesheet" href="style.css"></link>
    <audio id="player"> </audio>
    </head>
    <body>
    <div id="play-bar"><pop>pause</pop> - <song></song> - <album></album> - <band></band></div>
    <div id="content">';
  }
  
  function generateFoot() {
  return '</div>
        </body>
        <script src="/js/jquery-1.10.2.min.js"></script>
        <script src="/js/jPlayer/jquery.jplayer.min.js"></script>
        <script src="script.js"></script>
        </html>';
  }

  function dbConnect() {
    $con=mysqli_connect("localhost","root","hello","musicPutty");
    if (mysqli_connect_errno($con)) {
       echo "can't connect to database... " . mysqli_connect_error();
    }
    mysqli_select_db("musicPutty");
    return $con;
  }
	
  function getBands() {
    $con = dbConnect();
    return mysqli_query($con,"SELECT bID,bName FROM band");
    mysqli_close($con);
  }

  function getSongs() {
    $con = dbConnect();
    return mysqli_query($con,"SELECT song.sID,song.aID,song.bID,song.sName,album.aName,band.bName FROM song
                           LEFT JOIN album ON album.aID=song.aID
                           LEFT JOIN band ON band.bID=song.bID");
    mysqli_close($con);
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
  }

  //DRAW: generates htm of one item.
  function generateSong($songArray) {
    return "<tr data-src='/media/".$songArray["bID"]."/".$songArray["aID"]."/".$songArray["sID"]."'><td class='name'>".$songArray["sName"]."</td></tr>";
  }

  function generateAlbum($albumArray) {
    $con = dbConnect();
    $songs = getSongsByAlbum($albumArray["aID"]);
    return "<div class='album' data-bName=".$albumArray["bName"].">
              <h1>".$albumArray["aName"]."</h1>
              <img src='".generatePathToAlbumArt($albumArray["bID"],$albumArray["aID"])."' />
              <table>".generateSongs($songs)."</table>
            </div>";
    mysqli_close($con);
  }
//TODO: get data-sample-aName and sName working somehow so js can have the sample's track info
  function generateBand($bandArray) {
    $html = "<div class='band play' data-sample-aName='noaName' data-sample-sName='nosName' data-src='/media/".$bandArray["bID"]."/sample' >
               <playButton>playme</playButton>
               <h1>".$bandArray["bName"]."</h1>
               <img src='".generatePathToBandArt($bandArray["bID"])."' />
             </div>";
    return $html;
  }
   
   

  //DrawAll: returns html of every item requested
  function generateSongs($songResult) {
    while ($song = mysqli_fetch_assoc($songResult)) {
      $result .= generateSong($song);
    }
    return $result;
  }

  function generateAlbums($albumResult) {
    while ($album = mysqli_fetch_assoc($albumResult)) {
      $result .= generateAlbum($album);
    }
    return $result;
  }

  function generateBands($bandResult) {
    while ($band = mysqli_fetch_assoc($bandResult)) {
      $result .= generateBand($band);
    }
    return $result;
  }

  function generatePathToAlbumArt($bandID,$albumID) {
    return "/media/".$bandID."/".$albumID."/".$albumID.".jpg";
  }

  function generatePathToBandArt($bandID) {
    return "/media/".$bandID."/".$bandID.".jpg";
  }

  
?>
