import {Injectable} from 'angular2/core';
import {ARMORY} from './armory.data';


@Injectable()
export class ArmorService {

    getArmorData() {
        return Promise.resolve(ARMORY);
        /*
        return new Promise<Hero[]>(resolve =>
            setTimeout(() => resolve(HEROES), 2000) // 2 seconds
        );
        */
    }


}