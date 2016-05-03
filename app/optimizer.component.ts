import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Armory, ArmorCombination, ArmorPiece } from './armory';
import { ArmorService } from './armory.service';
import { OptimizationEngine } from './optimizer';

@Component({
    selector: 'my-optimizer',
    templateUrl: 'app/optimizer.component.html',
    styleUrls: ['app/optimizer.component.css']
})
export class OptimizerComponent implements OnInit {
    Armory: Armory;
    
    AvailableWeight: number;
      
    OptimalArmorCombinations: ArmorCombination[];
    
    Progress: number;
    
    constructor(
        private _router: Router,
        private _armorService: ArmorService) {
    }

    ngOnInit() {
        this._armorService.getArmorData()
            .then( (data: Armory)=> 
            {
                
                this.Armory = data;   
                
                this.Progress = 70;  
                //this.Test = this.Armory.Head[1].Weight.toString();
                //this.OptimalArmorCombinations = [ new ArmorCombination(this.Armory.Head[2], this.Armory.Chest[1], this.Armory.Arms[1], this.Armory.Legs[1]) ];
            });       
    }
    
    RunOptimization() {
        
        new OptimizationEngine(this);
    }
    
    MethodOf(){

    }
    

    



}