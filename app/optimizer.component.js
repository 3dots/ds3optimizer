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
var optimizer_1 = require('./optimizer');
var ProgressBar_1 = require('./ProgressBar');
var OptimizerComponent = (function () {
    function OptimizerComponent(_router, _armorService) {
        this._router = _router;
        this._armorService = _armorService;
        this.Progress = 0;
    }
    OptimizerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._armorService.getArmorData()
            .then(function (data) {
            _this.Armory = data;
            _this.Minimums = _this.Armory.Minimums;
            _this.Weights = _this.Armory.Weights;
            //this.AvailableWeight = this.Armory.AvailableWeight;
            //this.ResultListLength = this.Armory.ResultListLength;
        });
    };
    OptimizerComponent.prototype.RunOptimization = function () {
        this.Armory.TotalWeight =
            ((50 + this.Armory.Vitality - 10) +
                (this.Armory.RingsEquipped[0].VitalityModifier != null ? this.Armory.RingsEquipped[0].VitalityModifier : 0) +
                (this.Armory.RingsEquipped[1].VitalityModifier != null ? this.Armory.RingsEquipped[1].VitalityModifier : 0) +
                (this.Armory.RingsEquipped[2].VitalityModifier != null ? this.Armory.RingsEquipped[2].VitalityModifier : 0) +
                (this.Armory.RingsEquipped[3].VitalityModifier != null ? this.Armory.RingsEquipped[3].VitalityModifier : 0)) *
                (this.Armory.RingsEquipped[0].ProductModfier != null ? this.Armory.RingsEquipped[0].ProductModfier : 1) *
                (this.Armory.RingsEquipped[1].ProductModfier != null ? this.Armory.RingsEquipped[1].ProductModfier : 1) *
                (this.Armory.RingsEquipped[2].ProductModfier != null ? this.Armory.RingsEquipped[2].ProductModfier : 1) *
                (this.Armory.RingsEquipped[3].ProductModfier != null ? this.Armory.RingsEquipped[3].ProductModfier : 1);
        this.Armory.AvailableWeight =
            this.Armory.TotalWeight * this.Armory.FractionGoal -
                this.Armory.RightWeapons[0] - this.Armory.RightWeapons[1] - this.Armory.RightWeapons[2] -
                this.Armory.LeftWeapons[0] - this.Armory.LeftWeapons[1] - this.Armory.LeftWeapons[2] -
                this.Armory.RingsEquipped[0].Weight - this.Armory.RingsEquipped[1].Weight - this.Armory.RingsEquipped[2].Weight - this.Armory.RingsEquipped[3].Weight;
        new optimizer_1.OptimizationEngine(this).ComputeOptimals();
    };
    OptimizerComponent.prototype.RecieveResults = function (result) {
        this.OptimalArmorCombinations = result;
    };
    OptimizerComponent.prototype.DisableArmorPiece = function (piece) {
        piece.Enabled = false;
        this.RunOptimization();
    };
    OptimizerComponent.prototype.UpdateProgress = function (Progress) {
        this.Progress = Progress;
    };
    OptimizerComponent.prototype.gotoArmorSelections = function () {
        var link = ['ArmorSelections'];
        this._router.navigate(link);
    };
    OptimizerComponent.prototype.gotoGameProgressSelections = function () {
        var link = ['GameProgress'];
        this._router.navigate(link);
    };
    OptimizerComponent.prototype.DisableArmorSet = function (SetId) {
        this.Armory.EnableDisableArmorSet(SetId, false);
        this.RunOptimization();
    };
    OptimizerComponent.prototype.ResetWeights = function () {
        this.Weights.Physical = 1;
        this.Weights.Strike = 1;
        this.Weights.Slash = 1;
        this.Weights.Thrust = 1;
        this.Weights.Magic = 0;
        this.Weights.Fire = 0;
        this.Weights.Lightning = 0;
        this.Weights.Dark = 0;
        this.Weights.Bleed = 0;
        this.Weights.Poison = 0;
        this.Weights.Frost = 0;
        this.Weights.Curse = 0;
        this.Weights.Poise = 0;
    };
    OptimizerComponent.prototype.SetMagicWeights = function () {
        this.Weights.Magic = 1;
        this.Weights.Fire = 1;
        this.Weights.Lightning = 1;
        this.Weights.Dark = 1;
    };
    OptimizerComponent = __decorate([
        core_1.Component({
            selector: 'my-optimizer',
            templateUrl: 'app/optimizer.component.html',
            styleUrls: ['app/optimizer.component.css'],
            directives: [ProgressBar_1.ProgressBar]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, armory_service_1.ArmorService])
    ], OptimizerComponent);
    return OptimizerComponent;
}());
exports.OptimizerComponent = OptimizerComponent;
//# sourceMappingURL=optimizer.component.js.map