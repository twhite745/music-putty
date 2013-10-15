<?php

class Browse {
   function display() {
      Requests::queryBands();
      Main::display('browse.html');
   }
   function update() {
      Requests::queryBands();
      Main::update('browse.html');
   }
}

