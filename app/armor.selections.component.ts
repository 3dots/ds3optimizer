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
    
    TotalArmorPieces: number;
    TotalSetCount: number;
    
    HeadSeparatePieces: ArmorPiece[];
    ChestSeparatePieces: ArmorPiece[];
    ArmsSeparatePieces: ArmorPiece[];
    LegsSeparatePieces: ArmorPiece[];
    
     constructor(
        private _router: Router,
        private _armorService: ArmorService) {
    }
    
    ngOnInit() {
        
        this._armorService.getArmorData()
            .then( (data: Armory)=> 
            { 
                this.Armory = data;
                this.TotalArmorPieces = this.Armory.LargestPieceId;
                this.TotalSetCount = this.Armory.LargestSetId;                
               
                this.ArmorSets = this.Armory.ArmorSets;
                
                this.HeadSeparatePieces = this.Armory.HeadSeparatePieces;
                this.ChestSeparatePieces = this.Armory.ChestSeparatePieces;
                this.ArmsSeparatePieces = this.Armory.ArmsSeparatePieces;
                this.LegsSeparatePieces = this.Armory.LegsSeparatePieces;
            });   
    }
    
    gotoOptimizer() {
        let link = ['Optimizer'];
        this._router.navigate(link);  
    }
    
    gotoGameProgressSelections() {
        let link = ['GameProgress'];
        this._router.navigate(link);          
    }
    
    ToggleArmorPiece(Piece: ArmorPiece) {
        Piece.Enabled = !Piece.Enabled;
    }
    
    SetArmorSet(Combo: ArmorCombination, EnableDisable: boolean) {
        let SetId;
        
        if(Combo.Head.SetId != 0) 
            SetId = Combo.Head.SetId;
        else if(Combo.Chest.SetId != 0)
            SetId = Combo.Chest.SetId;
        else if(Combo.Arms.SetId != 0)
            SetId = Combo.Arms.SetId;
        else if(Combo.Legs.SetId != 0)
            SetId = Combo.Legs.SetId;                        
        
        this.Armory.EnableDisableArmorSet(SetId, EnableDisable);
    }
    
    DisableAllHead(){
        for(var i = 1; i < this.Armory.Head.length; i++){
            this.Armory.Head[i].Enabled = false;
        }
    }
    
    DisableAllChest(){
        for(var i = 1; i < this.Armory.Chest.length; i++){
            this.Armory.Chest[i].Enabled = false;
        }
    }
    
    DisableAllArms(){
        for(var i = 1; i < this.Armory.Arms.length; i++){
            this.Armory.Arms[i].Enabled = false;
        }
    }
    
    DisableAllLegs(){
        for(var i = 1; i < this.Armory.Legs.length; i++){
            this.Armory.Legs[i].Enabled = false;
        }
    }            
  
    
}