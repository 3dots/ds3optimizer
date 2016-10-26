// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router-deprecated';
// import { Armory, ArmorCombination, GameProgressArmorGroup} from './armory';
// import { ArmorService } from './armory.service';
// @Component({
//     selector: 'my-game.progress',
//     templateUrl: 'app/game.progress.component.html',
//     styleUrls: ['app/game.progress.component.css'],
//     directives: []
// })
// export class GameProgressComponent implements OnInit{
//     Armory: IGameProgressComponentContext;
//      constructor(
//         private _router: Router,
//         private _armorService: ArmorService) {
//     }
//     ngOnInit() {
//         this._armorService.getArmorData()
//             .then( (data: Armory)=> 
//             { 
//                 this.Armory = data as IGameProgressComponentContext;                
//             });   
//     }
//     gotoOptimizer() {
//         let link = ['Optimizer'];
//         this._router.navigate(link);  
//     }
//     gotoArmorSelections() {
//         let link = ['ArmorSelections'];
//         this._router.navigate(link);        
//     }
//     onCharacterChange(NewClass: GameProgressArmorGroup) {
//         this.Armory.EnableArmorGroup(NewClass);
//         NewClass.Enabled = true;
//         //Need to cancle the previous one so long as it doesnt conflict with bonfires
//         if(this.Armory.PreviousCharacter != null) {
//             this.Armory.TryToCancelArmorGroup(this.Armory.PreviousCharacter, this.Armory.GameProgressConditions);
//             this.Armory.PreviousCharacter.Enabled = false;
//         }
//         //console.log(this.Armory.SelectedCharacter.ProgressCondition);
//         this.Armory.PreviousCharacter = this.Armory.SelectedCharacter;
//         this.Armory.SelectedCharacter = NewClass;   
//     }
//     onChangeTest() {
//         console.log(this.Armory.SelectedCharacter.ProgressCondition);
//     }
//     onChangeBonfire(BonfireChanged: GameProgressArmorGroup) {
//         if(BonfireChanged.Enabled) {
//             this.Armory.EnableArmorGroup(BonfireChanged);
//         }
//         else {
//             this.Armory.TryToCancelArmorGroup(BonfireChanged, this.Armory.StartingCharacter);
//         }
//     }
//     DisableAllBonfires(){
//         for(var i = 0; i < this.Armory.GameProgressConditions.length; i++){
//             this.Armory.TryToCancelArmorGroup(this.Armory.GameProgressConditions[i], this.Armory.StartingCharacter);
//             this.Armory.GameProgressConditions[i].Enabled = false;
//         }
//     }
//     EnableAllBonfires() {
//         for(var i = 0; i < this.Armory.GameProgressConditions.length; i++){
//             this.Armory.EnableArmorGroup(this.Armory.GameProgressConditions[i]);
//             this.Armory.GameProgressConditions[i].Enabled = true;
//         }        
//     }
// }
// export interface IGameProgressComponentContext {
//     StartingCharacter: GameProgressArmorGroup[];
//     GameProgressConditions: GameProgressArmorGroup[];
//     SelectedCharacter: GameProgressArmorGroup;
//     PreviousCharacter:  GameProgressArmorGroup;
//     EnableArmorGroup(Group: GameProgressArmorGroup): void;
//     TryToCancelArmorGroup(Group: GameProgressArmorGroup, PossibleConflictGroups: GameProgressArmorGroup[]): void;
// } 
//# sourceMappingURL=game.progress.component.js.map