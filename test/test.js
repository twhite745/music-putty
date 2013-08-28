$('document').ready(function(){
	jQuery.getJSON('request.json', function(data) {
	});
});

$('#changed-thing').click(function() {
  $('audio').trigger("play");
  $('#play-button').html("hihihhhihi you are playing music lol lol lol")
});


var playSong = function(song,artist,band) {
	$('#play-bar').html(song + " " + artist + " " + band);
};