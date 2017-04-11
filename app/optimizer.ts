import {ArmorCombination, Armory, ArmorPiece, OptimizationParameters, ArmorCombinationFactory} from './armory';
import {DoublyLinkedList} from './doublylinkedlist';


export class OptimizationEngine {
    Armory: IOptimizertContext;

    ACF: ArmorCombinationFactory;

    List: DoublyLinkedList<ArmorCombination>;
    
    Progress: number;
    ProgressIncrement: number
    
    constructor(private _ViewModel: IOptimizerComponentVM, Armory: IOptimizertContext){      
        this.Armory = Armory;
        
        this.ACF = new ArmorCombinationFactory(this.Armory.Weights, this.Armory.InnatePoise);
        
        this.List = new DoublyLinkedList<ArmorCombination>(this.Armory.ResultListLength);
    }
    
    ComputeOptimals(){
        this.Progress = 0;
        this._ViewModel.UpdateProgress(this.Progress);
        
        let HeadIterationCount: number = this.Armory.CountHeadArmor();
        this.ProgressIncrement = 100 * 1 / HeadIterationCount; 
     
        //Warning: Hacks ensue. Turn back.
        this.ComputeOptimalsIncremental(0, this);
    
    }
    
    ReturnResults(Context: OptimizationEngine) {
        Context.Progress = 100;
        this._ViewModel.UpdateProgress(this.Progress);
        
        Context._ViewModel.RecieveResults(Context.List.ToArray());
    }
    
    ComputeOptimalsIncremental(curHeadIndex: number, Context: OptimizationEngine) {

        for(var ih = curHeadIndex; ih < Context.Armory.Head.length; ih++) {         
            if(Context.Armory.Head[ih].Enabled == false)
                continue;
            if(Context.Armory.Head[ih].Weight > Context.Armory.AvailableWeight)
                continue;
            
            for(var ic = 0; ic < Context.Armory.Chest.length; ic++) {
                if(Context.Armory.Chest[ic].Enabled == false)
                    continue;
                if(Context.Armory.Head[ih].Weight + Context.Armory.Chest[ic].Weight > Context.Armory.AvailableWeight)
                    continue;
                
                for(var ia = 0; ia < Context.Armory.Arms.length; ia++) {
                    if(Context.Armory.Arms[ia].Enabled == false)
                        continue;
                    if(Context.Armory.Head[ih].Weight + Context.Armory.Chest[ic].Weight +  Context.Armory.Arms[ia].Weight > Context.Armory.AvailableWeight)
                        continue;
                    
                    for(var il = 0; il < Context.Armory.Legs.length; il++) {
                        
                        if(Context.Armory.Legs[il].Enabled == false)
                            continue;
                        
                        if(Context.Armory.Head[ih].Weight + Context.Armory.Chest[ic].Weight +  Context.Armory.Arms[ia].Weight + Context.Armory.Legs[il].Weight > Context.Armory.AvailableWeight)
                            continue;
                        
                        let combo: ArmorCombination = Context.ACF.Combine(Context.Armory.Head[ih], Context.Armory.Chest[ic], Context.Armory.Arms[ia], Context.Armory.Legs[il]);
                        
                        if(
                            combo.PhysicalAverage >= Context.Armory.Minimums.PhysicalAverage &&
                            
                            combo.Physical >= Context.Armory.Minimums.Physical &&
                            combo.Strike >= Context.Armory.Minimums.Strike &&
                            combo.Slash >= Context.Armory.Minimums.Slash &&
                            combo.Thrust >= Context.Armory.Minimums.Thrust &&
                            
                            combo.Magic >= Context.Armory.Minimums.Magic &&
                            combo.Fire >= Context.Armory.Minimums.Fire &&
                            combo.Lightning >= Context.Armory.Minimums.Lightning &&
                            combo.Dark >= Context.Armory.Minimums.Dark &&
                            
                            combo.Bleed >= Context.Armory.Minimums.Bleed &&
                            combo.Poison >= Context.Armory.Minimums.Poison &&
                            combo.Frost >= Context.Armory.Minimums.Frost &&
                            combo.Curse >= Context.Armory.Minimums.Curse &&
                            
                            combo.Poise >= Context.Armory.Minimums.Poise){
                                
                                Context.List.TryToAdd(combo);
                            
                        }
                    }                                 
                }                         
            }
            
            Context.Progress += Context.ProgressIncrement;
            Context._ViewModel.UpdateProgress(Math.floor(Context.Progress));
            ih++;
            setTimeout(Context.ComputeOptimalsIncremental, 1, ih, Context);
            
            //Leaving and letting Angular update the view with progress.
            if(ih < Context.Armory.Head.length)
                return;
                             
        }
        
        Context.ReturnResults(Context);
    }
    
    /*
    ComputeOptimals(): ArmorCombination[] {
        
        this._ViewModel.UpdateProgress(0);
        
        let AM: ArmorMethods = new ArmorMethods(this.Armory);
                
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
            setTimeout(() => {}, 1000);
        }
        
       return List.ToArray();
    }
    */
    
}


export interface IOptimizerComponentVM {
    UpdateProgress(Progress: number): void;
    
    RecieveResults(result: ArmorCombination[]): void;
         
}

export interface IOptimizertContext {       
    Head: ArmorPiece[];
    Chest: ArmorPiece[];
    Arms: ArmorPiece[];
    Legs: ArmorPiece[]; 
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters; 
    
    AvailableWeight: number;
    
    ResultListLength: number;

    CountHeadArmor(): number;

    InnatePoise: number;

}
