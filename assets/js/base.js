//requires jquery, underscore.js
var audio = $('audio');
var bar = $('#play-bar');
var playButton = bar.find('pop');
var badges = [];
var json = 'hi';
var State = History.getState();


var badge = function(json,queue) {
   this.json = json;
   this.queue = queue;
}


//making arrays iterable, insertable, for queue suitability
Array.prototype.insert = function(index) {
    index = Math.min(index, this.length);
    arguments.length > 1
        && this.splice.apply(this, [index, 0].concat([].pop.call(arguments)))
        && this.insert.apply(this, arguments);
    return index;
};
        
Array.prototype.next = function() {
    return this[++this.current];
 }
  
Array.prototype.prev = function() {
   return this[--this.current];
}
   
Array.prototype.flatten = function() {
   arr = _.flatten(this);
}
 
Array.prototype.current = 0;

Array.prototype.clear = function() {
   this.splice(0,this.length);
}

Array.prototype.empty = function() {
   return !this.length;
}

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

//class QUEUE
var Queue = function() {
   this.data = new Array();
}

Queue.prototype.clear = function() {
   this.data.clear();
}

Queue.prototype.empty = function() {
   return this.data.empty();
}

Queue.prototype.add = function(insertIdx) {
   return Array.prototype.insert.apply(this.data,arguments);
}

Queue.prototype.remove = function(idx) {
   this.data.splice(idx, 1);
}

var ViewableQueue = function(domElement) {
   Queue.call(this);
   this.domElement = domElement;
}


ViewableQueue.prototype = new Queue();

ViewableQueue.prototype.clear = function() {
   var domElement = this.domElement;
   Queue.prototype.clear.call(this);
   domElement.html('');
}

ViewableQueue.prototype.add = function(insertIdx) {
   var l = this.data.length;
   var args = _.flatten(arguments);
   var domElement = this.domElement;
   var empty = this.empty();
   var idx = Queue.prototype.add.apply(this,args);
   args.splice(0,1);
   _.flatten(args,true);
   var json = JSON.stringify(args);
   if (empty) {
      idx = 0;
      domElement.html(queueItemHTML(args[idx].songName,
                                    args[idx].albumName,
                                    args[idx].bandName,
                                    args[idx].artPath));
      idx++;
      //removing the added thing
      args.splice(0,1);

   }
   if (idx >= l) {
      args.forEach(function(val,i,a) {
         console.log(i);
         domElement.find('queueItem').eq(idx + i - 1)
                   .after(queueItemHTML(args[i].songName,
                                        args[i].albumName,
                                        args[i].bandName,
                                        args[i].artPath));
         idx++;
      });
   }
   else {
      args.forEach(function(val,i,a) {
         console.log(val);
         domElement.find('queueItem').eq(idx)
                   .before(queueItemHTML(args[i].songName,
                                        args[i].albumName,
                                        args[i].bandName,
                                        args[i].artPath));
         idx++;
      });
   }
}

var queueItemHTML = function(songName, albumName, bandName, artPath) {
   var HTMLString = "<queueItem>" +
                        "<song>"+ songName + "</song>" +
                        "<album>" + albumName + "</album>" +
                        "<band>" +   bandName + "</band>" +
                        "<img src='" + artPath + " />" +
                     "</queueItem>";
   return HTMLString;
}



ViewableQueue.prototype.remove = function(removeIdx) {
   Queue.prototype.remove.call(this,removeIdx);
   this.domElement.find('queueItem').eq(removeIdx).remove();
}

ViewableQueue.prototype.removeLast = function() {
   ViewableQueue.prototype.remove
                .call(this, this.data.length - 1);
}

ViewableQueue.prototype.addLast = function(songs) {
   ViewableQueue.prototype.add
                .call(this, this.data.length, arguments);
}

var Player = function(audioElement, playBar, playlistElement) {
   this.playlist = new ViewableQueue(playlistElement);
   this.currentIdx = 0;
   this.currentElement = playlistElement.find('queueitem').eq(0);

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

   this.addNext = function() {
      [].splice.call(arguments,0,0,this.currentIdx + 1);
      console.log(arguments);
      ViewableQueue.prototype.add.apply(this.playlist, arguments);
   }

   this.removeCurrent = function() {
      ViewableQueue.prototype.remove.call(this.playlist,currendIdx);
   }

   this.play = function() {
      this.changeSource('source="' + this.playlist.data[this.currentIdx].audioPath + '"');
      this.handlePlay();
   }
      




   this.handlePlay = function() {
      if (audioElement[0].paused) {
         audioElement.trigger('play');
      }
      else {
         audioElement.trigger('pause');
      }
   }

   this.setTitle = function() {
      var song = this.playlist.data[this.currentIdx];
      playBar.find('song').html(song.songName);
      playBar.find('album').html(song.albumName);
      playBar.find('band').html(song.bandName);
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



