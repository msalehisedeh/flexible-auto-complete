import { EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
export declare class FlexibleAutoCompleteComponent {
    private http;
    private interval;
    entry: string;
    filteredData: any[];
    keymap: any[];
    icon: string;
    message: string;
    direction: string;
    delayby: number;
    triggeron: number;
    source: string;
    viewport: string;
    template: any;
    data: any;
    onselect: EventEmitter<{}>;
    constructor(http: Http);
    clickup(event: any, item: any): void;
    keyup(event: any): void;
    selectTab(item: any): void;
}
