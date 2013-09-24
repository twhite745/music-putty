<?php
class Main {
   static function display($str) {
      F3::set('content', F3::get('TEMPLATES').$str);
      echo Template::instance()->render(F3::get('TEMPLATES').'main.html', 'text/html');
   }
   static function update($str) {
      echo Template::instance()->render(F3::get('TEMPLATES').$str, 'text/html');
   }
}
?>
