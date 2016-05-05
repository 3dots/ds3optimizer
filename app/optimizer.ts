/// <reference path="../node_modules/typescript/lib/lib.webworker.d.ts"/>

import {ArmorCombination, Armory, ArmorPiece, OptimizationParameters, ArmorCombinationFactory, ArmorMethods} from './armory';
import {DoublyLinkedList} from './doublylinkedlist'

export class OptimizationWorker {
    Armory: Armory;
    
    MaxWeight: number;
    MaxListLength: number;
    
    Minimums: OptimizationParameters;
    ACF: ArmorCombinationFactory;
    
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



export class WorkerStartMessage {
    
    AvailableWeight: number;
    ResultListLength: number;
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters;
    
    Armory: Armory;
}

export class WorkerResultMessage {
    
    MessageType: string;
    
    Progress: number;
    
    Results: ArmorCombination[];
}