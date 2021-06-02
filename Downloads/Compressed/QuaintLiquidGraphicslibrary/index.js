function LinkedList() {
  this.head = null;
  this.tail = null;
};
function Node(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
};

let ll = new LinkedList();
let userList = new LinkedList();
let toDoList = new LinkedList();

let node1 = new Node(100, 'node2', null)


//For adding a new node to the head of a linked list
LinkedList.prototype.addToHead = function(value) {
  let newNode = new Node(value, this.head, null);
  if (this.head) this.head.prev = newNode;
  else this.tail = newNode;
  this.head = newNode;
};

let newLL = new LinkedList();
newLL.addToHead(110);
newLL.addToHead(220);
newLL.addToHead(330);

console.log(newLL);

//For aading a new mode to the tail of a linked lis
LinkedList.prototype.addToTail = function(value) {
  let newNode = new Node(value, null, this.tail);
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
};

LinkedList.prototype.removeHead = function() {
  if (!this.head) return null;
  let val = this.head.value;
  this.head = this.head.next;
  if (this.head) this.head.prev = null;
  else this.tail = null;
  return val;
};

LinkedList.prototype.removeTail = function() {
  if (!this.tail) return null;
  let val = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) this.tail.next = null;
  else this.head = null;
  return val;
};

LinkedList.prototype.search = function(searchValue) {
  let currentNode = this.head
  while (currentNode) {
    if (currentNode.value === search.Value) return currentNode.value
    currentNode = currentNode.next;
  }
  return null;
};

LinkedList.prototype.IndexOf = function(value) {
  let indexes = [];
  let currentIndex = 0;
  let currentNode = 0;
  while (currentNode) {
    if (value === currentNode.value) {
      indexes.push(currentIndex);
    };
    currentNode = currentNode.next;
    currentIndex++;
  };
};