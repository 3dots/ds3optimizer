

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Armory, ArmorCombination, ArmorPiece, OptimizationParameters } from './armory';
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
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters;
      
    OptimalArmorCombinations: ArmorCombination[];

    Progress: number = 0;
    
    
    constructor(
        private _router: Router,
        private _armorService: ArmorService) {
        
    }

    ngOnInit() {
        
        this._armorService.getArmorData()
            .then( (data: Armory)=> 
            { 
                this.Armory = data; 
                
                this.Minimums = this.Armory.Minimums;
                
                this.Weights = this.Armory.Weights;
                //this.AvailableWeight = this.Armory.AvailableWeight;
                //this.ResultListLength = this.Armory.ResultListLength;
            });   
    }
      
    RunOptimization() {
        
        new OptimizationEngine(this as IOptimizerNecessaryData).ComputeOptimals();
    }
    
    RecieveResults(result: ArmorCombination[]){
        this.OptimalArmorCombinations = result;
    }

    DisableArmorPiece(piece: ArmorPiece) {
        piece.Enabled = false;
        
        this.RunOptimization();
    }
    
    UpdateProgress(Progress: number){
        this.Progress = Progress;
    }
    
    gotoArmorSelections() {
        let link = ['ArmorSelections'];
        this._router.navigate(link);        
    }
    
    gotoGameProgressSelections() {
        let link = ['GameProgress'];
        this._router.navigate(link);          
    }
    
    DisableArmorSet(SetId: number) {
        this.Armory.EnableDisableArmorSet(SetId, false);
        
        this.RunOptimization();
    }
    
    ResetWeights() {
        this.Weights.Physical = 1;
        this.Weights.Strike = 1;
        this.Weights.Slash = 1;
        this.Weights.Thrust = 1;
        
        this.Weights.Magic = 0;
        this.Weights.Fire = 0;
        this.Weights.Lightning = 0;
        this.Weights.Dark = 0;
        
        this.Weights.Bleed = 0;
        this.Weights.Poison = 0;
        this.Weights.Frost = 0;
        this.Weights.Curse = 0;
        
        this.Weights.Poise = 0;
      
    }
    
    SetMagicWeights() {
        this.Weights.Magic = 1;
        this.Weights.Fire = 1;
        this.Weights.Lightning = 1;
        this.Weights.Dark = 1;
    }
}
