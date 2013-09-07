var player = $('audio');
var current = null;

play = function () {
  player.trigger('play');
  playBar.setPlaying();
  current.setPlaying();
}
pause = function () {
  player.trigger('pause');
  playBar.setPaused();
  current.setPaused();
}

function bandTileInit(domElements) {
  domElements.each(function(index,val) {
    window['tile' + index] = new BandTile($(val));
  });
}

var playBar = $('#play-bar');
  playBar.song = playBar.find('song');
  playBar.album = playBar.find('album');
  playBar.band = playBar.find('band');
  playBar.pop = playBar.find('pop');

  playBar.setPlaying = function() {
    playBar.pop.html('playing');
  }

  playBar.setPaused = function() {
    playBar.pop.html('paused');
  }
  
  playBar.updateTitle = function() {
    playBar.band.html(current.name);
  }

//Class BandTile
function BandTile(domElement) {
  var self = this;
  this.domElement = domElement;
  this.isPlaying = false;
  this.bID = this.domElement.attr('data-bid');
  this.aID = this.domElement.attr('data-aid');
  this.name = this.domElement.find('h1').html();
  this.pic = this.domElement.find('img').attr('src');
  this.audioSourcePath = '/media/'+this.bID+'/sample.mp3';
  this.playButton = this.domElement.find('play-button');
  this.playButton.click(function() {self.play();});

  this.play = function() {
    if (this.isCurrent()) {
      if (this.isPlaying) {
        pause();
      }
      else {
        play();
      }
    }
    else {
      this.setAudioSource();
      play();
    }    
  }

  this.setAudioSource = function() {
    player.html('<source src='+this.audioSourcePath+'.mp3>'+
                '<source src='+this.audioSourcePath+'.ogg>');
    this.setCurrent();
    playBar.updateTitle();
  }

  this.setCurrent = function() {
    if (current !== null){current.setPaused();}
    current = this;
  }
  
  this.isCurrent = function() {
    return (current == this);
  }
 
  this.setPlaying = function() { 
    this.isPlaying = true;
    this.playButton.html('playing');
  }

  this.setPaused = function() { 
    this.isPlaying = false;
    this.playButton.html('paused');
  }

}
  
bandTileInit($('.bandTile'));  


