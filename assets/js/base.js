var audio = $('audio');
var bar = $('#play-bar');
var playButton = bar.find('pop');
var badges = new Object();
var json = 'hi';
var State = History.getState();

//making arrays iterable, insertable, for queue suitability
Array.prototype.insert = function insertAt(index) {
    var arrayToInsert = Array.prototype.splice.apply(arguments, [1]);
    return insertArrayAt(this, index, arrayToInsert);
}

function insertArrayAt(array, index, arrayToInsert) {
    Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
    return array;
}
 
Array.prototype.next = function() {
    return this[++this.current];
 }
  
Array.prototype.prev = function() {
   return this[--this.current];
}
 
Array.prototype.current = 0;

Array.prototype.curr = function() {
   return this[this.current];
}

//class SONG
var Song = function(bandName, albumName, songName, audioPath, artPath) {
   this.bandName = bandName;
   this.albumName = albumName;
   this.songName = songName;
   this.audioPath = audioPath;
   this.artPath = artPath;
}

var Player = function(audioElement, playBar) {
   this.queue = [];

   var audioElement = audioElement;

   var playBar = playBar;
   var song = playBar.find('song');
   var album = playBar.find('album');
   var band = playBar.find('band');

   var playButton = playBar.find("pop");

   playButton.on('click', function() {
      handlePlay();
   });


   this.handlePlay = function() {
      if (audioElement[0].paused) {
         audioElement.trigger('play');
      }
      else {
         audioElement.trigger('pause');
      }
   }

   this.setTitle = function(song, album, band) {
      playBar.find('song').html(song);
      playBar.find('album').html(album);
      playBar.find('band').html(band);
   }

   this.setPlay = function() {
      playBar.html('Playing');
      audioElement.trigger('play');
   }
   this.setPause = function() {
      playBar.html('Paused');
      audioElement.trigger('pause');
   }

   this.changeSource = function(source) {
      audioElement.html(source);
   }
}

var Badges = function(Player, domElements) {
   
   var Player = Player;
   var domElements = domElements;

   var loadSong = function(domElement) {
      Player.changeSource("<source src=" + domElement.json.sPath +" />");
      Player.setTitle("test" + domElement.json.sName, domElement.json.aName, domElement.json.bName);
   }
   
   domElements.click(function() {
      loadSong(this);
      Player.setPlay();
   });

}








$(document).ready(function() {
   //post required before more action
   jQuery.post(State.url, function(data) {
      json = JSON.parse(data);
      identify_badges();
   });
   History.Adapter.bind(window,'statechange',function() {
      State = History.getState();
      $('#content').load(State.url);
      jQuery.post(State.url, function(data) {
            json = JSON.parse(data);
            identify_badges();
      });
   });

   //FUNCTION: identify_badges
   //
   //assigns to each badge object a corresponding json string, which dictates behavior on clicks, pauses, display info, etc
   function identify_badges() {
      jQuery.each($('.bandBadge'), function(i) {
         this.json = json[i];
         badges[i] = this;
      });
   };
});

$('a').click(function(e) {
   e.preventDefault();
   History.pushState('','',$(this).attr('href'));
});



