System.register(['angular2/core', 'angular2/router', './armory', './armory.service', './optimizer', './ProgressBar'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, armory_1, armory_service_1, optimizer_1, ProgressBar_1;
    var OptimizerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (armory_1_1) {
                armory_1 = armory_1_1;
            },
            function (armory_service_1_1) {
                armory_service_1 = armory_service_1_1;
            },
            function (optimizer_1_1) {
                optimizer_1 = optimizer_1_1;
            },
            function (ProgressBar_1_1) {
                ProgressBar_1 = ProgressBar_1_1;
            }],
        execute: function() {
            OptimizerComponent = (function () {
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
                    var _this = this;
                    this._armorService.getArmorData()
                        .then(function (data) {
                        _this.Armory = data;
                        _this.Weights.Physical = 1;
                    });
                };
                OptimizerComponent.prototype.RunOptimization = function () {
                    this.OptimalArmorCombinations = new optimizer_1.OptimizationEngine(this).ComputeOptimals();
                };
                //Used later for progress updates.
                OptimizerComponent.prototype.UpdateProgress = function (Progress) {
                    this.Progress = Progress;
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
                    __metadata('design:paramtypes', [router_1.Router, armory_service_1.ArmorService])
                ], OptimizerComponent);
                return OptimizerComponent;
            }());
            exports_1("OptimizerComponent", OptimizerComponent);
        }
    }
});
//# sourceMappingURL=optimizer.component.js.map