<html>
<head>
</head>

<body>
   <div id="j" style="width:200px;height:200px"></div>
   <div id="play-button">click 2 play</div>
   <div id="changed-thing">i am not playing</div>
<audio id="player">
   <source src="/media/sound1.mp3">
   <source src="/media/sound1.ogg">
</audio>
</body>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="/js/jPlayer/jquery.jplayer.min.js"></script>
<script>
   $('#play-button').click(function() {
      var a = document.getElementsByTagName("audio")[0];
      a.play();
   })
   $('#changed-thing').click(function() {
      $('audio').trigger("play");
   })
</script>
<!--script type="text/javascript">
 $(document).ready(function(){
  $("#j").jPlayer({
   ready: function () {
    $(this).jPlayer("setMedia", {
       mp3: "/media/sound1.mp3",
       ogg: "/media/sound1.ogg"
    }, "size", {
         width: "200px",
            height: "200px"
    }).jPlayer("play");
   },
   swfPath: "/js/jPlayer",
   supplied: "mp3, ogg"
  });
 });
</script-->
</html>

   
