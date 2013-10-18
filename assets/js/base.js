var audio = $('audio');
var bar = $('#play-bar');
var playButton = bar.find('pop');
var badges = new Object();
var json = 'hi';
var State = History.getState();

//making arrays iterable, insertable, for queue suitability
Array.prototype.insert = function(index, arr) {
   var tmpArr = new Array(arr);
   if (tmpArr[0] === undefined) {
      tmpArr = [tmpArr];
   }
   tmpArr.splice(0,0,index,0);
   Array.prototype.splice.apply(this,tmpArr);
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

//GLOBAL VARS
var isSong = function(possibleSong) {
   return possibleSong instanceof Song;
}
   

//class SONG
var Song = function(bandName, albumName, songName, audioPath, artPath) {
   this.bandName = bandName;
   this.albumName = albumName;
   this.songName = songName;
   this.audioPath = audioPath;
   this.artPath = artPath;
}

var Queue = function() {
   this.data = new Array();
}

Queue.prototype.clear = function() {
   this.data = [];
}

Queue.prototype.empty = function() {
   return this.data.length === 0;
}

Queue.prototype.add = function(song,insertIdx) {
   var endOfArray = this.data.length;
   if (insertIdx === undefined) {
      var insertIdx  = endOfArray;
   }
   this.data.insert(insertIdx, song);
   return insertIdx;
}

Queue.prototype.remove = function(idx) {
   this.data.splice(idx, 1);
}

var ViewableQueue = function(domElement) {
   Queue.call(this);
   this.domElement = domElement;
}

ViewableQueue.prototype = new Queue();

ViewableQueue.prototype.add = function(song,insertIdx) {
   var empty = this.empty();
   var i = 0;
   var j = 0;
   var json = JSON.stringify(song);
   var domElement = this.domElement;
   var jquerySelector = this.domElement.get(0).tagName + ' queueitem:eq(0)';
   if (!(song instanceof Array)) {
      var song = [song];
   }
   var length = song.length;
   for (j=0;j<length;j++) {
      if (!isSong(song[j])) {
         return false;
      }
   }
   if (insertIdx === NaN) {
      return false;
   }
   var idx = Queue.prototype.add.call(this,song,insertIdx);
   console.log(idx);
   if (empty) {
      jQuery.post('/generateQueue',JSON.stringify(song), function(data) {
         console.log(data);
         domElement.html(data);
      });
   }
   else {
      jQuery.post('/generateQueue',JSON.stringify(song), function(data) {
         jquerySelector = domElement.get(0).tagName + ' queueitem:eq('+(idx + 1)+')';
         console.log(data);
         $(jquerySelector).after(data);
      });
   }
}

ViewableQueue.prototype.clear = function() {
   Queue.prototype.clear.call(this);
   this.domElement.html('');
}

ViewableQueue.prototype.remove = function(removeIdx) {
   Queue.prototype.remove.call(this,removeIdx);
   this.jquerySelector = this.domElement.get(0).tagName + ' queueitem:eq('+(removeIdx)+')';
}

ViewableQueue.prototype.load = function(songArray, idx) {
   Queue.prototype.load.call(this, songArray, idx);
}
   

var Player = function(audioElement, playBar, playlistElement) {
   this.playlist = new ViewableQueue(playlistElement);
   this.currentIdx = 0;
   this.currentElement = playlistElement.find('queueitem:eq(0)');

   var audioElement = audioElement;

   var playBar = playBar;
   var song = playBar.find('song');
   var album = playBar.find('album');
   var band = playBar.find('band');

   var playButton = playBar.find("pop");

   playButton.on('click', function() {
      handlePlay();
   });

   this.clearPlaylist = function() {
      this.playlist.clear();
      this.updateCurrent(-1);
   }
      
   this.updateCurrent = function(idx) {
      this.currentIdx = idx;
      this.currentElement = playlistElement.find('queueitem:eq('+currentIdx+')');
   }


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



