<?php
$con=mysqli_connect("localhost","root","hello","musicPutty");
if (mysqli_connect_errno($con)) {
   echo "can't connect to database... " . mysqli_connect_error();
}
mysqli_select_db("musicPutty");

$result=mysqli_query($con,"SELECT song.sID,song.aID,song.bID,song.sName,album.aName,band.bName FROM song
                              LEFT JOIN album ON album.aID=song.aID
                              LEFT JOIN band ON band.bID=song.bID LIMIT 8");
?>
<html>
<head>
<link rel="stylesheet" href="style.css"></link>
<audio id="player"> </audio>
</head>
<body>
<div id="play-bar"><pop>pause</pop> - <song></song> - <album></album> - <band></band></div>
<div id="content">

<?php 
  class BandTile {
    public $bID;
    public $bName;
    public $image;
    public $html;
    
    public function __construct($aArray) {
      $this->bID = $aArray["bID"];
      $this->bName = $aArray["bName"];
      $this->image = "/media/".$this->bID."/".$this.->bID."-image.jpg";
      $this->html = "<div class='bandTile'><play-button></play-button><h1>"
                    . $this->bName
                    . "</h1><img src='"
                    . $this->image
                    . "' /></div>"
    }
    public function generateTile() {
      echo($this->html);
    }
?>



<?php
   while ($row = mysqli_fetch_assoc($result)) {
      $rows[] = $row;
      printf("<div class='play' data-pathLoaded=0 data-sID='%s' data-bID='%s' data-aID='%s'>
                 <div class='info'>
                    <song>%s</song><album>%s</album><band>%s</band>
                 </div>
                 <div class='art'>
                    <img src='/media/%s/%s/%s.jpg' />
                 </div>
              </div>", $row["sID"], $row["bID"], $row["aID"], 
                       $row["sName"],$row["aName"], $row["bName"], 
                       $row["bID"], $row["aID"], $row["aID"]);
   }
?>


</div>
</body>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="/js/jPlayer/jquery.jplayer.min.js"></script>
<script src="test.js"></script>
</html>

   
