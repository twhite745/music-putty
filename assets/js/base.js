//requires jquery, underscore.js
var audio = $('audio');
var badges = [];
var json = 'hi';
var State = History.getState();



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

   $('queueitem').on('click',function() {
      console.log('hi');
   });
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

var player = $('#play-bar');
player.playlistElement = player.find('playlist');
player.playlist = new ViewableQueue(player.playlistElement);
var currentIdx = 0;
player.currentElement = player.playlistElement.find('queueitem:eq(0)');
var audioElement = $(document).find('audio');
var playButton = player.find('pop');
var song = player.find('song');
var album = player.find('album');
var band = player.find('band');
playButton.on('click', function() {
   player.handlePlay();
});
player.clearPlaylist = function() {
   this.playlist.clear();
   currentIdx = 0;
   player.currentElement = null;
   player.changeSource("");
}
player.updateCurrent = function(idx) {
   currentIdx = idx;
   player.currentElement = player.playlistElement.find('queueitem').eq(currentIdx);
   player.changeSource("<source src='" + player.playlist.data[currentIdx].audioPath + "'/>");
}

player.addSongNext = function() {
   [].splice.call(arguments,0,0,currentIdx + 1);
   ViewableQueue.prototype.add.apply(this.playlist, arguments);
}

player.addSong = function() {
   ViewableQueue.prototype.add.apply(this.playlist, arguments);
}

player.addSongToEnd = function() {
   [].splice.call(arguments,0,0,player.playlist.data.length);
   ViewableQueue.prototype.add.apply(this.playlist, arguments);
}

player.go = function(offset) {
   if (currentIdx == player.playlist.data.length - 1 && offset > 0) {
      player.setStopped();
   }
   else if (currentIdx == 0 && offset < 0) {
      audioElement[0].currentTime = 0;
   }
   else {
      player.updateCurrent(currentIdx + offset);
      player.setPlaying();
   }
}
   
   

player.removeCurrent = function() {
   ViewableQueue.prototype.remove.call(this.playlist,currentIdx);
}

player.handlePlay = function() {
   if (audioElement[0].paused) {
      this.setPlaying();
   }
   else {
      this.setPaused();
   }
}


player.setTitle = function() {
   var song = this.playlist.data[this.currentIdx];
   playBar.find('song').html(song.songName);
   playBar.find('album').html(song.albumName);
   playBar.find('band').html(song.bandName);
   }

player.setPlaying = function() {
   playButton.html('Playing');
   $(audioElement[0]).trigger('play');
   audioElement.trigger('play');
}
player.setPaused = function() {
   playButton.html('Paused');
   $(audioElement[0]).trigger('pause');
}
player.setStopped = function() {
   $(audioElement[0]).trigger('pause');
   audioElement[0].currentTime = 0;
   player.updateCurrent(0);
   playButton.html('Stopped');
}


player.changeSource = function(source) {
   audioElement.html(source);
}

var Badges = function(Player, domElements) {
   
   var Player = Player;
   var domElements = domElements;
   
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
   $('.bandBadge').on("click", function() {
      var bID = this.json["bID"];
      console.log(bID);
      player.clearPlaylist();
      player.addSongNext(this.queue);
      player.updateCurrent(0);
      player.go(0);
      console.log(audioElement[0]);
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
         this.queue = [new Song(this.json["bName"],
                                this.json["aName"],
                                this.json["sName"],
                                this.json["sPath"],
                                this.json["bPic"])];
         badges[i] = this;

      });
   };
});

$('a').click(function(e) {
   e.preventDefault();
   History.pushState('','',$(this).attr('href'));
});



