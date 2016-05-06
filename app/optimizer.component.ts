

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Armory, ArmorCombination, ArmorPiece, OptimizationParameters, GameProgressArmorGroup } from './armory';
import { ArmorService } from './armory.service';
import { OptimizationEngine, IOptimizerNecessaryData } from './optimizer';

import {ProgressBar} from './ProgressBar'

@Component({
    selector: 'my-optimizer',
    templateUrl: 'app/optimizer.component.html',
    styleUrls: ['app/optimizer.component.css'],
    directives: [ProgressBar]
})
export class OptimizerComponent implements OnInit {
    Armory: Armory;
    
    AvailableWeight: number = 100;
    ResultListLength: number = 10;
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters;
      
    OptimalArmorCombinations: ArmorCombination[];

    Progress: number = 0;
    
    OptimizerThread: Worker;
    
    constructor(
        private _router: Router,
        private _armorService: ArmorService) {
            this.Minimums = new OptimizationParameters();
            
            this.Weights = new OptimizationParameters();
            this.Weights.Physical = 1;
    }

    ngOnInit() {
        
        this._armorService.getArmorData()
            .then( (data: Armory)=> { this.Armory = data; });   
    }
      
    RunOptimization() {
        
        this.OptimalArmorCombinations = new OptimizationEngine(this as IOptimizerNecessaryData).ComputeOptimals();
    }

    DisableArmorPiece(piece: ArmorPiece) {
        piece.Enabled = false;
    }
    
    UpdateProgress(Progress: number){
        this.Progress = Progress;
    }
}
