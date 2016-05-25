"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var armory_service_1 = require('./armory.service');
var GameProgressComponent = (function () {
    function GameProgressComponent(_router, _armorService) {
        this._router = _router;
        this._armorService = _armorService;
    }
    GameProgressComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._armorService.getArmorData()
            .then(function (data) {
            _this.Armory = data;
        });
    };
    GameProgressComponent.prototype.gotoOptimizer = function () {
        var link = ['Optimizer'];
        this._router.navigate(link);
    };
    GameProgressComponent.prototype.gotoArmorSelections = function () {
        var link = ['ArmorSelections'];
        this._router.navigate(link);
    };
    GameProgressComponent.prototype.onCharacterChange = function (NewClass) {
        this.Armory.EnableArmorGroup(NewClass);
        NewClass.Enabled = true;
        //Need to cancle the previous one so long as it doesnt conflict with bonfires
        if (this.Armory.PreviousCharacter != null) {
            this.Armory.TryToCancelArmorGroup(this.Armory.PreviousCharacter, this.Armory.GameProgressConditions);
            this.Armory.PreviousCharacter.Enabled = false;
        }
        //console.log(this.Armory.SelectedCharacter.ProgressCondition);
        this.Armory.PreviousCharacter = this.Armory.SelectedCharacter;
        this.Armory.SelectedCharacter = NewClass;
    };
    GameProgressComponent.prototype.onChangeTest = function () {
        console.log(this.Armory.SelectedCharacter.ProgressCondition);
    };
    GameProgressComponent.prototype.onChangeBonfire = function (BonfireChanged) {
        if (BonfireChanged.Enabled) {
            this.Armory.EnableArmorGroup(BonfireChanged);
        }
        else {
            this.Armory.TryToCancelArmorGroup(BonfireChanged, this.Armory.StartingCharacter);
        }
    };
    GameProgressComponent.prototype.DisableAllBonfires = function () {
        for (var i = 0; i < this.Armory.GameProgressConditions.length; i++) {
            this.Armory.TryToCancelArmorGroup(this.Armory.GameProgressConditions[i], this.Armory.StartingCharacter);
            this.Armory.GameProgressConditions[i].Enabled = false;
        }
    };
    GameProgressComponent.prototype.EnableAllBonfires = function () {
        for (var i = 0; i < this.Armory.GameProgressConditions.length; i++) {
            this.Armory.EnableArmorGroup(this.Armory.GameProgressConditions[i]);
            this.Armory.GameProgressConditions[i].Enabled = true;
        }
    };
    GameProgressComponent = __decorate([
        core_1.Component({
            selector: 'my-game.progress',
            templateUrl: 'app/game.progress.component.html',
            styleUrls: ['app/game.progress.component.css'],
            directives: []
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, armory_service_1.ArmorService])
    ], GameProgressComponent);
    return GameProgressComponent;
}());
exports.GameProgressComponent = GameProgressComponent;
//# sourceMappingURL=game.progress.component.js.map