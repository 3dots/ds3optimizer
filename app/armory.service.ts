import {Injectable} from '@angular/core';
import {ARMORY} from './armory.data';
import {Armory, ArmoryData} from './armory';


@Injectable()
export class ArmorService {
    
    Armory: Armory;
    
    constructor() {
        this.Armory = new Armory(ARMORY);
        //console.log("Service constructor ran.")
    }

    getArmorData() {
  
        return Promise.resolve(this.Armory);

        
        /*
        return new Promise<Hero[]>(resolve =>
            setTimeout(() => resolve(HEROES), 2000) // 2 seconds
        );
        */
    }


}