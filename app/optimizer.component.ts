

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Armory, ArmorCombination, ArmorPiece, OptimizationParameters, GameProgressArmorGroup } from './armory';
import { ArmorService } from './armory.service';
import { OptimizationWorker, WorkerStartMessage, WorkerResultMessage } from './optimizer';

import {ProgressBar} from './ProgressBar'
//import {window} from 'angular2/src/facade/browser';

@Component({
    selector: 'my-optimizer',
    templateUrl: 'app/optimizer.component.html',
    styleUrls: ['app/optimizer.component.css'],
    directives: [ProgressBar]
})
export class OptimizerComponent implements OnInit, OnDestroy {
    Armory: Armory;
    
    AvailableWeight: number = 100;
    ResultListLength: number = 10;
    
    Minimums: OptimizationParameters;
    Weights: OptimizationParameters;
      
    OptimalArmorCombinations: ArmorCombination[];

    Progress: number = 0;
    
    //OptimizerThread: Worker;
    
    constructor(
        private _router: Router,
        private _armorService: ArmorService) {
            this.Minimums = new OptimizationParameters();
            this.Weights = new OptimizationParameters();
    }

    ngOnInit() {
        //if(!(<any>window).Worker){
           // window.alert("Multithreaded JS not enabled. Use a different browser.");
        //}
        
        this._armorService.getArmorData()
            .then( (data: Armory)=> 
            {             
                this.Armory = data;   
             
                this.Weights.Physical = 1;
                
                //this.OptimizerThread = new Worker("optimizer.js");
                
                
                //this.OptimizerThread.onmessage = this.ResultHandler;
                    
                
  
            });   
    }
    
    ResultHandler(e: MessageEvent){
        
        let result: WorkerResultMessage = e.data;
        
        if(result.MessageType == "Working") {
            this.Progress = result.Progress;
        }
        else if(result.MessageType == "Done") {
            this.Progress = 100;
            
            this.OptimalArmorCombinations = result.Results;
        }
        else {
           // window.alert("Something went wrong.");
        }
    }
    
    ngOnDestroy() {

        //this.OptimizerThread.terminate();

    }
    
    
    
    RunOptimization() {
        
        let msg: WorkerStartMessage = { Armory:this.Armory, AvailableWeight:this.AvailableWeight, ResultListLength:this.ResultListLength, 
                                        Minimums:this.Minimums, Weights:this.Weights  };
              
        //this.OptimizerThread.postMessage(msg);
    }
    
    
    
    DisableArmorPiece(piece: ArmorPiece) {
        piece.Enabled = false;
        
        this.RunOptimization();
    }
}



