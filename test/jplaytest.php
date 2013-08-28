<?php
$con=mysqli_connect("localhost","root","hello","musicPutty");
if (mysqli_connect_errno($con)) {
   echo "can't connect to database... " . mysqli_connect_error();
}
mysqli_select_db("musicPutty");

$result=mysqli_query($con,"SELECT song.sID,song.aID,song.bID,song.sName,album.aName,band.bName FROM song
                              LEFT JOIN album ON album.aID=song.aID
                              LEFT JOIN band ON band.bID=song.bID");
?>
<html>
<head>
</head>
while ($row = mysqli_fetch_row($result)) {
//0:sID
//1:aID
//2:bID
//3:song
//4:album
//5:band
echo ("<p bID=".$row[2].">" . $row[5] . " - " . $row[3] . " - " . $row[4] . "</p>");
}
<?php
   while ($row = mysqli_fetch_assoc($result)) {
      $rows[] = $row;
      echo ("<p sID=".$row["sID"].">" . $row['bName'] . " - " . $row['aName'] . " - " . $row['sName'] . "</p>");
   }
   $json=json_encode($rows);
   file_put_contents("request.json", $json);
?>



<body>
   <div id="play-bar">hi</div>
   <div id="j" style="position:absolute;left:0;right:0,height:100px"></div>
   <div id="play-button">click 2 play</div>
   <div id="changed-thing">i am not playing</div>
   <audio id="player">
      <source src="/media/sound1.mp3">
      <source src="/media/sound1.ogg">
   </audio>
</body>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="/js/jPlayer/jquery.jplayer.min.js"></script>
<script src="test.js"></script>
</html>

   
