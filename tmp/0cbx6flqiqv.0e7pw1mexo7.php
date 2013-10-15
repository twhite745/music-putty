<html>

   <head>
      <link rel="stylesheet" href=<?php echo $CSS; ?>bootstrap.min.css />
      <link rel="stylesheet" href=<?php echo $CSS; ?>style.css />
      <link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css'>
   </head>

   <body>
      <audio></audio>
      <div id="play-bar"><pop>pause</pop> - <song></song> - <album></album> - <band></band></div>
      <div class="row">
         <div id="content" class="col-md-8 col-md-offset-2 col-sm-12">
               <?php echo $this->render($content,$this->mime,get_defined_vars()); ?>
         </div>
      </div>
      <div class="row">
         <div class="col-md-8 col-md-offset-2 col-sm-12 centered">
               <a href="browse">a href</a>
               <a href="//google.com">bands</a>
         </div>
      </div>
   </body>

   <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
   <script src="//balupton.github.io/jquery-scrollto/lib/jquery-scrollto.js"></script>
   <script src="//rawgithub.com/browserstate/ajaxify/master/ajaxify-html5.js"></script>
   <script src="//browserstate.github.io/history.js/scripts/bundled/html4+html5/jquery.history.js"></script>
   <!--script src="assets/js/wookmark.min.js"></script>
   <script>$('.bandBadge').wookmark({
      align:"center",
      autoResize:true,
      container:$('content'),
      offset:10
   });
   </script-->

   <script src=<?php echo $JS; ?>base.js></script>
   <script src=<?php echo $JS; ?><?php echo $page; ?>.js></script>

</html>
