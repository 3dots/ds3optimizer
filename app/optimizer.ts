/// <reference path="../node_modules/typescript/lib/lib.webworker.d.ts"/>

//importScripts("../node_modules/es6-shim/es6-shim.min.js");
//importScripts("../node_modules/zone.js/dist/zone.js");
//importScripts("../node_modules/reflect-metadata/Reflect.js");
//importScripts("../node_modules/systemjs/dist/system.src.js");

//importScripts("./fakedom.js");
//importScripts("../node_modules/jquery/dist/jquery.min.js");

//importScripts("../node_modules/bootstrap/dist/js/bootstrap.min.js");

//importScripts('../systemjs.config.js');


//import {ArmorCombination, Armory, ArmorPiece, OptimizationParameters, ArmorCombinationFactory, ArmorMethods} from './armory';
//import {DoublyLinkedList} from './doublylinkedlist';


class OptimizationWorker {
    Armory: Armory;
    
    MaxWeight: number;
    MaxListLength: number;
        
    Minimums: OptimizationParameters;
    ACF: ArmorCombinationFactory;
    
    constructor() { 

    }
    
    onmessage(data: WorkerStartMessage){
        this.MaxWeight = data.AvailableWeight;
        this.MaxListLength = data.ResultListLength;
        
        this.Armory = data.Armory;
        
        this.Minimums = data.Minimums;
        this.ACF = new ArmorCombinationFactory(data.Weights);
        
        this.ComputeOptimals();
    }
    
    ComputeOptimals() {
        
        let AM: ArmorMethods = new ArmorMethods(this.Armory);
        
        let status: WorkerResultMessage = { MessageType:"Working", Progress:0, Results:null };
        postMessage(status);
                
        let HeadIterationCount: number = AM.CountArmorInArray(this.Armory.Head);
       
        let ProgressIncrement: number = 100 * 1 / HeadIterationCount;
        
        let Progress: number = 0;
        
        //traverse whole list, if satisfies conditions try to add to optimal Linked List
        let List = new DoublyLinkedList<ArmorCombination>(this.MaxListLength);

        for(var ih = 0; ih < this.Armory.Head.length; ih++) {
            
            if(this.Armory.Head[ih].Enabled == false)
                continue;
            
            for(var ic = 0; ic < this.Armory.Chest.length; ic++) {
                
                if(this.Armory.Chest[ic].Enabled == false)
                    continue;
                
                for(var ia = 0; ia < this.Armory.Arms.length; ia++) {
                    
                    if(this.Armory.Arms[ia].Enabled == false)
                        continue;
                    
                    for(var il = 0; il < this.Armory.Legs.length; il++) {
                        
                        if(this.Armory.Legs[il].Enabled == false)
                            continue;
                        
                        if(this.Armory.Head[ih].Weight + this.Armory.Chest[ic].Weight +  this.Armory.Arms[ia].Weight + this.Armory.Legs[il].Weight > this.MaxWeight)
                            continue;
                        
                        let combo: ArmorCombination = this.ACF.Combine(this.Armory.Head[ih], this.Armory.Chest[ic], this.Armory.Arms[ia], this.Armory.Legs[il]);
                        
                        if(
                            combo.Physical >= this.Minimums.Physical &&
                            combo.Strike >= this.Minimums.Strike &&
                            combo.Slash >= this.Minimums.Slash &&
                            combo.Thrust >= this.Minimums.Thrust &&
                            
                            combo.Magic >= this.Minimums.Magic &&
                            combo.Fire >= this.Minimums.Fire &&
                            combo.Lightning >= this.Minimums.Lightning &&
                            combo.Dark >= this.Minimums.Dark &&
                            
                            combo.Bleed >= this.Minimums.Bleed &&
                            combo.Poison >= this.Minimums.Poison &&
                            combo.Frost >= this.Minimums.Frost &&
                            combo.Curse >= this.Minimums.Curse &&
                            
                            combo.Poise >= this.Minimums.Poise){
                                
                                List.TryToAdd(combo);
                            
                        }
                        
                    }
                                    
                }
                
            }
            
            Progress += ProgressIncrement;
            status = { MessageType:"Working", Progress:Progress, Results:null };
            postMessage(status);
        }
        
        status = { MessageType:"Done", Progress:100, Results:List.ToArray() };
        postMessage(status);
       
    }
    
}



class WorkerStartMessage {
    
    AvailableWeight: number;
    ResultListLength: number;
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters;
    
    Armory: Armory;
}

class WorkerResultMessage {
    
    MessageType: string;
    
    Progress: number;
    
    Results: ArmorCombination[];
}


//sadness ahaed


class Armory {
    Head: ArmorPiece[];
    Chest: ArmorPiece[];
    Arms: ArmorPiece[];
    Legs: ArmorPiece[];
    
    StartingCharacter: GameProgressArmorGroup[];
    GameProgressConditions: GameProgressArmorGroup[];
    
}

class ArmorMethods {
    constructor(public Armory: Armory) {}
    
    CountArmorInArray(arr: ArmorPiece[]): number{
        let result = 0;      
        for(var i = 0; i < arr.length; i++){
            if(arr[i].Enabled)
                result++;
        }       
        return result;
    }
}

