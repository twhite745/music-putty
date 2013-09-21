$(document).ready(function() {
   History.Adapter.bind(window,'statechange',function() {
      var State = History.getState();
      $('content').load(State.url);
   });
});

$('a').click(function(e) {
   e.preventDefault();
   History.pushState('','',$(this).attr('href'));
});
   
