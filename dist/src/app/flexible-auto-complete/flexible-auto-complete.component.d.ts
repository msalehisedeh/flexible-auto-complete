import { AfterViewInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
export declare class FlexibleAutoCompleteComponent implements AfterViewInit {
    private http;
    private interval;
    entry: string;
    filteredData: any[];
    placeholder: string;
    remotepath: string;
    prefetchdata: boolean;
    keymap: any[];
    icon: string;
    message: string;
    direction: string;
    delayby: number;
    triggeron: number;
    viewport: string;
    template: any;
    source: string;
    data: any;
    onselect: EventEmitter<{}>;
    constructor(http: Http);
    ngAfterViewInit(): void;
    private traverseResult(response);
    clickup(event: any, item: any): void;
    keyup(event: any): void;
    selectTab(item: any): void;
}
