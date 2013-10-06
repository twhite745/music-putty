
var Node = function(data, prev, next) {
   this.data = data;
   this.next = next;
   this.prev = prev;
}

var LinkedList = function() {

   var head = new Node(null,null,null);
   head.next = head;
   head.prev = head;

   var curr = head;


   this.clear = function() {
      head = new Node(null,null,null);
      head.next = head;
      head.prev = head;
      curr = head;
   }

   this.add = function(data, node) {
      var node = new Node(data, curr, curr.next);
      curr.next = node;
      head.prev = node;
      curr = node;
   }

   this.remove = function(node) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      if (curr === node) {
         curr = node.next;
      }
   }

   this.prev = function(idx) {
      if (idx === undefined) {
         curr = curr.prev;
         return curr.prev;
      }
      else {
         var i;
         var node = curr;
         for (i=0; i < idx; i++) {
            node = node.next;
         }
         if (node === head) {
            return node.next;
         }
         return node;
      }
         
   }

   this.next = function(idx) {
      if (idx === undefined) {
         curr = curr.next;
         if (curr.next == head) {
            return curr.next.next;
         }
         return curr.next;
      }
      else {
         var i;
         var node = curr;
         for (i=0; i < idx; i++) {
            if (node === head) {
               return node.prev;
            }
            node = node.next;
         }
         return node;
      }
   }

   this.curr = function() {
      return curr;
   }

}
