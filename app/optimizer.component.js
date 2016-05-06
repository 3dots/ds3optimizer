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
var armory_1 = require('./armory');
var armory_service_1 = require('./armory.service');
var ProgressBar_1 = require('./ProgressBar');
//import {window} from 'angular2/src/facade/browser';
var OptimizerComponent = (function () {
    //OptimizerThread: Worker;
    function OptimizerComponent(_router, _armorService) {
        this._router = _router;
        this._armorService = _armorService;
        this.AvailableWeight = 100;
        this.ResultListLength = 10;
        this.Progress = 0;
        this.Minimums = new armory_1.OptimizationParameters();
        this.Weights = new armory_1.OptimizationParameters();
    }
    OptimizerComponent.prototype.ngOnInit = function () {
        //if(!(<any>window).Worker){
        // window.alert("Multithreaded JS not enabled. Use a different browser.");
        //}
        var _this = this;
        this._armorService.getArmorData()
            .then(function (data) {
            _this.Armory = data;
            _this.Weights.Physical = 1;
            //this.OptimizerThread = new Worker("optimizer.js");
            //this.OptimizerThread.onmessage = this.ResultHandler;
        });
    };
    OptimizerComponent.prototype.ResultHandler = function (e) {
        var result = e.data;
        if (result.MessageType == "Working") {
            this.Progress = result.Progress;
        }
        else if (result.MessageType == "Done") {
            this.Progress = 100;
            this.OptimalArmorCombinations = result.Results;
        }
        else {
        }
    };
    OptimizerComponent.prototype.ngOnDestroy = function () {
        //this.OptimizerThread.terminate();
    };
    OptimizerComponent.prototype.RunOptimization = function () {
        var msg = { Armory: this.Armory, AvailableWeight: this.AvailableWeight, ResultListLength: this.ResultListLength,
            Minimums: this.Minimums, Weights: this.Weights };
        //this.OptimizerThread.postMessage(msg);
    };
    OptimizerComponent.prototype.DisableArmorPiece = function (piece) {
        piece.Enabled = false;
        this.RunOptimization();
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