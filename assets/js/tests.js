console.log("\nARRAY TESTS::::::::::");

var arr = [1,2,3,4,5];
arr.insert(0,0);
console.log("Can insert values into arrays at any position: " +
   (_.isEqual(arr,[0,1,2,3,4,5])));

arr.insert(100,[0,1,2,3]);
console.log("Can insert arrays into arrays at any position: " +
   (_.isEqual(arr,[0,1,2,3,4,5,0,1,2,3])));

arr = [0,1,[2,3,4],5,[6,7],8];
arr.flatten();
console.log("Can flatten arrays: " + 
(_.isEqual(arr,[0,1,2,3,4,5,6,7,8])));

console.log("Can tell if queue is NOT EMPTY: " + !arr.empty());
arr.clear();
console.log("Can tell if queue is EMPTY: " + arr.empty());


//////////////////////////////////////////////////////
console.log("\nQUEUE TESTS::::::::::");
   
var basicQueue = new Queue();
basicQueue.add(0,1);
console.log("Can insert values into queue: " + (_.isEqual(basicQueue.data,[1])));
basicQueue.add(100000,[2,3,4,5,6]);
console.log("Can insert arrays into queue: " + (_.isEqual(basicQueue.data,[1,2,3,4,5,6])));
console.log(
   "Can tell if list is not empty: " +
   !basicQueue.empty()
);
basicQueue.clear();
console.log(
   "Can clear queue: " +
   (basicQueue.data == 0)
);
console.log(
   "can tell if queue is empty: " +
   basicQueue.empty()
);

console.log("\nVIEWABLE QUEUE TESTS::::::::::");

var q = new ViewableQueue($('queue1'));
var s1 = new Song("BAND","album","SONG","audioPath","ARTpATH");
var s2 = new Song("BAND2","album2","SONG2","audioPath2","ARTpATH2");
var s3 = new Song("BAND3","album3","SONG3","audioPath3","ARTpATH3");

var basicQueue = new ViewableQueue();
basicQueue.add(0,s1);
console.log("Can insert values into viewable queue: " + (_.isEqual(basicQueue.data,[1])));
basicQueue.add(100000,[2,3,4,5,6]);
console.log("Can insert arrays into viewable queue: " + (basicQueue.data !== [1,2,3,4,5,6]));
console.log(
   "Can tell if list is not empty: " +
   !basicQueue.empty()
);
basicQueue.clear();
console.log(
   "Can clear queue: " +
   (basicQueue.data == 0)
);
console.log(
   "can tell if queue is empty: " +
   basicQueue.empty()
);

var q2 = new ViewableQueue($('queue2'));
q2.add([s1]);

