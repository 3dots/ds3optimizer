import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS}  from '@angular/router-deprecated';
import {AppComponent} from './app.component';

// Add these symbols to override the `LocationStrategy`
import {provide}           from '@angular/core';
import {LocationStrategy,
        HashLocationStrategy} from '@angular/common';

//bootstrap(AppComponent);
bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy,
         {useClass: HashLocationStrategy}) // .../#/crisis-center/
]);

