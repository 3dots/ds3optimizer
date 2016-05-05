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
var core_1 = require('angular2/core');
var armory_data_1 = require('./armory.data');
var ArmorService = (function () {
    function ArmorService() {
    }
    ArmorService.prototype.getArmorData = function () {
        return Promise.resolve(armory_data_1.ARMORY);
        /*
        return new Promise<Hero[]>(resolve =>
            setTimeout(() => resolve(HEROES), 2000) // 2 seconds
        );
        */
    };
    ArmorService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ArmorService);
    return ArmorService;
}());
exports.ArmorService = ArmorService;
//# sourceMappingURL=armory.service.js.map