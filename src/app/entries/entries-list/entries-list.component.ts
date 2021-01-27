import { Component, Input, OnInit } from '@angular/core';

import { SorterService } from '../../core/sorter.service';
import { Entry } from '../../core/model/entry';

@Component({
    selector: 'app-entries-list',
    templateUrl: './entries-list.component.html'
})
export class EntriesListComponent implements OnInit {
    private _entries: Entry[] = [];
    @Input() get entries(): Entry[] {
        return this._entries;
    }
    set entries(value: Entry[]) {
        if (value) {
            this.filteredEntries = this._entries = value;
            //this.calculateOrders();
        }
    }
    filteredEntries: Entry[] = [];
    entriesOrderTotal: number;
    currencyCode = 'USD';

    constructor(private sorterService: SorterService) { }

    ngOnInit() {

    }

    // calculateOrders() {
    //     this.entriesOrderTotal = 0;
    //     this.filteredEntries.forEach((entr: Entry) => {
    //         this.entriesOrderTotal += entr.orderTotal;
    //     });
    // }

    filter(data: string) {
        if (data) {
            this.filteredEntries = this.entries.filter((entr: Entry) => {
                return entr.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                       entr.phonenumber.toLowerCase().indexOf(data.toLowerCase()) > -1;
                     //  entr.orderTotal.toString().indexOf(data) > -1;
            });
        } else {
            this.filteredEntries = this.entries;
        }
       // this.calculateOrders();
    }

    sort(prop: string) {
        this.sorterService.sort(this.filteredEntries, prop);
    }

    entryTrackBy(index: number, entry: Entry) {
        return entry.entryId;
    }

}
