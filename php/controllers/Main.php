<?php
class Main {
   static function display($str) {
      $templateDir = F3::get('TEMPLATES');
      //set content var to template page
      F3::set('content', F3::get('TEMPLATES').$str);
      //render main template (has call to F3's content as source)
      echo Template::instance()->render($templateDir.'main.html', 'text/html');
   }
   static function update($str) {
      echo Template::instance()->render($templateDir.$str, 'text/html');
   }
}
?>
