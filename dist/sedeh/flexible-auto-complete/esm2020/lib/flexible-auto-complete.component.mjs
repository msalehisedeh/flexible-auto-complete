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
        this.focusedItem = -1;
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
    onBlur(event) {
        setTimeout(() => {
            if (this.filteredData.length && (this.focusedItem < 0)) {
                this.focusedItem = -1;
                this.filteredData = [];
            }
        }, 66);
    }
    onBlurItem(event, i) {
        if (i === this.filteredData.length - 1) {
            this.focusedItem = -1;
            this.filteredData = [];
        }
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
        else if (code === 9) { // tab
            if (i < max) {
                document.getElementById(this.flexibleId + "-item-" + (i))?.focus();
            }
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
            else {
                this.search(event);
            }
        }
        else if (code === 9) { // tab
            if (this.focusedItem < 0) {
                this.filteredData = [];
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
            this.focusedItem = -1;
            this.search(event);
        }
    }
    selectTab(item) {
        this.onselect.emit(item);
        this.focusedItem = -1;
        this.filteredData = [];
        setTimeout(() => this.resize(false), 66);
    }
    search(event) {
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
FlexibleAutoCompleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlexibleAutoCompleteComponent, deps: [{ token: i1.HttpClient }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
FlexibleAutoCompleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: FlexibleAutoCompleteComponent, isStandalone: true, selector: "flexible-auto-complete", inputs: { flexibleId: "flexibleId", placeholder: "placeholder", remotepath: "remotepath", prefetchdata: "prefetchdata", animateonresult: "animateonresult", allowdropdown: "allowdropdown", keymap: "keymap", icon: "icon", message: "message", direction: "direction", delayby: "delayby", triggeron: "triggeron", viewport: "viewport", template: "template", source: "source", data: "data" }, outputs: { onselect: "onselect", onsearch: "onsearch" }, providers: [HttpClient], ngImport: i0, template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (blur)=\"onBlur($event)\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (focus)=\"focusedItem = i\"\r\n        (blur)=\"onBlurItem($event, i)\"\r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n", styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px #00000029,0 0 0 1px #00000014;transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;min-width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#918e8e}:host .viewport li:focus{background-color:#68a2f8}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: HttpClientModule }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlexibleAutoCompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'flexible-auto-complete', standalone: true, imports: [CommonModule, HttpClientModule], providers: [HttpClient], template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (blur)=\"onBlur($event)\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (focus)=\"focusedItem = i\"\r\n        (blur)=\"onBlurItem($event, i)\"\r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n", styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px #00000029,0 0 0 1px #00000014;transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;min-width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#918e8e}:host .viewport li:focus{background-color:#68a2f8}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL3NyYy9saWIvZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL3NyYy9saWIvZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7RUFLRTtBQUNGLE9BQU8sRUFDSCxTQUFTLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBRVosTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQVV4RCxNQUFNLE9BQU8sNkJBQTZCO0lBOER6QyxZQUFvQixJQUFnQixFQUFVLEVBQWM7UUFBeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUExRDVELFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxnQkFBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLGlCQUFZLEdBQVUsRUFBRSxDQUFDO1FBR2xCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFHeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHakIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUdwQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUdyQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQUd4QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUduQixXQUFNLEdBQVUsRUFBRSxDQUFDO1FBR25CLFNBQUks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QVE7c0JBRFAsTUFBTTt1QkFBQyxVQUFVO2dCQUlsQixRQUFRO3NCQURQLE1BQU07dUJBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGEgdGFibGUgd2hpY2ggaXMgdXNpbmcgdGhlIGdpdmVuIEZsZXhpYmxlVGFibGVIZWFkZXIgc2V0IGluXHJcbiogb3JkZXIgdG8gdGFidWxhdGUgdGhlIGdpdmVuIGRhdGEuIEFzIHBlciBkZWZpbml0aW9uIG9mIGVhcmNoIGhlYWRlciBjb21wb25lbnQsXHJcbiogYSBjb2x1bW4gY291bGQgYmUgaGlkZGVuLCBzb3J0YWJsZSwgb3IgZHJhZ2dhYmxlLiBFYWNoIHRhYmxlIHJvdyBjYW4gZXhwYW5kL2NvbGxhcHNlXHJcbiogb3IgcmVzcG9uZCB0byBhIGNsaWNrIGFjdGlvbi5cclxuKi9cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0QWZ0ZXJWaWV3SW5pdCxcclxuXHRFdmVudEVtaXR0ZXIsXHJcblx0RWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtYXV0by1jb21wbGV0ZScsXHJcblx0c3RhbmRhbG9uZTogdHJ1ZSxcclxuXHRpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBIdHRwQ2xpZW50TW9kdWxlXSxcclxuXHRwcm92aWRlcnM6IFtIdHRwQ2xpZW50XSxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZUF1dG9Db21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXR7XHJcblxyXG5cdHByaXZhdGUgaW50ZXJ2YWw6IGFueTtcclxuXHJcblx0ZW50cnkgPSBcIlwiO1xyXG5cdGZvY3VzZWRJdGVtID0gLTE7XHJcblx0ZmlsdGVyZWREYXRhOiBhbnlbXSA9IFtdO1xyXG5cclxuXHRASW5wdXQoXCJmbGV4aWJsZUlkXCIpXHJcblx0cHVibGljIGZsZXhpYmxlSWQgPSBcImZsZXhpYmxlXCI7XHJcblx0XHJcblx0QElucHV0KFwicGxhY2Vob2xkZXJcIilcclxuXHRwdWJsaWMgcGxhY2Vob2xkZXIgPSBcIlwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInJlbW90ZXBhdGhcIilcclxuXHRwdWJsaWMgcmVtb3RlcGF0aCA9IFwiYm9keVwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInByZWZldGNoZGF0YVwiKVxyXG5cdHB1YmxpYyBwcmVmZXRjaGRhdGEgPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoXCJhbmltYXRlb25yZXN1bHRcIilcclxuXHRwdWJsaWMgYW5pbWF0ZW9ucmVzdWx0ID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KFwiYWxsb3dkcm9wZG93blwiKVxyXG5cdHB1YmxpYyBhbGxvd2Ryb3Bkb3duID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KCdrZXltYXAnKVxyXG4gICAgcHVibGljIGtleW1hcDogYW55W10gPSBbXTtcclxuXHJcbiAgICBASW5wdXQoXCJpY29uXCIpXHJcbiAgICBwdWJsaWMgaWNvbiA9IFwiXCI7XHJcblxyXG4gICAgQElucHV0KFwibWVzc2FnZVwiKVxyXG4gICAgcHVibGljIG1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuXHRASW5wdXQoXCJkaXJlY3Rpb25cIilcclxuICAgIHB1YmxpYyBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XHJcblxyXG4gICAgQElucHV0KFwiZGVsYXlieVwiKVxyXG4gICAgcHVibGljIGRlbGF5YnkgPSAzMDA7XHJcblxyXG4gICAgQElucHV0KFwidHJpZ2dlcm9uXCIpXHJcbiAgICBwdWJsaWMgdHJpZ2dlcm9uID0gMjtcclxuXHJcbiAgICBASW5wdXQoXCJ2aWV3cG9ydFwiKVxyXG4gICAgcHVibGljIHZpZXdwb3J0ID0gXCIyMDBweFwiO1xyXG5cclxuXHRASW5wdXQoXCJ0ZW1wbGF0ZVwiKVxyXG4gICAgcHVibGljIHRlbXBsYXRlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwic291cmNlXCIpXHJcbiAgICBwdWJsaWMgc291cmNlITogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcImRhdGFcIilcclxuICAgIHB1YmxpYyBkYXRhOiBhbnk7XHJcblxyXG5cdEBPdXRwdXQoXCJvbnNlbGVjdFwiKVxyXG5cdG9uc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHRAT3V0cHV0KFwib25zZWFyY2hcIilcclxuXHRvbnNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cdFxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdHRoaXMucmVzaXplKGZhbHNlKTtcclxuXHRcdGlmICh0aGlzLnByZWZldGNoZGF0YSAmJiB0aGlzLnNvdXJjZSkge1xyXG5cdFx0XHR0aGlzLmh0dHAuZ2V0KHRoaXMuc291cmNlKS5zdWJzY3JpYmUoXHJcblx0XHRcdFx0KHJlc3VsdDogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IHRoaXMudHJhdmVyc2VSZXN1bHQocmVzdWx0KTtcclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRyYXZlcnNlUmVzdWx0KHJlc3BvbnNlOiBhbnkpIHtcclxuXHRcdGNvbnN0IGxpc3QgPSB0aGlzLnJlbW90ZXBhdGguc3BsaXQoXCIuXCIpO1xyXG5cdFx0bGlzdC5tYXAoIChpdGVtKSA9PiB7XHJcblx0XHRcdHJlc3BvbnNlID0gcmVzcG9uc2UgPyByZXNwb25zZVtpdGVtXSA6IHVuZGVmaW5lZDtcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3QgeCA9IGxpc3QubGVuZ3RoID8gcmVzcG9uc2UgOiB1bmRlZmluZWQ7XHJcblx0XHRyZXR1cm4geCAmJiAodHlwZW9mIHggPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZSh4KSA6IHg7XHJcblx0fVxyXG5cclxuXHRvbkJsdXIoZXZlbnQ6IGFueSkge1xyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGggJiYgKHRoaXMuZm9jdXNlZEl0ZW0gPCAwKSkge1xyXG5cdFx0XHRcdHRoaXMuZm9jdXNlZEl0ZW0gPSAtMTtcclxuXHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IFtdO1xyXG5cdFx0XHR9XHJcblx0XHR9LCA2Nik7XHJcblx0fVxyXG5cdG9uQmx1ckl0ZW0oZXZlbnQ6IGFueSwgaTogbnVtYmVyKSB7XHJcblx0XHRpZiAoaSA9PT0gdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoIC0gMSkge1xyXG5cdFx0XHR0aGlzLmZvY3VzZWRJdGVtID0gLTE7XHJcblx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHR9XHJcblx0fVxyXG5cdGNsaWNrdXAoZXZlbnQ6IGFueSwgaXRlbTogYW55LCBpOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggaXRlbSApO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHRpZihpID4gMCkge1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tXCIgKyAoIGkgLSAxKSk/LmZvY3VzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkKT8uZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSA0MCAmJiBpIDwgbWF4KSB7IC8vIGFycm93IGRvd25cclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgXCItaXRlbS1cIiArICggaSArIDEpKT8uZm9jdXMoKTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gOSkgeyAvLyB0YWJcclxuXHRcdFx0aWYgKGkgPCBtYXgpIHtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyBcIi1pdGVtLVwiICsgKCBpICkpPy5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IFxyXG5cdH1cclxuXHRwcml2YXRlIHJlc2l6ZShmbGFnOiBib29sZWFuKSB7XHJcblx0XHRpZiAodGhpcy5hbmltYXRlb25yZXN1bHQpIHtcclxuXHRcdFx0aWYgKGZsYWcpIHtcclxuXHRcdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhhcy1kYXRhXCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGFzLWRhdGFcIik7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGFzLWRhdGFcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cdGtleXVwKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEgJiYgdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RUYWIoIHRoaXMuZmlsdGVyZWREYXRhWzBdICk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5zZWFyY2goZXZlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDkpIHsgLy8gdGFiXHJcblx0XHRcdGlmICh0aGlzLmZvY3VzZWRJdGVtIDwgMCkge1xyXG5cdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMzgpIHsgLy8gYXJyb3cgdXBcclxuXHRcdFx0Ly8gZG8gbm90aGluZ1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSA0MCkgeyAvLyBhcnJvdyBkb3duXHJcblx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YSAmJiB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpe1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tMFwiKT8uZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5mb2N1c2VkSXRlbSA9IC0xO1xyXG5cdFx0XHR0aGlzLnNlYXJjaChldmVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpdGVtOiBhbnkpIHtcclxuXHRcdHRoaXMub25zZWxlY3QuZW1pdChpdGVtKTtcclxuXHRcdHRoaXMuZm9jdXNlZEl0ZW0gPSAtMTtcclxuXHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0fVxyXG5cdHByaXZhdGUgc2VhcmNoKGV2ZW50OiBhbnkpIHtcclxuXHRcdHRoaXMuZW50cnkgPSBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHRpZiAodGhpcy5pbnRlcnZhbCkge1xyXG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5pbnRlcnZhbCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmludGVydmFsID0gc2V0VGltZW91dCggKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBrZXkgPSB0aGlzLmVudHJ5LnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdGlmIChrZXkubGVuZ3RoID4gdGhpcy50cmlnZ2Vyb24pIHtcclxuXHRcdFx0XHRpZiAoIXRoaXMucHJlZmV0Y2hkYXRhICYmIHRoaXMuc291cmNlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmh0dHAuZ2V0KHRoaXMuc291cmNlICsga2V5KS5zdWJzY3JpYmUoXHJcblx0XHRcdFx0XHRcdChyZXN1bHQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gdGhpcy50cmF2ZXJzZVJlc3VsdChyZXN1bHQpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm9uc2VhcmNoLmVtaXQoa2V5KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKHRydWUpLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5kYXRhKSB7XHJcblx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIChpdGVtOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdFx0bGV0IGtlZXAgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IHRoaXMua2V5bWFwLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgayA9IHRoaXMua2V5bWFwW2pdO1xyXG5cdFx0XHRcdFx0XHRcdGxldCB0bXAgPSBpdGVtW2tdXHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgdiA9IHRtcCA/IHRtcC50b0xvd2VyQ2FzZSgpIDogdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0XHRcdGlmICh2ICYmIHYuaW5kZXhPZihrZXkpID49IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGtlZXAgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiBrZWVwO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMub25zZWFyY2guZW1pdChrZXkpO1xyXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSksIDY2KTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5maWx0ZXJlZERhdGEgPSBbXTtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMuZGVsYXlieSk7XHJcblx0fVxyXG59XHJcbiIsIlxyXG48bGFiZWwgW2Zvcl09XCJmbGV4aWJsZUlkXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cIm9mZi1zY3JlZW5cIiBbdGV4dENvbnRlbnRdPVwibWVzc2FnZVwiPjwvc3Bhbj5cclxuICAgIDxpbnB1dCBbdmFsdWVdPVwiZW50cnlcIlxyXG4gICAgICAgIFtwbGFjZWhvbGRlcl09IFwicGxhY2Vob2xkZXJcIlxyXG5cdFx0W2lkXT1cImZsZXhpYmxlSWRcIlxyXG4gICAgICAgIChibHVyKT1cIm9uQmx1cigkZXZlbnQpXCJcclxuICAgICAgICAoa2V5dXApPVwia2V5dXAoJGV2ZW50KVwiIC8+XHJcbiAgICA8c3BhbiBbY2xhc3NdPVwiaWNvbiA/IGljb24gOiBudWxsXCIgKm5nSWY9XCJmaWx0ZXJlZERhdGEubGVuZ3RoID09IDBcIiBbY2xhc3MuaWNvbl09XCJ0cnVlXCIgYXJlYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJpY29uIGZhIGZhLXJlcGx5XCIgKm5nSWY9XCJpY29uICYmIGZpbHRlcmVkRGF0YS5sZW5ndGhcIiBhcmVhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XHJcbjwvbGFiZWw+XHJcbjx1bCAqbmdJZj1cImZpbHRlcmVkRGF0YS5sZW5ndGhcIiBcclxuICAgIHJvbGU9XCJsaXN0XCIgXHJcbiAgICBjbGFzcz1cInZpZXdwb3J0XCIgXHJcbiAgICBbY2xhc3MuZml4LWhlaWdodF09XCJhbGxvd2Ryb3Bkb3duXCJcclxuICAgIFtzdHlsZS5tYXgtd2lkdGhdPVwiZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyB2aWV3cG9ydCA6IG51bGxcIlxyXG4gICAgW3N0eWxlLm92ZXJmbG93LXhdPVwiZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAnYXV0bycgOiBudWxsXCJcclxuICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/ICdyb3cnIDogJ2NvbHVtbidcIlxyXG4gICAgW3N0eWxlLm1heC1oZWlnaHRdPVwiZGlyZWN0aW9uID09PSAndmVydGljYWwnID8gdmlld3BvcnQgOiBudWxsXCJcclxuICAgIFtzdHlsZS5vdmVyZmxvdy15XT1cImRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICdhdXRvJyA6IG51bGxcIj5cclxuICAgIDxsaSBcclxuICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBmaWx0ZXJlZERhdGE7IGxldCBpID0gaW5kZXhcIiBcclxuICAgICAgICByb2xlPVwibGlzdGl0ZW1cIiBcclxuICAgICAgICB0YWJpbmRleD1cIjBcIiBcclxuICAgICAgICBbaWRdPVwiZmxleGlibGVJZCArJy1pdGVtLScgKyBpXCIgXHJcbiAgICAgICAgKGZvY3VzKT1cImZvY3VzZWRJdGVtID0gaVwiXHJcbiAgICAgICAgKGJsdXIpPVwib25CbHVySXRlbSgkZXZlbnQsIGkpXCJcclxuICAgICAgICAoa2V5dXApPVwiY2xpY2t1cCgkZXZlbnQsIGl0ZW0sIGksIGZpbHRlcmVkRGF0YS5sZW5ndGgpXCIgXHJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdFRhYihpdGVtKVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgIFxyXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZSA/IHRlbXBsYXRlIDogZGVmYXVsdFRlbXBsYXRlXCIgXHJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGF0YTogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImljb24gZmEgZmEtcmVwbHlcIiBhcmVhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XHJcbiAgICA8L2xpPlxyXG48L3VsPlxyXG5cclxuPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGUgbGV0LWRldGFpbD1cImRhdGFcIj5cclxuICA8c3BhbiAqbmdGb3I9XCJsZXQgeCBvZiBrZXltYXBcIiBbdGV4dENvbnRlbnRdPVwiZGV0YWlsW3hdICsgJyZuYnNwOydcIj48L3NwYW4+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==