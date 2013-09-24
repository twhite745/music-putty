<html>

   <head>
   
      <link rel="stylesheet" href=<?php echo $CSS; ?>style.css />
      <link rel="stylesheet" href=<?php echo $CSS; ?>bootstrap.min.css />
   
   </head>

   <body>
      <div id="play-bar"><pop>pause</pop> - <song></song> - <album></album> - <band></band></div>
      <div id="content" class="col-md-8 col-md-offset-2 col-sm-12">
         <?php echo $this->render($content,$this->mime,get_defined_vars()); ?>
      </div>
      <a href="browse">a href</a>
      <a href="//google.com">bands</a>
   
   </body>

   <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
   <script src="//balupton.github.io/jquery-scrollto/lib/jquery-scrollto.js"></script>
   <script src="//rawgithub.com/browserstate/ajaxify/master/ajaxify-html5.js"></script>
   <script src="//browserstate.github.io/history.js/scripts/bundled/html4+html5/jquery.history.js"></script>

   <script src=<?php echo $JS; ?>base.js></script>

</html>
