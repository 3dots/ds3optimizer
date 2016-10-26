import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Armory, ArmorCombination, ArmorPiece, OptimizationParameters } from './armory';
import { ArmorService } from './armory.service';
import { OptimizationEngine, IOptimizerComponentVM, IOptimizertContext } from './optimizer';

import {ProgressBar} from './ProgressBar'

@Component({
    selector: 'my-optimizer',
    templateUrl: 'app/optimizer.component.html',
    styleUrls: ['app/optimizer.component.css'],
    directives: [ProgressBar]
})
export class OptimizerComponent implements OnInit, IOptimizerComponentVM {
    private _Armory: Armory;
    Armory: IOptimizerComponentContext;
    
    Progress: number = 0;
        
    OptimalArmorCombinations: ArmorCombination[];
    
    WeaponSelectionsView: boolean = true;

    constructor(
        private _router: Router,
        private _armorService: ArmorService) {
        
    }

    ngOnInit() {      
        this._armorService.getArmorData()
            .then( (data: Armory)=> 
            { 
                this.Armory = data as IOptimizerComponentContext;
                this._Armory = data; 
            });   
    }
    
    
    gotoArmorSelections() {
        let link = ['ArmorSelections'];
        this._router.navigate(link);        
    }
    
    // gotoGameProgressSelections() {
    //     let link = ['GameProgress'];
    //     this._router.navigate(link);          
    // }
        
    SetInventoryView(value: boolean) : void {
        this.WeaponSelectionsView = value;
    }
    
      
    RunOptimization() {  
        new OptimizationEngine(this as IOptimizerComponentVM, this._Armory as IOptimizertContext).ComputeOptimals();
    }
    
    UpdateProgress(Progress: number){
        this.Progress = Progress;
    }    
    
    RecieveResults(result: ArmorCombination[]){
        this.OptimalArmorCombinations = result;
    }
    
    
    DisableArmorPiece(piece: ArmorPiece) {
        piece.Enabled = false;
        
        this.RunOptimization();
    }
    
    DisableArmorSet(SetId: number) {
        this.Armory.EnableDisableArmorSet(SetId, false);
        
        this.RunOptimization();
    }
       
    JustPhysical(): void {
        this.Armory.Weights.Physical = 1;
        this.Armory.Weights.Strike = 1;
        this.Armory.Weights.Slash = 1;
        this.Armory.Weights.Thrust = 1;
        
        this.Armory.Weights.Magic = 0;
        this.Armory.Weights.Fire = 0;
        this.Armory.Weights.Lightning = 0;
        this.Armory.Weights.Dark = 0;
        
        this.Armory.Weights.Bleed = 0;
        this.Armory.Weights.Poison = 0;
        this.Armory.Weights.Frost = 0;
        this.Armory.Weights.Curse = 0;
        
        this.Armory.Weights.Poise = 0;   
    }
    
    JustMFLD(): void {
        this.Armory.Weights.Physical = 0;
        this.Armory.Weights.Strike = 0;
        this.Armory.Weights.Slash = 0;
        this.Armory.Weights.Thrust = 0;
        
        this.Armory.Weights.Magic = 1;
        this.Armory.Weights.Fire = 1;
        this.Armory.Weights.Lightning = 1;
        this.Armory.Weights.Dark = 1;
        
        this.Armory.Weights.Bleed = 0;
        this.Armory.Weights.Poison = 0;
        this.Armory.Weights.Frost = 0;
        this.Armory.Weights.Curse = 0;
        
        this.Armory.Weights.Poise = 0;  
    }
    
    BothPhysicalAndMFLD(): void {
        this.Armory.Weights.Physical = 1;
        this.Armory.Weights.Strike = 1;
        this.Armory.Weights.Slash = 1;
        this.Armory.Weights.Thrust = 1;
        
        this.Armory.Weights.Magic = 1;
        this.Armory.Weights.Fire = 1;
        this.Armory.Weights.Lightning = 1;
        this.Armory.Weights.Dark = 1;
        
        this.Armory.Weights.Bleed = 0;
        this.Armory.Weights.Poison = 0;
        this.Armory.Weights.Frost = 0;
        this.Armory.Weights.Curse = 0;
        
        this.Armory.Weights.Poise = 0;  
    }    
}


export interface IOptimizerComponentContext {
    
    Vitality: number;
    FractionGoal: number;
    TotalWeight: number;
    AvailableWeight: number;
    
    ResultListLength: number;    
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters;
    
    UpdateTotalWeights(): void;
    
    EnableDisableArmorSet(SetId: number, Setting: boolean): void;
}