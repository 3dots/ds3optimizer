import {ArmorCombination, Armory, ArmorPiece, OptimizationParameters, ArmorCombinationFactory, ArmorMethods} from './armory';
import {IOptimizerNecessaryData} from './optimizer.component';
import {DoublyLinkedList} from './doublylinkedlist'

export class OptimizationEngine {
    Armory: Armory;
    
    MaxWeight: number;
    MaxListLength: number;
    
    Minimums: OptimizationParameters;
    ACF: ArmorCombinationFactory;
    
    
    //List: LinkedList<ArmorCombination>;
    
    constructor(private _ViewModel: IOptimizerNecessaryData){
        this.MaxWeight = _ViewModel.AvailableWeight;
        this.MaxListLength = _ViewModel.ResultListLength;
        
        this.Armory = _ViewModel.Armory;
        
        this.Minimums = _ViewModel.Minimums;
        this.ACF = new ArmorCombinationFactory(_ViewModel.Weights);

    }
    

    
    ComputeOptimals(): ArmorCombination[] {
        
        let AM: ArmorMethods = new ArmorMethods(this.Armory);

        this._ViewModel.UpdateProgress(0);
                
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
            this._ViewModel.UpdateProgress(Progress); 
        }
        
        this._ViewModel.UpdateProgress(100);
        
        return List.ToArray();
    }
    
}


