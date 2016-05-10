
export class DoublyLinkedList<T extends ISortable>{
    
    private Head: LinkedListNode<T> = null;
    private Tail: LinkedListNode<T> = null;
    private size: number = 0;
    
    constructor(private MaxSize:number) {
        
    }
    
    TryToAdd(e: T){
        
        //Empty List
        if(this.Head == null){
            this.Head = new LinkedListNode<T>();
            this.Head.element = e;
            this.Head.prev = null;
            this.Head.next = null;

            this.size = 1;
            
            this.Tail = this.Head;
        }//Non Empty
        else {
            //New element is better then the Head
            if(e.Metric > this.Head.element.Metric){
                let temp = this.Head;
                this.Head = new LinkedListNode<T>();
                this.Head.element = e;
                this.Head.prev = null;
                this.Head.next = temp;
                
                temp.prev = this.Head;
                
                this.size++;
                
                //Dropping the tail if list exceeded maxsize
                if(this.size > this.MaxSize){
                    this.Tail = this.Tail.prev;
                    this.Tail.next = null;
                    this.size--;
                }                 
                
            }//New element might fit in somewhere down the list.
            else{
                let cur = this.Head.next;
                
                //Edge case of only 1 element in the list.
                if(cur == null) {
                    if(this.MaxSize > 1) {
                        this.Tail = new LinkedListNode<T>();
                        this.Tail.element = e;
                        this.Tail.next = null;
                        this.Tail.prev = this.Head;
                        
                        this.Head.next = this.Tail;
                    }                   
                }
                else {
                    //Traverse forward so long as: 1. We aren't at the tail and 
                    //2. Current Metric is larger then that of the intended new element
                    while(cur.next != null && cur.element.Metric >= e.Metric) { cur = cur.next; }
                    
                    //We hit the tail
                    if(cur.next == null) {
                        //New Element is better then the tail. 
                        //(If Head was the Tail and new element is better, it would already be handled)
                        // Thus if this succeeds then we have at least 2 elments in the list.
                        if(cur.element.Metric < e.Metric) {
                            
                            let temp = new LinkedListNode<T>();
                            temp.element = e;
                            temp.prev = this.Tail.prev;
                            temp.next = this.Tail;
                            
                            this.Tail.prev.next = temp; 
                            this.Tail.prev = temp;
                            
                            this.size++;
                            
                            //Dropping the tail if list exceeded maxsize
                            if(this.size > this.MaxSize){
                                this.Tail = this.Tail.prev;
                                this.Tail.next = null;
                                this.size--;
                            }   
                            
                        }
                        else if(this.size < this.MaxSize) {
                            let temp = new LinkedListNode<T>();
                            temp.element = e;
                            temp.prev = this.Tail
                            temp.next = null;
                            
                            this.Tail.next = temp;
                            
                            this.Tail = temp;
                            
                            this.size++;
                        }
                        //No need to do anything otherwise.
                        
                    }//We aren't at the tail and have found the first node with an element with a lower Metric then the new element
                    else {
                        let temp = new LinkedListNode<T>();
                        temp.element = e;
                        temp.prev = cur.prev;
                        temp.next = cur.next;
                        
                        cur.prev.next = temp;
                        cur.next.prev = temp;
                        
                        
                        
                        //Dropping the tail if list exceeded maxsize
                        if(this.size > this.MaxSize){
                            this.Tail = this.Tail.prev;
                            this.Tail.next = null;
                            this.size--;
                        }   
                    }
                }
        
            }
        }
        
    }
    
    ToArray(): T[]{
        let array: T[] = [];
        let cur: LinkedListNode<T> = this.Head;
        while (cur != null) {
            array.push(cur.element);
            cur = cur.next;
        }
        return array;
    }
    
}

export interface ISortable{
    Metric: number;
}

class LinkedListNode<T> {
    element: T;
    next: LinkedListNode<T>;
    prev: LinkedListNode<T>;
}