$(document).ready(function() {
   var State = History.getState();
      jQuery.post(State.url, function() {
         console.log(State.url);
   });
   History.Adapter.bind(window,'statechange',function() {
      State = History.getState();
      $('#content').load(State.url);
      jQuery.post(State.url, function() {
         console.log(State.url);
   });
   });
});

$('a').click(function(e) {
   e.preventDefault();
   History.pushState('','',$(this).attr('href'));
});
   
