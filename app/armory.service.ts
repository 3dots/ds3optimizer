import {Injectable} from '@angular/core';
import {ARMORY} from './armory.data';
import {Armory, ArmoryData} from './armory';


@Injectable()
export class ArmorService {

    getArmorData() {
  
        return Promise.resolve(new Armory(ARMORY));

        
        /*
        return new Promise<Hero[]>(resolve =>
            setTimeout(() => resolve(HEROES), 2000) // 2 seconds
        );
        */
    }


}