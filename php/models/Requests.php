<?php
class Requests {

  static function queryBands() {
    $db = F3::get('db');
    F3::set('result', $db->exec('SELECT * FROM band LEFT JOIN song ON band.sampleID=song.sID 
                                                    LEFT JOIN album ON album.aID=song.aID
                                                    LIMIT 10 OFFSET 0'));
  }

  static function JSONBands() {
    Requests::queryBands();
    echo json_encode(F3::get('result'));
  }
    

  static function queryAlbums() {
    $db = F3::get('db');
    F3::set('result', $db->exec("SELECT album.aID,album.aName,album.bID,band.bName FROM album
                                 LEFT JOIN band ON band.bID = album.bID"));
  }

  static function generateQueue() {
     Requests::postifyJSON();
     $templateDirectory = F3::get('TEMPLATES');
     echo Template::instance()->render($templateDirectory.'queueItem.html','text/html');
  }

  static function postifyJSON() {
     $arr = json_decode(F3::get('BODY'), true);
     F3::set('POST',$arr);

  }
   

}
?>