class ArmorPiece {
    PieceId: number;
    SetId: number;

    Enabled: boolean;

    Name: string;
    Weight: number;

    Physical: number;
    Strike: number;
    Slash: number;
    Thrust: number;

    Magic: number;
    Fire: number;
    Lightning: number;
    Dark: number;

    Bleed: number;
    Poison: number;
    Frost: number;
    Curse: number;

    Poise: number;    
}

class ArmorCombination implements ISortable {
    
    Metric: number;
    
    constructor(public Head: ArmorPiece, public Chest: ArmorPiece, public Arms: ArmorPiece, public Legs: ArmorPiece) {
        this.Weight = Head.Weight + Chest.Weight + Arms.Weight + Legs.Weight;
        
        this.Physical = 1 - (1 - Head.Physical / 100) * (1 - Chest.Physical / 100) * (1 - Arms.Physical / 100) * (1 - Legs.Physical / 100);
        this.Strike = 1 - (1 - Head.Strike / 100) * (1 - Chest.Strike / 100) * (1 - Arms.Strike / 100) * (1 - Legs.Strike / 100);
        this.Slash = 1 - (1 - Head.Slash / 100) * (1 - Chest.Slash / 100) * (1 - Arms.Slash / 100) * (1 - Legs.Slash / 100);
        this.Thrust = 1 - (1 - Head.Thrust / 100) * (1 - Chest.Thrust / 100) * (1 - Arms.Thrust / 100) * (1 - Legs.Thrust / 100);
        
        this.Magic = 1 - (1 - Head.Magic / 100) * (1 - Chest.Magic / 100) * (1 - Arms.Magic / 100) * (1 - Legs.Magic / 100);
        this.Fire = 1 - (1 - Head.Fire / 100) * (1 - Chest.Fire / 100) * (1 - Arms.Fire / 100) * (1 - Legs.Fire / 100);
        this.Lightning = 1 - (1 - Head.Lightning / 100) * (1 - Chest.Lightning / 100) * (1 - Arms.Lightning / 100) * (1 - Legs.Lightning / 100);
        this.Dark = 1 - (1 - Head.Dark / 100) * (1 - Chest.Dark / 100) * (1 - Arms.Dark / 100) * (1 - Legs.Dark / 100);
        
        this.Bleed = Head.Bleed + Chest.Bleed + Arms.Bleed + Legs.Bleed;
        this.Poison = Head.Poison + Chest.Poison + Arms.Poison + Legs.Poison;
        this.Frost = Head.Frost + Chest.Frost + Arms.Frost + Legs.Frost;
        this.Curse = Head.Curse + Chest.Curse + Arms.Curse + Legs.Curse;
        this.Poise = Head.Poise + Chest.Poise + Arms.Poise + Legs.Poise;
    }

    Weight: number;

    Physical: number;
    Strike: number;
    Slash: number;
    Thrust: number;

    Magic: number;
    Fire: number;
    Lightning: number;
    Dark: number;

    Bleed: number;
    Poison: number;
    Frost: number;
    Curse: number;

    Poise: number; 
}

class ArmorCombinationFactory{
    
    constructor(public MetricWeights: OptimizationParameters){        
    }
    
    Combine(Head: ArmorPiece, Chest: ArmorPiece, Arms: ArmorPiece, Legs: ArmorPiece) : ArmorCombination {
        let result: ArmorCombination = new ArmorCombination(Head, Chest, Arms, Legs);
        
        result.Metric = 
        this.MetricWeights.Physical * result.Physical +
        this.MetricWeights.Strike * result.Strike +
        this.MetricWeights.Slash * result.Slash +
        this.MetricWeights.Thrust * result.Thrust +
        
        this.MetricWeights.Magic * result.Magic +
        this.MetricWeights.Fire * result.Fire +
        this.MetricWeights.Lightning * result.Lightning +
        this.MetricWeights.Dark * result.Dark +
        
        this.MetricWeights.Bleed * result.Bleed +
        this.MetricWeights.Poison * result.Poison +
        this.MetricWeights.Frost * result.Frost +
        this.MetricWeights.Curse * result.Curse +
        
        this.MetricWeights.Poise * result.Poise;
        
        return result;       
    }
    
}

class OptimizationParameters {
    
    Physical: number = 0;
    Strike: number = 0;
    Slash: number = 0;
    Thrust: number = 0;

    Magic: number = 0;
    Fire: number = 0;
    Lightning: number = 0;
    Dark: number = 0;

    Bleed: number = 0;
    Poison: number = 0;
    Frost: number = 0;
    Curse: number = 0;

    Poise: number = 0; 
}


class GameProgressArmorGroup {
    Enabled: boolean;
    
    ProgressCondition: string;
    
    ArmorSetIds: number[];
    ArmorPiecesIds: number[];
}


class DoublyLinkedList<T extends ISortable>{
    
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

interface ISortable{
    Metric: number;
}

class LinkedListNode<T> {
    element: T;
    next: LinkedListNode<T>;
    prev: LinkedListNode<T>;
}