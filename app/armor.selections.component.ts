import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';


import { Armory, ArmorPiece, ArmorCombination } from './armory';
import { ArmorService } from './armory.service';

@Component({
    selector: 'my-armor.selections',
    templateUrl: 'app/armor.selections.component.html',
    styleUrls: ['app/armor.selections.component.css'],
    directives: []
})
export class ArmorSelectionsComponent implements OnInit{
    
    Armory: IArmorSelectionsComponentContext;
   
     constructor(
        private _router: Router,
        private _armorService: ArmorService) {
    }
    
    ngOnInit() {      
        this._armorService.getArmorData()
            .then( (data: Armory)=> 
            { 
                this.Armory = data as IArmorSelectionsComponentContext;

                //console.log(this.Armory.ArmorSets[0].Head.Name);              
            });   
    }
    
    gotoOptimizer() {
        let link = ['Optimizer'];
        this._router.navigate(link);  
    }
    
    // gotoGameProgressSelections() {
    //     let link = ['GameProgress'];
    //     this._router.navigate(link);          
    // }
    
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
    
    EnableDisableAllHead(value: boolean): void {
        for(var i = 1; i < this.Armory.Head.length; i++){
            this.Armory.Head[i].Enabled = value;
        }
    }
    
    EnableDisableAllChest(value: boolean): void {
        for(var i = 1; i < this.Armory.Chest.length; i++){
            this.Armory.Chest[i].Enabled = value;
        }
    }
    
    EnableDisableAllArms(value: boolean): void {
        for(var i = 1; i < this.Armory.Arms.length; i++){
            this.Armory.Arms[i].Enabled = value;
        }
    }
    
    EnableDisableAllLegs(value: boolean): void {
        for(var i = 1; i < this.Armory.Legs.length; i++){
            this.Armory.Legs[i].Enabled = value;
        }
    }
    
    SortAlphabetically() {
        this.Armory.ArmorSets.sort((a: ArmorCombination, b: ArmorCombination) => { return a.Head.Name.localeCompare(b.Head.Name); });      
    }
    
    SortByWeight() {
        this.Armory.ArmorSets.sort((a: ArmorCombination, b: ArmorCombination) => { return a.Weight - b.Weight; });      
    }                  
  
    
}

export interface IArmorSelectionsComponentContext {
    Head: ArmorPiece[];
    Chest: ArmorPiece[];
    Arms: ArmorPiece[];
    Legs: ArmorPiece[];    
    
    //LargestPieceId: number;
    //LargestSetId: number;    
    
    ArmorSets: ArmorCombination[]; 
      
    HeadSeparatePieces: ArmorPiece[];
    ChestSeparatePieces: ArmorPiece[];
    ArmsSeparatePieces: ArmorPiece[];
    LegsSeparatePieces: ArmorPiece[];
    
    EnableDisableArmorSet(SetId: number, Setting: boolean): void;    
}