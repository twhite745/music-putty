<?php
class Main {
   static function display($str) {
      echo View::instance()->render(F3::get('TEMPLATES').$str, 'text/html');
   }
}
?>
