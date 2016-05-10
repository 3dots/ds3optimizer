"use strict";
var DoublyLinkedList = (function () {
    function DoublyLinkedList(MaxSize) {
        this.MaxSize = MaxSize;
        this.Head = null;
        this.Tail = null;
        this.size = 0;
    }
    DoublyLinkedList.prototype.TryToAdd = function (e) {
        //Empty List
        if (this.Head == null) {
            this.Head = new LinkedListNode();
            this.Head.element = e;
            this.Head.prev = null;
            this.Head.next = null;
            this.size = 1;
            this.Tail = this.Head;
        } //Non Empty
        else {
            //New element is better then the Head
            if (e.Metric > this.Head.element.Metric) {
                var temp = this.Head;
                this.Head = new LinkedListNode();
                this.Head.element = e;
                this.Head.prev = null;
                this.Head.next = temp;
                temp.prev = this.Head;
                this.size++;
                //Dropping the tail if list exceeded maxsize
                if (this.size > this.MaxSize) {
                    this.Tail = this.Tail.prev;
                    this.Tail.next = null;
                    this.size--;
                }
            } //New element might fit in somewhere down the list.
            else {
                var cur = this.Head.next;
                //Edge case of only 1 element in the list.
                if (cur == null) {
                    if (this.MaxSize > 1) {
                        this.Tail = new LinkedListNode();
                        this.Tail.element = e;
                        this.Tail.next = null;
                        this.Tail.prev = this.Head;
                        this.Head.next = this.Tail;
                    }
                }
                else {
                    //Traverse forward so long as: 1. We aren't at the tail and 
                    //2. Current Metric is larger then that of the intended new element
                    while (cur.next != null && cur.element.Metric >= e.Metric) {
                        cur = cur.next;
                    }
                    //We hit the tail
                    if (cur.next == null) {
                        //New Element is better then the tail. 
                        //(If Head was the Tail and new element is better, it would already be handled)
                        // Thus if this succeeds then we have at least 2 elments in the list.
                        if (cur.element.Metric < e.Metric) {
                            var temp = new LinkedListNode();
                            temp.element = e;
                            temp.prev = this.Tail.prev;
                            temp.next = this.Tail;
                            this.Tail.prev.next = temp;
                            this.Tail.prev = temp;
                            this.size++;
                            //Dropping the tail if list exceeded maxsize
                            if (this.size > this.MaxSize) {
                                this.Tail = this.Tail.prev;
                                this.Tail.next = null;
                                this.size--;
                            }
                        }
                        else if (this.size < this.MaxSize) {
                            var temp = new LinkedListNode();
                            temp.element = e;
                            temp.prev = this.Tail;
                            temp.next = null;
                            this.Tail.next = temp;
                            this.Tail = temp;
                            this.size++;
                        }
                    } //We aren't at the tail and have found the first node with an element with a lower Metric then the new element
                    else {
                        var temp = new LinkedListNode();
                        temp.element = e;
                        temp.prev = cur.prev;
                        temp.next = cur.next;
                        cur.prev.next = temp;
                        cur.next.prev = temp;
                        //Dropping the tail if list exceeded maxsize
                        if (this.size > this.MaxSize) {
                            this.Tail = this.Tail.prev;
                            this.Tail.next = null;
                            this.size--;
                        }
                    }
                }
            }
        }
    };
    DoublyLinkedList.prototype.ToArray = function () {
        var array = [];
        var cur = this.Head;
        while (cur != null) {
            array.push(cur.element);
            cur = cur.next;
        }
        return array;
    };
    return DoublyLinkedList;
}());
exports.DoublyLinkedList = DoublyLinkedList;
var LinkedListNode = (function () {
    function LinkedListNode() {
    }
    return LinkedListNode;
}());
//# sourceMappingURL=doublylinkedlist.js.map