import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Armory, ArmorCombination, ArmorPiece, OptimizationParameters, GameProgressArmorGroup } from './armory';
import { ArmorService } from './armory.service';
import { OptimizationEngine } from './optimizer';

import {ProgressBar} from './ProgressBar'

@Component({
    selector: 'my-optimizer',
    templateUrl: 'app/optimizer.component.html',
    styleUrls: ['app/optimizer.component.css'],
    directives: [ProgressBar]
})
export class OptimizerComponent implements OnInit, IOptimizerNecessaryData {
    Armory: Armory;
    
    AvailableWeight: number = 100;
    ResultListLength: number = 10;
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters;
      
    OptimalArmorCombinations: ArmorCombination[];

    Progress: number = 0;
    
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
             
                this.Weights.Physical = 1;               
            });       
    }
    
    
    
    RunOptimization() {      
        this.OptimalArmorCombinations = new OptimizationEngine(this as IOptimizerNecessaryData).ComputeOptimals();
    }
    
    //Used later for progress updates.
    UpdateProgress(Progress: number){
        this.Progress = Progress;
    }
    
    DisableArmorPiece(piece: ArmorPiece) {
        piece.Enabled = false;
        
        this.RunOptimization();
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

