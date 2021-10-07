import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'

import {  OnInit } from "@angular/core";
import { Observable as RxObservable } from "rxjs";

import { RideRoutingModule } from './ride-routing.module'
import { RideComponent } from './ride.component'

export class DataItem {
    constructor(public id: number, public name: string) { }
}

@NgModule({
    imports: [NativeScriptCommonModule, RideRoutingModule],
    declarations: [RideComponent],
    schemas: [NO_ERRORS_SCHEMA],
  })

// @Component({
//     selector: "Ride",
//     //moduleId: module.id,
//     templateUrl: "./ride.component.html",
//     //changeDetection: ChangeDetectionStrategy.OnPush,
// })
export class RideModule implements OnInit {
    
    public myItems: RxObservable<Array<DataItem>>;

    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
      }
      
    constructor() {
        let items = [];
        for (let i = 0; i < 3; i++) {
            items.push(new DataItem(i, "data item " + i));
        }

        let subscr;
        this.myItems = RxObservable.create(subscriber => {
            subscr = subscriber;
            subscriber.next(items);
            return function () {
                //console.log("Unsubscribe called!");
            };
        });

        let counter = 2;
        let intervalId = setInterval(() => {
            counter++;
            items.push(new DataItem(counter + 1, "data item " + (counter + 1)));
            subscr.next(items);
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalId);
        }, 15000);
    }
}
