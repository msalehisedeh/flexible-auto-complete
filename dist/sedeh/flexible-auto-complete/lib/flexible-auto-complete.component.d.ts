import { AfterViewInit, EventEmitter, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class FlexibleAutoCompleteComponent implements AfterViewInit {
    private http;
    private el;
    private interval;
    entry: string;
    focusedItem: number;
    filteredData: any[];
    flexibleId: string;
    placeholder: string;
    remotepath: string;
    prefetchdata: boolean;
    animateonresult: boolean;
    allowdropdown: boolean;
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
    onselect: EventEmitter<any>;
    onsearch: EventEmitter<any>;
    constructor(http: HttpClient, el: ElementRef);
    ngAfterViewInit(): void;
    private traverseResult;
    onBlur(event: any): void;
    onBlurItem(event: any, i: number): void;
    clickup(event: any, item: any, i: number, max: number): void;
    private resize;
    keyup(event: any): void;
    selectTab(item: any): void;
    private search;
    static ɵfac: i0.ɵɵFactoryDeclaration<FlexibleAutoCompleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FlexibleAutoCompleteComponent, "flexible-auto-complete", never, { "flexibleId": "flexibleId"; "placeholder": "placeholder"; "remotepath": "remotepath"; "prefetchdata": "prefetchdata"; "animateonresult": "animateonresult"; "allowdropdown": "allowdropdown"; "keymap": "keymap"; "icon": "icon"; "message": "message"; "direction": "direction"; "delayby": "delayby"; "triggeron": "triggeron"; "viewport": "viewport"; "template": "template"; "source": "source"; "data": "data"; }, { "onselect": "onselect"; "onsearch": "onsearch"; }, never, never, true, never>;
}
