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
var ArmorSelectionsComponent = (function () {
    function ArmorSelectionsComponent(_router, _armorService) {
        this._router = _router;
        this._armorService = _armorService;
    }
    ArmorSelectionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._armorService.getArmorData()
            .then(function (data) {
            _this.Armory = data;
            _this.AM = new armory_1.ArmorMethods(_this.Armory);
            _this.ArmorSets = _this.AM.ArmorSets;
        });
    };
    ArmorSelectionsComponent.prototype.gotoOptimizer = function () {
        var link = ['Optimizer'];
        this._router.navigate(link);
    };
    ArmorSelectionsComponent.prototype.gotoGameProgressSelections = function () {
    };
    ArmorSelectionsComponent = __decorate([
        core_1.Component({
            selector: 'my-armor.selections',
            templateUrl: 'app/armor.selections.component.html',
            styleUrls: ['app/armor.selections.component.css'],
            directives: []
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, armory_service_1.ArmorService])
    ], ArmorSelectionsComponent);
    return ArmorSelectionsComponent;
}());
exports.ArmorSelectionsComponent = ArmorSelectionsComponent;
//# sourceMappingURL=armor.selections.component.js.map