import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { ArmorService }     from './armory.service';
import { OptimizerComponent }     from './optimizer.component';

import {ProgressBar} from './ProgressBar'

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, ProgressBar],
    providers: [
        ROUTER_PROVIDERS,
        ArmorService
    ]
})
@RouteConfig([
    {
        path: '/optimizer',
        name: 'Optimizer',
        component: OptimizerComponent,
        useAsDefault: true
    }
])
export class AppComponent { }