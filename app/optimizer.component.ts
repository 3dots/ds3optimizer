import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Armory, ArmorCombination } from './armory';
import { ArmorService } from './armory.service';

@Component({
    selector: 'my-optimizer',
    templateUrl: 'app/optimizer.component.html',
    styleUrls: ['app/optimizer.component.css']
})

export class OptimizerComponent implements OnInit {
    Armory: Armory;
    
    Test: string;
    
    OptimalArmorCombinations;
    
    // OptimalArmorCombinations(): ArmorCombination[]{
    //     return [ new ArmorCombination(this.Armory.Head[1], this.Armory.Chest[1], this.Armory.Arms[1], this.Armory.Legs[1]) ];
    // };

    constructor(
        private _router: Router,
        private _armorService: ArmorService) {
    }

    ngOnInit() {
        this._armorService.getArmorData()
            .then(data => this.Armory = data);
            
        this.Test = "Success"
        
        this.OptimalArmorCombinations = new ArmorCombination(this.Armory.Head[1], this.Armory.Chest[1], this.Armory.Arms[1], this.Armory.Legs[1]);
    }
    



}