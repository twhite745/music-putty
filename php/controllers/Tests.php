<?php
class Tests {
   function display() {
      F3::set('page','tests');
      Main::display('tests.html');
   }
   function update() {
      Main::update('tests.html');
   }
}?>


