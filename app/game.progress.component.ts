import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Armory, ArmorPiece, ArmorCombination, GameProgressArmorGroup} from './armory';
import { ArmorService } from './armory.service';

@Component({
    selector: 'my-game.progress',
    templateUrl: 'app/game.progress.component.html',
    styleUrls: ['app/game.progress.component.css'],
    directives: []
})
export class GameProgressComponent implements OnInit{
    
    Armory: Armory;
    
    StartingCharacterList: GameProgressArmorGroup[];
    GameProgressConditions: GameProgressArmorGroup[];  
     
    SelectedCharacter: GameProgressArmorGroup;
    PreviousCharacter:  GameProgressArmorGroup;
    
     constructor(
        private _router: Router,
        private _armorService: ArmorService) {
    }
    
    ngOnInit() {
        
        this._armorService.getArmorData()
            .then( (data: Armory)=> 
            { 
                this.Armory = data;                
                
                this.StartingCharacterList = this.Armory.StartingCharacter;
                this.GameProgressConditions = this.Armory.GameProgressConditions;
                
                this.SelectedCharacter = this.Armory.SelectedCharacter;
                this.PreviousCharacter = this.Armory.PreviousCharacter;

            });   
    }
    
    gotoOptimizer() {
        let link = ['Optimizer'];
        this._router.navigate(link);  
    }
    
 
    gotoArmorSelections() {
        let link = ['ArmorSelections'];
        this._router.navigate(link);        
    }
    
    onCharacterChange(NewClass: GameProgressArmorGroup) {

        
        this.Armory.EnableArmorGroup(NewClass);
        NewClass.Enabled = true;
        //Need to cancle the previous one so long as it doesnt conflict with bonfires
        this.Armory.TryToCancelArmorGroup(this.PreviousCharacter, this.GameProgressConditions);
        this.PreviousCharacter.Enabled = false;

        this.Armory.PreviousCharacter = this.Armory.SelectedCharacter;
        this.Armory.SelectedCharacter = NewClass;   
    }
    
    onChangeBonfire(BonfireChanged: GameProgressArmorGroup) {
        if(BonfireChanged.Enabled) {
            this.Armory.EnableArmorGroup(BonfireChanged);
        }
        else {
            this.Armory.TryToCancelArmorGroup(BonfireChanged, this.StartingCharacterList);
        }
    }
    
    DisableAllBonfires(){
        for(var i = 0; i < this.GameProgressConditions.length; i++){
            this.Armory.TryToCancelArmorGroup(this.GameProgressConditions[i], this.StartingCharacterList);
            this.GameProgressConditions[i].Enabled = false;
        }
    }
}