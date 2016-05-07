import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Armory, ArmorPiece, ArmorCombination, GameProgressArmorGroup} from './armory';
import { ArmorService } from './armory.service';

@Component({
    selector: 'my-armor.selections',
    templateUrl: 'app/armor.selections.component.html',
    styleUrls: ['app/armor.selections.component.css'],
    directives: []
})
export class ArmorSelectionsComponent implements OnInit{
    
    Armory: Armory;
    
    ArmorSets: ArmorCombination[];
    
     constructor(
        private _router: Router,
        private _armorService: ArmorService) {
    }
    
    ngOnInit() {
        
        this._armorService.getArmorData()
            .then( (data: Armory)=> 
            { 
                this.Armory = data;                
                
                
                this.ArmorSets = this.Armory.ArmorSets;
            });   
    }
    
    gotoOptimizer() {
        let link = ['Optimizer'];
        this._router.navigate(link);  
    }
    
    gotoGameProgressSelections() {
        
    }    
    
}