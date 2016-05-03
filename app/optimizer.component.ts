import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Armory, ArmorCombination, ArmorPiece, OptimizationParameters } from './armory';
import { ArmorService } from './armory.service';
import { OptimizationEngine } from './optimizer';

@Component({
    selector: 'my-optimizer',
    templateUrl: 'app/optimizer.component.html',
    styleUrls: ['app/optimizer.component.css']
})
export class OptimizerComponent implements OnInit, IOptimizerNecessaryData {
    Armory: Armory;
    
    AvailableWeight: number;
    ResultListLength: number;
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters;
      
    OptimalArmorCombinations: ArmorCombination[];

    Progress: number;
    
    Test: number;
    
    constructor(
        private _router: Router,
        private _armorService: ArmorService) {
            this.Minimums = new OptimizationParameters();
            this.Weights = new OptimizationParameters();
    }

    ngOnInit() {
        this._armorService.getArmorData()
            .then( (data: Armory)=> 
            {
                
                this.Armory = data;   
                
                this.Progress = 0;  
                
                this.AvailableWeight = 100;
                this.ResultListLength = 10;
                
                this.Weights.Physical = 1;
                
                
                
                //this.Test = this.Armory.Head[1].Weight.toString();
                //this.OptimalArmorCombinations = [ new ArmorCombination(this.Armory.Head[2], this.Armory.Chest[1], this.Armory.Arms[1], this.Armory.Legs[1]) ];
            });       
    }
    
    RunOptimization() {      
        this.OptimalArmorCombinations = new OptimizationEngine(this as IOptimizerNecessaryData).ComputeOptimals();
    }
    
    //Used later for progress updates.
    UpdateProgress(Progress: number){

    }
}

export interface IOptimizerNecessaryData {
    UpdateProgress(Progress: number): void;
    
    AvailableWeight: number;
    ResultListLength: number;
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters;
    
    Armory: Armory;
}