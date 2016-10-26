import {Component} from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { ArmorService }     from './armory.service';
import { OptimizerComponent }     from './optimizer.component';
import { ArmorSelectionsComponent }     from './armor.selections.component';
//import { GameProgressComponent }     from './game.progress.component';


@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
 //       ROUTER_PROVIDERS,  This comes from main.ts
        ArmorService
    ]
})
@RouteConfig([
    {
        path: '/optimizer',
        name: 'Optimizer',
        component: OptimizerComponent,
        useAsDefault: true
    },
    {
        path: '/armor.selections',
        name: 'ArmorSelections',
        component: ArmorSelectionsComponent,
    }
    // {
    //     path: '/game.progress',
    //     name: 'GameProgress',
    //     component: GameProgressComponent,
    // }    
])
export class AppComponent { }