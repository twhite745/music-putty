var bar = $('#play-bar');
var badges = new Object();
var json = 'hi';
var State = History.getState();
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
      jQuery.each($('p'), function(i) {
         this.json = json[i];
         badges[i] = this;
      });
   };
});

$('a').click(function(e) {
   e.preventDefault();
   History.pushState('','',$(this).attr('href'));
});

$('p').click(function(e) {
   bar.find('song').html(this.json.sName);
   bar.find('album').html(this.json.aName);
   bar.find('band').html(this.json.bName);
   
});

   
