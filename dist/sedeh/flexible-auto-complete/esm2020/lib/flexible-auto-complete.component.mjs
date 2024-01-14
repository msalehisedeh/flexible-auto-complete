/*
* Provides rendering of a table which is using the given FlexibleTableHeader set in
* order to tabulate the given data. As per definition of earch header component,
* a column could be hidden, sortable, or draggable. Each table row can expand/collapse
* or respond to a click action.
*/
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/common";
export class FlexibleAutoCompleteComponent {
    constructor(http, el) {
        this.http = http;
        this.el = el;
        this.entry = "";
        this.filteredData = [];
        this.flexibleId = "flexible";
        this.placeholder = "";
        this.remotepath = "body";
        this.prefetchdata = false;
        this.animateonresult = false;
        this.allowdropdown = false;
        this.keymap = [];
        this.icon = "";
        this.message = "";
        this.direction = "vertical";
        this.delayby = 300;
        this.triggeron = 2;
        this.viewport = "200px";
        this.onselect = new EventEmitter();
        this.onsearch = new EventEmitter();
    }
    ngAfterViewInit() {
        this.resize(false);
        if (this.prefetchdata && this.source) {
            this.http.get(this.source).subscribe((result) => {
                const response = this.traverseResult(result);
                if (response) {
                    this.data = response;
                }
            });
        }
    }
    traverseResult(response) {
        const list = this.remotepath.split(".");
        list.map((item) => {
            response = response ? response[item] : undefined;
        });
        const x = list.length ? response : undefined;
        return x && (typeof x === "string") ? JSON.parse(x) : x;
    }
    clickup(event, item, i, max) {
        const code = event.which;
        if (code === 13) {
            this.selectTab(item);
        }
        else if (code === 38) { // arrow up
            if (i > 0) {
                document.getElementById(this.flexibleId + "-item-" + (i - 1))?.focus();
            }
            else {
                document.getElementById(this.flexibleId)?.focus();
            }
        }
        else if (code === 40 && i < max) { // arrow down
            document.getElementById(this.flexibleId + "-item-" + (i + 1))?.focus();
        }
    }
    resize(flag) {
        if (this.animateonresult) {
            if (flag) {
                this.el.nativeElement.classList.add("has-data");
            }
            else {
                this.el.nativeElement.classList.remove("has-data");
            }
        }
        else {
            this.el.nativeElement.classList.add("has-data");
        }
    }
    keyup(event) {
        const code = event.which;
        if (code === 13) {
            if (this.filteredData && this.filteredData.length) {
                this.selectTab(this.filteredData[0]);
            }
        }
        else if (code === 38) { // arrow up
            // do nothing
        }
        else if (code === 40) { // arrow down
            if (this.filteredData && this.filteredData.length) {
                document.getElementById(this.flexibleId + "-item-0")?.focus();
            }
        }
        else {
            this.entry = event.target.value;
            if (this.interval) {
                clearTimeout(this.interval);
            }
            this.interval = setTimeout(() => {
                const key = this.entry.toLowerCase();
                if (key.length > this.triggeron) {
                    if (!this.prefetchdata && this.source) {
                        this.http.get(this.source + key).subscribe((result) => {
                            const response = this.traverseResult(result);
                            if (response) {
                                this.data = response;
                                this.filteredData = response;
                                if (this.filteredData.length) {
                                    this.onsearch.emit(key);
                                    setTimeout(() => this.resize(true), 66);
                                }
                                else {
                                    setTimeout(() => this.resize(false), 66);
                                }
                            }
                        });
                    }
                    else if (this.data) {
                        this.filteredData = this.data.filter((item) => {
                            let keep = false;
                            for (let j = 0; j < this.keymap.length; j++) {
                                const k = this.keymap[j];
                                let tmp = item[k];
                                const v = tmp ? tmp.toLowerCase() : undefined;
                                if (v && v.indexOf(key) >= 0) {
                                    keep = true;
                                    break;
                                }
                            }
                            return keep;
                        });
                        if (this.filteredData.length) {
                            this.onsearch.emit(key);
                            setTimeout(() => this.resize(true), 66);
                        }
                        else {
                            setTimeout(() => this.resize(false), 66);
                        }
                    }
                }
                else {
                    this.filteredData = [];
                    setTimeout(() => this.resize(false), 66);
                }
            }, this.delayby);
        }
    }
    selectTab(item) {
        this.onselect.emit(item);
        this.filteredData = [];
        setTimeout(() => this.resize(false), 66);
        this.entry = "";
    }
}
FlexibleAutoCompleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlexibleAutoCompleteComponent, deps: [{ token: i1.HttpClient }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
FlexibleAutoCompleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: FlexibleAutoCompleteComponent, isStandalone: true, selector: "flexible-auto-complete", inputs: { flexibleId: "flexibleId", placeholder: "placeholder", remotepath: "remotepath", prefetchdata: "prefetchdata", animateonresult: "animateonresult", allowdropdown: "allowdropdown", keymap: "keymap", icon: "icon", message: "message", direction: "direction", delayby: "delayby", triggeron: "triggeron", viewport: "viewport", template: "template", source: "source", data: "data" }, outputs: { onselect: "onselect", onsearch: "onsearch" }, providers: [HttpClient], ngImport: i0, template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n", styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out;width:100%}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px #00000029,0 0 0 1px #00000014;transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#918e8e}:host .viewport li:focus{background-color:#68a2f8}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: HttpClientModule }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlexibleAutoCompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'flexible-auto-complete', standalone: true, imports: [CommonModule, HttpClientModule], providers: [HttpClient], template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n", styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out;width:100%}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px #00000029,0 0 0 1px #00000014;transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#918e8e}:host .viewport li:focus{background-color:#68a2f8}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i0.ElementRef }]; }, propDecorators: { flexibleId: [{
                type: Input,
                args: ["flexibleId"]
            }], placeholder: [{
                type: Input,
                args: ["placeholder"]
            }], remotepath: [{
                type: Input,
                args: ["remotepath"]
            }], prefetchdata: [{
                type: Input,
                args: ["prefetchdata"]
            }], animateonresult: [{
                type: Input,
                args: ["animateonresult"]
            }], allowdropdown: [{
                type: Input,
                args: ["allowdropdown"]
            }], keymap: [{
                type: Input,
                args: ['keymap']
            }], icon: [{
                type: Input,
                args: ["icon"]
            }], message: [{
                type: Input,
                args: ["message"]
            }], direction: [{
                type: Input,
                args: ["direction"]
            }], delayby: [{
                type: Input,
                args: ["delayby"]
            }], triggeron: [{
                type: Input,
                args: ["triggeron"]
            }], viewport: [{
                type: Input,
                args: ["viewport"]
            }], template: [{
                type: Input,
                args: ["template"]
            }], source: [{
                type: Input,
                args: ["source"]
            }], data: [{
                type: Input,
                args: ["data"]
            }], onselect: [{
                type: Output,
                args: ["onselect"]
            }], onsearch: [{
                type: Output,
                args: ["onsearch"]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL3NyYy9saWIvZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL3NyYy9saWIvZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7RUFLRTtBQUNGLE9BQU8sRUFDSCxTQUFTLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBRVosTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQVV4RCxNQUFNLE9BQU8sNkJBQTZCO0lBNkR6QyxZQUFvQixJQUFnQixFQUFVLEVBQWM7UUFBeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUF6RDVELFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUdsQixlQUFVLEdBQUcsVUFBVSxDQUFDO1FBR3hCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR2pCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFHcEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFHckIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHeEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFHbkIsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUduQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBR1YsWUFBTyxHQUFHLEVB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UCxNQUFNO3VCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBhIHRhYmxlIHdoaWNoIGlzIHVzaW5nIHRoZSBnaXZlbiBGbGV4aWJsZVRhYmxlSGVhZGVyIHNldCBpblxyXG4qIG9yZGVyIHRvIHRhYnVsYXRlIHRoZSBnaXZlbiBkYXRhLiBBcyBwZXIgZGVmaW5pdGlvbiBvZiBlYXJjaCBoZWFkZXIgY29tcG9uZW50LFxyXG4qIGEgY29sdW1uIGNvdWxkIGJlIGhpZGRlbiwgc29ydGFibGUsIG9yIGRyYWdnYWJsZS4gRWFjaCB0YWJsZSByb3cgY2FuIGV4cGFuZC9jb2xsYXBzZVxyXG4qIG9yIHJlc3BvbmQgdG8gYSBjbGljayBhY3Rpb24uXHJcbiovXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdEFmdGVyVmlld0luaXQsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdEVsZW1lbnRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLWF1dG8tY29tcGxldGUnLFxyXG5cdHN0YW5kYWxvbmU6IHRydWUsXHJcblx0aW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZV0sXHJcblx0cHJvdmlkZXJzOiBbSHR0cENsaWVudF0sXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0e1xyXG5cclxuXHRwcml2YXRlIGludGVydmFsOiBhbnk7XHJcblxyXG5cdGVudHJ5ID0gXCJcIjtcclxuXHRmaWx0ZXJlZERhdGE6IGFueVtdID0gW107XHJcblxyXG5cdEBJbnB1dChcImZsZXhpYmxlSWRcIilcclxuXHRwdWJsaWMgZmxleGlibGVJZCA9IFwiZmxleGlibGVcIjtcclxuXHRcclxuXHRASW5wdXQoXCJwbGFjZWhvbGRlclwiKVxyXG5cdHB1YmxpYyBwbGFjZWhvbGRlciA9IFwiXCI7XHJcblx0XHJcblx0QElucHV0KFwicmVtb3RlcGF0aFwiKVxyXG5cdHB1YmxpYyByZW1vdGVwYXRoID0gXCJib2R5XCI7XHJcblx0XHJcblx0QElucHV0KFwicHJlZmV0Y2hkYXRhXCIpXHJcblx0cHVibGljIHByZWZldGNoZGF0YSA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dChcImFuaW1hdGVvbnJlc3VsdFwiKVxyXG5cdHB1YmxpYyBhbmltYXRlb25yZXN1bHQgPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoXCJhbGxvd2Ryb3Bkb3duXCIpXHJcblx0cHVibGljIGFsbG93ZHJvcGRvd24gPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoJ2tleW1hcCcpXHJcbiAgICBwdWJsaWMga2V5bWFwOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIEBJbnB1dChcImljb25cIilcclxuICAgIHB1YmxpYyBpY29uID0gXCJcIjtcclxuXHJcbiAgICBASW5wdXQoXCJtZXNzYWdlXCIpXHJcbiAgICBwdWJsaWMgbWVzc2FnZSA9IFwiXCI7XHJcblxyXG5cdEBJbnB1dChcImRpcmVjdGlvblwiKVxyXG4gICAgcHVibGljIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuXHJcbiAgICBASW5wdXQoXCJkZWxheWJ5XCIpXHJcbiAgICBwdWJsaWMgZGVsYXlieSA9IDMwMDtcclxuXHJcbiAgICBASW5wdXQoXCJ0cmlnZ2Vyb25cIilcclxuICAgIHB1YmxpYyB0cmlnZ2Vyb24gPSAyO1xyXG5cclxuICAgIEBJbnB1dChcInZpZXdwb3J0XCIpXHJcbiAgICBwdWJsaWMgdmlld3BvcnQgPSBcIjIwMHB4XCI7XHJcblxyXG5cdEBJbnB1dChcInRlbXBsYXRlXCIpXHJcbiAgICBwdWJsaWMgdGVtcGxhdGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJzb3VyY2VcIilcclxuICAgIHB1YmxpYyBzb3VyY2UhOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwiZGF0YVwiKVxyXG4gICAgcHVibGljIGRhdGE6IGFueTtcclxuXHJcblx0QE91dHB1dChcIm9uc2VsZWN0XCIpXHJcblx0b25zZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdEBPdXRwdXQoXCJvbnNlYXJjaFwiKVxyXG5cdG9uc2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XHJcblx0XHJcblx0bmdBZnRlclZpZXdJbml0KCkge1xyXG5cdFx0dGhpcy5yZXNpemUoZmFsc2UpO1xyXG5cdFx0aWYgKHRoaXMucHJlZmV0Y2hkYXRhICYmIHRoaXMuc291cmNlKSB7XHJcblx0XHRcdHRoaXMuaHR0cC5nZXQodGhpcy5zb3VyY2UpLnN1YnNjcmliZShcclxuXHRcdFx0XHQocmVzdWx0OiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gdGhpcy50cmF2ZXJzZVJlc3VsdChyZXN1bHQpO1xyXG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGF0YSA9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdHJhdmVyc2VSZXN1bHQocmVzcG9uc2U6IGFueSkge1xyXG5cdFx0Y29uc3QgbGlzdCA9IHRoaXMucmVtb3RlcGF0aC5zcGxpdChcIi5cIik7XHJcblx0XHRsaXN0Lm1hcCggKGl0ZW0pID0+IHtcclxuXHRcdFx0cmVzcG9uc2UgPSByZXNwb25zZSA/IHJlc3BvbnNlW2l0ZW1dIDogdW5kZWZpbmVkO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCB4ID0gbGlzdC5sZW5ndGggPyByZXNwb25zZSA6IHVuZGVmaW5lZDtcclxuXHRcdHJldHVybiB4ICYmICh0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKHgpIDogeDtcclxuXHR9XHJcblxyXG5cdGNsaWNrdXAoZXZlbnQ6IGFueSwgaXRlbTogYW55LCBpOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggaXRlbSApO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHRpZihpID4gMCkge1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tXCIgKyAoIGkgLSAxKSk/LmZvY3VzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkKT8uZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSA0MCAmJiBpIDwgbWF4KSB7IC8vIGFycm93IGRvd25cclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgXCItaXRlbS1cIiArICggaSArIDEpKT8uZm9jdXMoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHJpdmF0ZSByZXNpemUoZmxhZzogYm9vbGVhbikge1xyXG5cdFx0aWYgKHRoaXMuYW5pbWF0ZW9ucmVzdWx0KSB7XHJcblx0XHRcdGlmIChmbGFnKSB7XHJcblx0XHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYXMtZGF0YVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhhcy1kYXRhXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhhcy1kYXRhXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRrZXl1cChldmVudDogYW55KSB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0XHJcblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcclxuXHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhICYmIHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0VGFiKCB0aGlzLmZpbHRlcmVkRGF0YVswXSApO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDM4KSB7IC8vIGFycm93IHVwXHJcblx0XHRcdC8vIGRvIG5vdGhpbmdcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gNDApIHsgLy8gYXJyb3cgZG93blxyXG5cdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEgJiYgdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKXtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyBcIi1pdGVtLTBcIik/LmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZW50cnkgPSBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHRcdGlmICh0aGlzLmludGVydmFsKSB7XHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3Qga2V5ID0gdGhpcy5lbnRyeS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdGlmIChrZXkubGVuZ3RoID4gdGhpcy50cmlnZ2Vyb24pIHtcclxuXHRcdFx0XHRcdGlmICghdGhpcy5wcmVmZXRjaGRhdGEgJiYgdGhpcy5zb3VyY2UpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5odHRwLmdldCh0aGlzLnNvdXJjZSArIGtleSkuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0XHRcdChyZXN1bHQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSB0aGlzLnRyYXZlcnNlUmVzdWx0KHJlc3VsdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm9uc2VhcmNoLmVtaXQoa2V5KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGF0YSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIChpdGVtOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRsZXQga2VlcCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmtleW1hcC5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgayA9IHRoaXMua2V5bWFwW2pdO1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHRtcCA9IGl0ZW1ba11cclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHYgPSB0bXAgPyB0bXAudG9Mb3dlckNhc2UoKSA6IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh2ICYmIHYuaW5kZXhPZihrZXkpID49IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0a2VlcCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4ga2VlcDtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLm9uc2VhcmNoLmVtaXQoa2V5KTtcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5maWx0ZXJlZERhdGEgPSBbXTtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIHRoaXMuZGVsYXlieSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpdGVtOiBhbnkpIHtcclxuXHRcdHRoaXMub25zZWxlY3QuZW1pdChpdGVtKTtcclxuXHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHR0aGlzLmVudHJ5ID0gXCJcIjtcclxuXHR9XHJcbn1cclxuIiwiXHJcbjxsYWJlbCBbZm9yXT1cImZsZXhpYmxlSWRcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwib2ZmLXNjcmVlblwiIFt0ZXh0Q29udGVudF09XCJtZXNzYWdlXCI+PC9zcGFuPlxyXG4gICAgPGlucHV0IFt2YWx1ZV09XCJlbnRyeVwiXHJcbiAgICAgICAgW3BsYWNlaG9sZGVyXT0gXCJwbGFjZWhvbGRlclwiXHJcblx0XHRbaWRdPVwiZmxleGlibGVJZFwiXHJcbiAgICAgICAgKGtleXVwKT1cImtleXVwKCRldmVudClcIiAvPlxyXG4gICAgPHNwYW4gW2NsYXNzXT1cImljb24gPyBpY29uIDogbnVsbFwiICpuZ0lmPVwiZmlsdGVyZWREYXRhLmxlbmd0aCA9PSAwXCIgW2NsYXNzLmljb25dPVwidHJ1ZVwiIGFyZWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPVwiaWNvbiBmYSBmYS1yZXBseVwiICpuZ0lmPVwiaWNvbiAmJiBmaWx0ZXJlZERhdGEubGVuZ3RoXCIgYXJlYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG48L2xhYmVsPlxyXG48dWwgKm5nSWY9XCJmaWx0ZXJlZERhdGEubGVuZ3RoXCIgXHJcbiAgICByb2xlPVwibGlzdFwiIFxyXG4gICAgY2xhc3M9XCJ2aWV3cG9ydFwiIFxyXG4gICAgW2NsYXNzLmZpeC1oZWlnaHRdPVwiYWxsb3dkcm9wZG93blwiXHJcbiAgICBbc3R5bGUubWF4LXdpZHRoXT1cImRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gdmlld3BvcnQgOiBudWxsXCJcclxuICAgIFtzdHlsZS5vdmVyZmxvdy14XT1cImRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ2F1dG8nIDogbnVsbFwiXHJcbiAgICBbc3R5bGUuZmxleC1kaXJlY3Rpb25dPVwiZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAncm93JyA6ICdjb2x1bW4nXCJcclxuICAgIFtzdHlsZS5tYXgtaGVpZ2h0XT1cImRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/IHZpZXdwb3J0IDogbnVsbFwiXHJcbiAgICBbc3R5bGUub3ZlcmZsb3cteV09XCJkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgPyAnYXV0bycgOiBudWxsXCI+XHJcbiAgICA8bGkgXHJcbiAgICAgICAgKm5nRm9yPVwibGV0IGl0ZW0gb2YgZmlsdGVyZWREYXRhOyBsZXQgaSA9IGluZGV4XCIgXHJcbiAgICAgICAgcm9sZT1cImxpc3RpdGVtXCIgXHJcbiAgICAgICAgdGFiaW5kZXg9XCIwXCIgXHJcbiAgICAgICAgW2lkXT1cImZsZXhpYmxlSWQgKyctaXRlbS0nICsgaVwiIFxyXG4gICAgICAgIChrZXl1cCk9XCJjbGlja3VwKCRldmVudCwgaXRlbSwgaSwgZmlsdGVyZWREYXRhLmxlbmd0aClcIiBcclxuICAgICAgICAoY2xpY2spPVwic2VsZWN0VGFiKGl0ZW0pXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAgXHJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRlbXBsYXRlID8gdGVtcGxhdGUgOiBkZWZhdWx0VGVtcGxhdGVcIiBcclxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cIntkYXRhOiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbiBmYSBmYS1yZXBseVwiIGFyZWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgIDwvbGk+XHJcbjwvdWw+XHJcblxyXG48bmctdGVtcGxhdGUgI2RlZmF1bHRUZW1wbGF0ZSBsZXQtZGV0YWlsPVwiZGF0YVwiPlxyXG4gIDxzcGFuICpuZ0Zvcj1cImxldCB4IG9mIGtleW1hcFwiIFt0ZXh0Q29udGVudF09XCJkZXRhaWxbeF0gKyAnJm5ic3A7J1wiPjwvc3Bhbj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19