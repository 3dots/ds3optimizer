"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_deprecated_1 = require('@angular/router-deprecated');
var app_component_1 = require('./app.component');
// Add these symbols to override the `LocationStrategy`
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var core_2 = require('@angular/core');
core_2.enableProdMode();
//bootstrap(AppComponent);
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_deprecated_1.ROUTER_PROVIDERS,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy }) // .../#/crisis-center/
]);
//# sourceMappingURL=main.js.map