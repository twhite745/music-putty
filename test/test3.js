var isPlaying = false;
var player = $('audio');
var sel = $('.play:first');
var last = sel;
var bar = $('#play-bar');
var sBar = $('#play-bar song');
var aBar = $('#play-bar album');
var bBar = $('#play-bar band');
var sTile = $('.play:first song');
var aTile = $('.play:first album');
var bTile = $('.play:first band');
var sID = sel.attr('data-sid');
var aID = sel.attr('data-aid');
var bID = sel.attr('data-bid');
$('#changed-thing').click(function() {
  $('#play-button').html("hihihhhihi you are playing music lol lol lol")
});

$('.play').click(function() {
  last = sel;
  sel = $(this);
  sID = sel.attr('data-sid');
  aID = sel.attr('data-aid');
  bID = sel.attr('data-bid');
  sTile = sel.find('song');
  aTile = sel.find('album');
  bTile = sel.find('band');
  var albumArtPath = "/media/"+bID+"/"+aID+"/"+aID+".jpg";
  handlePlay();
  setBar();
});

function setBar() {
  sBar.html(sTile.html());
  aBar.html(aTile.html());
  bBar.html(bTile.html());
}
  
  

//returns true on success, false on failure to set source (due to current source already set)
function setSource(lastSong,currentSong) {
  if (currentSong.attr('data-pathloaded') == 0) {
    lastSong.attr('data-pathloaded',0);
    currentSong.attr('data-pathloaded',1);
    setAudioSource();
    return true;
  }
  else return false;
}

function setAudioSource() {
  player.html('<source src="/media/'+bID+'/'+aID+'/'+sID+'.mp3">');
  //player.html('<source src="/media/'+bID+'/'+aID+'/'+sID+'.ogg">');
}
    
   

function setPause() {
  player.trigger("pause");
  $('#play-bar pop').html('paused');
  isPlaying = false;
}
function setPlay() {
  player.trigger("play");
  $('#play-bar pop').html('playing');
  isPlaying = true;
}

function togglePlay(playing) {
   if (playing) {
      setPause();
   }
   else {
      setPlay();
   }
}

function handlePlay() {
  var didItSet = setSource(last,sel);
  if (!didItSet) {
    togglePlay(isPlaying);
  }
  else {
    setPlay();

  }
}
      

  

var playSong = function(song,artist,band) {
	$('#play-bar').html(song + " " + artist + " " + band);
};
