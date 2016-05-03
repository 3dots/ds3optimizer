import {LinkedList} from 'typescript-collections'

import {ArmorCombination} from './armory';
import {OptimizerComponent} from './optimizer.component';

export class OptimizationEngine {
    
    
    MaxListLength: number;
    
    List: LinkedList<ArmorCombination>;
    
    constructor(private _ViewModel: OptimizerComponent){
        _ViewModel.MethodOf();
    }
    
}


