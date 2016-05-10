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
var core_1 = require("@angular/core");
var ProgressBar = (function () {
    function ProgressBar() {
        this.value = 0;
        this.max = 100;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProgressBar.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProgressBar.prototype, "max", void 0);
    ProgressBar = __decorate([
        core_1.Component({
            selector: "progress-bar",
            template: "\n<div class=\"progress\">\n    <div class=\"progress-bar\"\n        role=\"progressbar\"\n        [attr.aria-valuenow]=\"value / max * 100\"\n        aria-valuemin=\"0\"\n        [attr.aria-valuemax]=\"value / max * 100\" [ngStyle]=\"{ width: value / max * 100 + '%' }\">\n        {{ value / max * 100 | number:'.0' }}% Complete\n    </div>\n</div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], ProgressBar);
    return ProgressBar;
}());
exports.ProgressBar = ProgressBar;
//# sourceMappingURL=ProgressBar.js.map