import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Armory, ArmorPiece } from './armory';
import { ArmorService } from './armory.service';

@Component({
    selector: 'my-optimizer',
    templateUrl: 'app/optimizer.component.html',
    styleUrls: ['app/optimizer.component.css']
})

export class OptimizerComponent implements OnInit {
    Armory: Armory;

    constructor(
        private _router: Router,
        private _armorService: ArmorService) {
    }

    ngOnInit() {
        this._armorService.getArmorData()
            .then(data => this.Armory = data);
    }


}