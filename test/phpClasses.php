<?php
function echoHead() {
echo('
  <html>
  <head>
  <link rel="stylesheet" href="style.css"></link>
  <audio id="player"> </audio>
  </head>
  <body>
  <div id="play-bar"><pop>pause</pop> - <song></song> - <album></album> - <band></band></div>
  <div id="content">');
}

  function mysqliConnect() {
    $con=mysqli_connect("localhost","root","hello","musicPutty");
    if (mysqli_connect_errno($con)) {
       echo "can't connect to database... " . mysqli_connect_error();
    }
    mysqli_select_db("musicPutty");
    return $con;
  }
	
  function getBands($con) {
   return mysqli_query($con,"SELECT bID,bName FROM band");
  }

  function getSongs($con) {
   return mysqli_query($con,"SELECT song.sID,song.aID,song.bID,song.sName,album.aName,band.bName FROM song
				 LEFT JOIN album ON album.aID=song.aID
				 LEFT JOIN band ON band.bID=song.bID");
  }

  function getAlbums($con,$bID) {
    $string="SELECT * from album WHERE bID=".$bID;
    $return = mysqli_query($con,$string);
    echo ('getAlbums: query reads '.$string);
    return $return;
  }

  class Song {
    public $sID;
    public $aID;
    public $sName;
    public $html;
    public function __construct($aArray) {
      $this->sID = $aArray["sID"];
      $this->aID = $aArray["aID"];
      $this->sName = $aArray["sName"];
      $this->html = "<tr data-sid='".$this->sID."' data-aid='".$this->aID."'><play button>playme</playbutton><h1>".$this->sName."</h1></tr>";
    }
    public function generateSong() {
      echo($this->html);
    }
  }


  class AlbumTile {
    public $aID;
    public $aName;
    public $image;
    public $html;
    public $songList;
    public function __construct($aArray, $songsArray) {
      $this->aID = $aArray["aID"];
      $this->aName = $aArray["aName"];
      $this->image = "/media/".$bID."/".$this->aID."/".$this->aID."-image.jpg";
      /*$this->songList = getSongsHtml($songsArray);*/
      $this->html = 
        "<div class='albumTile'>
           <h1>".$this->aName."</h1>
           <img src='".$this->image."' />
           <table>
           ".$this->songList."
           </table>";
    }
    public function getSongsHtml($songs) {
      echo('getting song\'s html now...');
      $temp;
      $string = '';
      while($song = mysqli_fetch_assoc($aArray)) {
        if ($song["aID"] == $this->aID) {
           $temp = new Song($song);
           $string .= $temp.generateSong();
        }
      }
      return $string;
    }
    public function generateAlbum() {
      echo ('uh');
      echo ($this->html);
    }
  }
 
  class BandTile {
    private $bID;
    private $bName;
    private $image;
    private $html;
    
    public function __construct($aArray) {
      $this->bID = $aArray["bID"];
      $this->bName = $aArray["bName"];
      $this->image = "/media/".$this->bID."/".$this->bID."-image.jpg";
      $this->html = "<div data-bid="
                    . $this->bID
                    . " class='bandTile'><play-button>playme</play-button><h1>"
                    . $this->bName
                    . "</h1><img src='"
                    . $this->image
                    . "' /></div>";
    }
    public function generateTile() {
      echo($this->html);
    }
  }

function generateTiles($result) {
   while ($row = mysqli_fetch_assoc($result)) {
     $tile = new BandTile($row);
     $tile->generateTile();
     unset($tile);
   }
}

  function generateAlbums($albums,$songs) {
    echo('generating html for albums... ');
    while($temp = mysqli_fetch_assoc($albums)) {
      var_dump($temp);
      $album = new AlbumTile($temp, $songs);
      echo ('new AlbumTile object created... ');
      $album.generateAlbum();
      echo('album generated');
    }
  }



function echofoot() {
echo('</div>
      </body>
      <script src="/js/jquery-1.10.2.min.js"></script>
      <script src="/js/jPlayer/jquery.jplayer.min.js"></script>
      <script src="test2.js"></script>
      </html>');
}
?>

   
