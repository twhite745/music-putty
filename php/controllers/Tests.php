<?php
class Tests {
   function display() {
      $f3 = F3::instance();
      $arr = ["songs"=>["songName"=>"hi", "albumName"=>"bye","bandName"=>"band"]];
      $test = new Test;
      $f3->mock('POST /generateQueue',$arr);
      echo "THIS SHOULD BE SAID";
      $f3->set('QUIET',TRUE);
      $f3->mock('GET /');
      $f3->set('QUIET',FALSE);
      $f3->mock('POST /browse');
      echo "THIS SHOULD BE SAID";

      $test->expect(true,''
      );

      foreach ($test->results() as $result) {
          echo $result['text'].'<br />';
          if ($result['status'])
              echo 'Pass';
          else
              echo 'Fail ('.$result['source'].')';
          echo '<br />';
      }
   }

   function forms() {
      F3::clear("SESSION['username']");
      Main::display('forms.html');
   }
   function storeName() {
      $postArray = (F3::get('POST'));
      var_dump($postArray);
      F3::set("SESSION['username']",$postArray["name"]);
      F3::set("SESSION['password']",$postArray["password"]);
      if ($postArray['name'] == 'steve') {
         Main::display('forms.html');
      }
      else Main::display('welcome.html');
   }
   function update() {
      Main::update('tests.html');
   }
   function temp() {
      F3::set('page','tests');
      Main::display('tests.html');
   }
   function testPHPvar() {
      $hi = 5;
      echo Template::instance()->render('/templates/testPHPvar.html','text/html');
   }
}?>


