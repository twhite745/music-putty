var q = new ViewableQueue($('queue1'));
var s1 = new Song("BAND","album","SONG","audioPath","ARTpATH");
var s2 = new Song("BAND2","album2","SONG2","audioPath2","ARTpATH2");
var s3 = new Song("BAND3","album3","SONG3","audioPath3","ARTpATH3");
q.add([s1,s2,s3]);
var q2 = new ViewableQueue($('queue2'));
q2.add([s1]);

