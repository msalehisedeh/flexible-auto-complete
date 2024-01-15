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
    set animateonresult(value) {
        throw 'animateonresult is deprecated';
    }
    constructor(http, el) {
        this.http = http;
        this.el = el;
        this.entry = "";
        this.focusedItem = -1;
        this.verticalPosition = '';
        this.flipOrigin = false;
        this.filteredData = [];
        this.flexibleId = "flexible";
        this.placeholder = "";
        this.remotepath = "body";
        this.prefetchdata = false;
        this.forceResultIntoView = false;
        this.allowdropdown = false;
        this.showCounter = false;
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
        this.resize(false, []);
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
            this.verticalPosition = '';
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
    resize(flag, result, source) {
        if (flag && source) {
            const sr = source.getBoundingClientRect();
            const dr = document.body.getBoundingClientRect();
            if ((dr.height - sr.y) < (result.length * 20)) {
                this.verticalPosition = (sr.height + 5) + 'px';
            }
            else {
                this.verticalPosition = '';
            }
            this.flipOrigin = ((dr.width - (sr.x + sr.width)) < sr.width);
            this.filteredData = result;
            if (this.forceResultIntoView) {
                setTimeout(() => {
                    source.parentNode.nextSibling.scrollIntoView();
                }, 66);
            }
        }
    }
    onFocus(event) {
        if (event.target.value) {
            this.search(event);
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
            this.filteredData = [];
            this.search(event);
        }
    }
    selectTab(item) {
        this.onselect.emit(item);
        this.focusedItem = -1;
        setTimeout(() => this.resize(false, this.filteredData), 66);
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
                            if (response.length) {
                                this.onsearch.emit(key);
                                setTimeout(() => this.resize(true, response, event.target), 66);
                            }
                            else {
                                setTimeout(() => this.resize(false, []), 66);
                            }
                        }
                    });
                }
                else if (this.data) {
                    const response = this.data.filter((item) => {
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
                    if (response.length) {
                        this.onsearch.emit(key);
                        setTimeout(() => {
                            this.resize(true, response, event.target);
                        }, 66);
                    }
                    else {
                        setTimeout(() => this.resize(false, []), 66);
                    }
                }
            }
            else {
                setTimeout(() => this.resize(false, []), 66);
            }
        }, this.delayby);
    }
}
FlexibleAutoCompleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlexibleAutoCompleteComponent, deps: [{ token: i1.HttpClient }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
FlexibleAutoCompleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: FlexibleAutoCompleteComponent, isStandalone: true, selector: "flexible-auto-complete", inputs: { flexibleId: "flexibleId", placeholder: "placeholder", remotepath: "remotepath", prefetchdata: "prefetchdata", forceResultIntoView: "forceResultIntoView", animateonresult: "animateonresult", allowdropdown: "allowdropdown", showCounter: "showCounter", keymap: "keymap", icon: "icon", message: "message", direction: "direction", delayby: "delayby", triggeron: "triggeron", viewport: "viewport", template: "template", source: "source", data: "data" }, outputs: { onselect: "onselect", onsearch: "onsearch" }, providers: [HttpClient], ngImport: i0, template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (focus)=\"onFocus($event)\"\r\n        (blur)=\"onBlur($event)\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.bottom]=\"verticalPosition ? verticalPosition : null\"\r\n    [style.right]=\"flipOrigin ? 0 : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <span *ngIf=\"showCounter\" class=\"display-counter\">found {{ filteredData.length }} item(s)</span>\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (focus)=\"focusedItem = i\"\r\n        (blur)=\"onBlurItem($event, i)\"\r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n", styles: [":host{display:table;position:relative}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px #00000029,0 0 0 1px #00000014;transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin:3px 5px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;min-width:100%}:host .viewport.fix-height{position:absolute}:host .viewport .display-counter{text-align:right;display:block;width:100%;font-size:12px;font-style:italic;color:#918e8e;padding:2px 5px;box-sizing:border-box}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#918e8e}:host .viewport li:focus{background-color:#68a2f8}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}@media screen and (max-width: 600px){:host{width:100%}:host .viewport{bottom:auto!important}:host .viewport.fix-height{position:relative}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: HttpClientModule }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: FlexibleAutoCompleteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'flexible-auto-complete', standalone: true, imports: [CommonModule, HttpClientModule], providers: [HttpClient], template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (focus)=\"onFocus($event)\"\r\n        (blur)=\"onBlur($event)\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.bottom]=\"verticalPosition ? verticalPosition : null\"\r\n    [style.right]=\"flipOrigin ? 0 : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <span *ngIf=\"showCounter\" class=\"display-counter\">found {{ filteredData.length }} item(s)</span>\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (focus)=\"focusedItem = i\"\r\n        (blur)=\"onBlurItem($event, i)\"\r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n", styles: [":host{display:table;position:relative}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px #00000029,0 0 0 1px #00000014;transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin:3px 5px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;min-width:100%}:host .viewport.fix-height{position:absolute}:host .viewport .display-counter{text-align:right;display:block;width:100%;font-size:12px;font-style:italic;color:#918e8e;padding:2px 5px;box-sizing:border-box}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#918e8e}:host .viewport li:focus{background-color:#68a2f8}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}@media screen and (max-width: 600px){:host{width:100%}:host .viewport{bottom:auto!important}:host .viewport.fix-height{position:relative}}\n"] }]
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
            }], forceResultIntoView: [{
                type: Input,
                args: ["forceResultIntoView"]
            }], animateonresult: [{
                type: Input,
                args: ["animateonresult"]
            }], allowdropdown: [{
                type: Input,
                args: ["allowdropdown"]
            }], showCounter: [{
                type: Input,
                args: ["showCounter"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL3NyYy9saWIvZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL3NyYy9saWIvZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7RUFLRTtBQUNGLE9BQU8sRUFDSCxTQUFTLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixZQUFZLEVBRVosTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQVV4RCxNQUFNLE9BQU8sNkJBQTZCO0lBeUJ6QyxJQUNJLGVBQWUsQ0FBQyxLQUFjO1FBQ2pDLE1BQU0sK0JBQStCLENBQUM7SUFDdkMsQ0FBQztJQTRDRCxZQUFvQixJQUFnQixFQUFVLEVBQWM7UUFBeEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUFwRTVELFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxnQkFBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFZLEdBQVUsRUFBRSxDQUFDO1FBR2xCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFHeEIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHakIsZUFBVSxHQUFHLE1BQU0sQ0FBQztRQUdw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YmxlIHdoaWNoIGlzIHVzaW5nIHRoZSBnaXZlbiBGbGV4aWJsZVRhYmxlSGVhZGVyIHNldCBpblxyXG4qIG9yZGVyIHRvIHRhYnVsYXRlIHRoZSBnaXZlbiBkYXRhLiBBcyBwZXIgZGVmaW5pdGlvbiBvZiBlYXJjaCBoZWFkZXIgY29tcG9uZW50LFxyXG4qIGEgY29sdW1uIGNvdWxkIGJlIGhpZGRlbiwgc29ydGFibGUsIG9yIGRyYWdnYWJsZS4gRWFjaCB0YWJsZSByb3cgY2FuIGV4cGFuZC9jb2xsYXBzZVxyXG4qIG9yIHJlc3BvbmQgdG8gYSBjbGljayBhY3Rpb24uXHJcbiovXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdEFmdGVyVmlld0luaXQsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdEVsZW1lbnRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLWF1dG8tY29tcGxldGUnLFxyXG5cdHN0YW5kYWxvbmU6IHRydWUsXHJcblx0aW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZV0sXHJcblx0cHJvdmlkZXJzOiBbSHR0cENsaWVudF0sXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0e1xyXG5cclxuXHRwcml2YXRlIGludGVydmFsOiBhbnk7XHJcblxyXG5cdGVudHJ5ID0gXCJcIjtcclxuXHRmb2N1c2VkSXRlbSA9IC0xO1xyXG5cdHZlcnRpY2FsUG9zaXRpb24gPSAnJztcclxuXHRmbGlwT3JpZ2luID0gZmFsc2U7XHJcblx0ZmlsdGVyZWREYXRhOiBhbnlbXSA9IFtdO1xyXG5cclxuXHRASW5wdXQoXCJmbGV4aWJsZUlkXCIpXHJcblx0cHVibGljIGZsZXhpYmxlSWQgPSBcImZsZXhpYmxlXCI7XHJcblx0XHJcblx0QElucHV0KFwicGxhY2Vob2xkZXJcIilcclxuXHRwdWJsaWMgcGxhY2Vob2xkZXIgPSBcIlwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInJlbW90ZXBhdGhcIilcclxuXHRwdWJsaWMgcmVtb3RlcGF0aCA9IFwiYm9keVwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInByZWZldGNoZGF0YVwiKVxyXG5cdHB1YmxpYyBwcmVmZXRjaGRhdGEgPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoXCJmb3JjZVJlc3VsdEludG9WaWV3XCIpXHJcblx0cHVibGljIGZvcmNlUmVzdWx0SW50b1ZpZXcgPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoXCJhbmltYXRlb25yZXN1bHRcIilcclxuXHRzZXQgYW5pbWF0ZW9ucmVzdWx0KHZhbHVlOiBib29sZWFuKSB7XHJcblx0XHR0aHJvdyAnYW5pbWF0ZW9ucmVzdWx0IGlzIGRlcHJlY2F0ZWQnO1xyXG5cdH1cclxuXHRcclxuXHRASW5wdXQoXCJhbGxvd2Ryb3Bkb3duXCIpXHJcblx0cHVibGljIGFsbG93ZHJvcGRvd24gPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoXCJzaG93Q291bnRlclwiKVxyXG5cdHB1YmxpYyBzaG93Q291bnRlciA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dCgna2V5bWFwJylcclxuICAgIHB1YmxpYyBrZXltYXA6IGFueVtdID0gW107XHJcblxyXG4gICAgQElucHV0KFwiaWNvblwiKVxyXG4gICAgcHVibGljIGljb24gPSBcIlwiO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJcIjtcclxuXHJcblx0QElucHV0KFwiZGlyZWN0aW9uXCIpXHJcbiAgICBwdWJsaWMgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG5cclxuICAgIEBJbnB1dChcImRlbGF5YnlcIilcclxuICAgIHB1YmxpYyBkZWxheWJ5ID0gMzAwO1xyXG5cclxuICAgIEBJbnB1dChcInRyaWdnZXJvblwiKVxyXG4gICAgcHVibGljIHRyaWdnZXJvbiA9IDI7XHJcblxyXG4gICAgQElucHV0KFwidmlld3BvcnRcIilcclxuICAgIHB1YmxpYyB2aWV3cG9ydCA9IFwiMjAwcHhcIjtcclxuXHJcblx0QElucHV0KFwidGVtcGxhdGVcIilcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInNvdXJjZVwiKVxyXG4gICAgcHVibGljIHNvdXJjZSE6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgICBwdWJsaWMgZGF0YTogYW55O1xyXG5cclxuXHRAT3V0cHV0KFwib25zZWxlY3RcIilcclxuXHRvbnNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0QE91dHB1dChcIm9uc2VhcmNoXCIpXHJcblx0b25zZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cclxuXHRcclxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XHJcblx0XHR0aGlzLnJlc2l6ZShmYWxzZSwgW10pO1xyXG5cdFx0aWYgKHRoaXMucHJlZmV0Y2hkYXRhICYmIHRoaXMuc291cmNlKSB7XHJcblx0XHRcdHRoaXMuaHR0cC5nZXQodGhpcy5zb3VyY2UpLnN1YnNjcmliZShcclxuXHRcdFx0XHQocmVzdWx0OiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gdGhpcy50cmF2ZXJzZVJlc3VsdChyZXN1bHQpO1xyXG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGF0YSA9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdHJhdmVyc2VSZXN1bHQocmVzcG9uc2U6IGFueSkge1xyXG5cdFx0Y29uc3QgbGlzdCA9IHRoaXMucmVtb3RlcGF0aC5zcGxpdChcIi5cIik7XHJcblx0XHRsaXN0Lm1hcCggKGl0ZW0pID0+IHtcclxuXHRcdFx0cmVzcG9uc2UgPSByZXNwb25zZSA/IHJlc3BvbnNlW2l0ZW1dIDogdW5kZWZpbmVkO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCB4ID0gbGlzdC5sZW5ndGggPyByZXNwb25zZSA6IHVuZGVmaW5lZDtcclxuXHRcdHJldHVybiB4ICYmICh0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKHgpIDogeDtcclxuXHR9XHJcblxyXG5cdG9uQmx1cihldmVudDogYW55KSB7XHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCAmJiAodGhpcy5mb2N1c2VkSXRlbSA8IDApKSB7XHJcblx0XHRcdFx0dGhpcy5mb2N1c2VkSXRlbSA9IC0xO1xyXG5cdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRcdH1cclxuXHRcdH0sIDY2KTtcclxuXHR9XHJcblx0b25CbHVySXRlbShldmVudDogYW55LCBpOiBudW1iZXIpIHtcclxuXHRcdGlmIChpID09PSB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGggLSAxKSB7XHJcblx0XHRcdHRoaXMuZm9jdXNlZEl0ZW0gPSAtMTtcclxuXHRcdFx0dGhpcy52ZXJ0aWNhbFBvc2l0aW9uID0gJyc7XHJcblx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHR9XHJcblx0fVxyXG5cdGNsaWNrdXAoZXZlbnQ6IGFueSwgaXRlbTogYW55LCBpOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggaXRlbSApO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHRpZihpID4gMCkge1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tXCIgKyAoIGkgLSAxKSk/LmZvY3VzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkKT8uZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSA0MCAmJiBpIDwgbWF4KSB7IC8vIGFycm93IGRvd25cclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgXCItaXRlbS1cIiArICggaSArIDEpKT8uZm9jdXMoKTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gOSkgeyAvLyB0YWJcclxuXHRcdFx0aWYgKGkgPCBtYXgpIHtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyBcIi1pdGVtLVwiICsgKCBpICkpPy5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IFxyXG5cdH1cclxuXHRwcml2YXRlIHJlc2l6ZShmbGFnOiBib29sZWFuLCByZXN1bHQ6IGFueVtdLCBzb3VyY2U/OiBhbnkpIHtcclxuXHRcdGlmIChmbGFnICYmIHNvdXJjZSkge1xyXG5cdFx0XHRjb25zdCBzciA9IHNvdXJjZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0Y29uc3QgZHIgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0XHRpZiAoKGRyLmhlaWdodCAtIHNyLnkpIDwgKHJlc3VsdC5sZW5ndGggKiAyMCkpIHtcclxuXHRcdFx0XHR0aGlzLnZlcnRpY2FsUG9zaXRpb24gPSAoc3IuaGVpZ2h0ICsgNSkgKyAncHgnO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMudmVydGljYWxQb3NpdGlvbiA9ICcnO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZmxpcE9yaWdpbiA9ICgoZHIud2lkdGggLSAoc3IueCtzci53aWR0aCkpIDwgc3Iud2lkdGgpO1xyXG5cdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHJlc3VsdDtcclxuXHRcdFx0aWYgKHRoaXMuZm9yY2VSZXN1bHRJbnRvVmlldykge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0c291cmNlLnBhcmVudE5vZGUubmV4dFNpYmxpbmcuc2Nyb2xsSW50b1ZpZXcoKTtcclxuXHRcdFx0XHR9LCA2Nik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0b25Gb2N1cyhldmVudDogYW55KSB7XHJcblx0XHRpZiAoZXZlbnQudGFyZ2V0LnZhbHVlKSB7XHJcblx0XHRcdHRoaXMuc2VhcmNoKGV2ZW50KTtcclxuXHRcdH1cclxuXHR9XHJcblx0a2V5dXAoZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YSAmJiB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdFRhYiggdGhpcy5maWx0ZXJlZERhdGFbMF0gKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLnNlYXJjaChldmVudCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gOSkgeyAvLyB0YWJcclxuXHRcdFx0aWYgKHRoaXMuZm9jdXNlZEl0ZW0gPCAwKSB7XHJcblx0XHRcdFx0dGhpcy5maWx0ZXJlZERhdGEgPSBbXTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHQvLyBkbyBub3RoaW5nXHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDQwKSB7IC8vIGFycm93IGRvd25cclxuXHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhICYmIHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCl7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgXCItaXRlbS0wXCIpPy5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IFtdO1xyXG5cdFx0XHR0aGlzLnNlYXJjaChldmVudCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpdGVtOiBhbnkpIHtcclxuXHRcdHRoaXMub25zZWxlY3QuZW1pdChpdGVtKTtcclxuXHRcdHRoaXMuZm9jdXNlZEl0ZW0gPSAtMTtcclxuXHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSwgdGhpcy5maWx0ZXJlZERhdGEpLCA2Nik7XHJcblx0fVxyXG5cdHByaXZhdGUgc2VhcmNoKGV2ZW50OiBhbnkpIHtcclxuXHRcdHRoaXMuZW50cnkgPSBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHRpZiAodGhpcy5pbnRlcnZhbCkge1xyXG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5pbnRlcnZhbCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmludGVydmFsID0gc2V0VGltZW91dCggKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBrZXkgPSB0aGlzLmVudHJ5LnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdGlmIChrZXkubGVuZ3RoID4gdGhpcy50cmlnZ2Vyb24pIHtcclxuXHRcdFx0XHRpZiAoIXRoaXMucHJlZmV0Y2hkYXRhICYmIHRoaXMuc291cmNlKSB7XHJcblx0XHRcdFx0XHR0aGlzLmh0dHAuZ2V0KHRoaXMuc291cmNlICsga2V5KS5zdWJzY3JpYmUoXHJcblx0XHRcdFx0XHRcdChyZXN1bHQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gdGhpcy50cmF2ZXJzZVJlc3VsdChyZXN1bHQpO1xyXG5cdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMub25zZWFyY2guZW1pdChrZXkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSwgcmVzcG9uc2UsIGV2ZW50LnRhcmdldCksIDY2KTtcclxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSwgW10pLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5kYXRhKSB7XHJcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IHRoaXMuZGF0YS5maWx0ZXIoIChpdGVtOiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdFx0bGV0IGtlZXAgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IHRoaXMua2V5bWFwLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgayA9IHRoaXMua2V5bWFwW2pdO1xyXG5cdFx0XHRcdFx0XHRcdGxldCB0bXAgPSBpdGVtW2tdXHJcblx0XHRcdFx0XHRcdFx0Y29uc3QgdiA9IHRtcCA/IHRtcC50b0xvd2VyQ2FzZSgpIDogdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0XHRcdGlmICh2ICYmIHYuaW5kZXhPZihrZXkpID49IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdGtlZXAgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHJldHVybiBrZWVwO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMub25zZWFyY2guZW1pdChrZXkpO1xyXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVzaXplKHRydWUsIHJlc3BvbnNlLCBldmVudC50YXJnZXQpO1xyXG5cdFx0XHRcdFx0XHR9LCA2Nik7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UsIFtdKSwgNjYpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UsIFtdKSwgNjYpO1xyXG5cdFx0XHR9XHJcblx0XHR9LCB0aGlzLmRlbGF5YnkpO1xyXG5cdH1cclxufVxyXG4iLCJcclxuPGxhYmVsIFtmb3JdPVwiZmxleGlibGVJZFwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJvZmYtc2NyZWVuXCIgW3RleHRDb250ZW50XT1cIm1lc3NhZ2VcIj48L3NwYW4+XHJcbiAgICA8aW5wdXQgW3ZhbHVlXT1cImVudHJ5XCJcclxuICAgICAgICBbcGxhY2Vob2xkZXJdPSBcInBsYWNlaG9sZGVyXCJcclxuXHRcdFtpZF09XCJmbGV4aWJsZUlkXCJcclxuICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcclxuICAgICAgICAoYmx1cik9XCJvbkJsdXIoJGV2ZW50KVwiXHJcbiAgICAgICAgKGtleXVwKT1cImtleXVwKCRldmVudClcIiAvPlxyXG4gICAgPHNwYW4gW2NsYXNzXT1cImljb24gPyBpY29uIDogbnVsbFwiICpuZ0lmPVwiZmlsdGVyZWREYXRhLmxlbmd0aCA9PSAwXCIgW2NsYXNzLmljb25dPVwidHJ1ZVwiIGFyZWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPVwiaWNvbiBmYSBmYS1yZXBseVwiICpuZ0lmPVwiaWNvbiAmJiBmaWx0ZXJlZERhdGEubGVuZ3RoXCIgYXJlYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG48L2xhYmVsPlxyXG48dWwgKm5nSWY9XCJmaWx0ZXJlZERhdGEubGVuZ3RoXCIgXHJcbiAgICByb2xlPVwibGlzdFwiIFxyXG4gICAgY2xhc3M9XCJ2aWV3cG9ydFwiIFxyXG4gICAgW2NsYXNzLmZpeC1oZWlnaHRdPVwiYWxsb3dkcm9wZG93blwiXHJcbiAgICBbc3R5bGUubWF4LXdpZHRoXT1cImRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gdmlld3BvcnQgOiBudWxsXCJcclxuICAgIFtzdHlsZS5vdmVyZmxvdy14XT1cImRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ2F1dG8nIDogbnVsbFwiXHJcbiAgICBbc3R5bGUuYm90dG9tXT1cInZlcnRpY2FsUG9zaXRpb24gPyB2ZXJ0aWNhbFBvc2l0aW9uIDogbnVsbFwiXHJcbiAgICBbc3R5bGUucmlnaHRdPVwiZmxpcE9yaWdpbiA/IDAgOiBudWxsXCJcclxuICAgIFtzdHlsZS5mbGV4LWRpcmVjdGlvbl09XCJkaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/ICdyb3cnIDogJ2NvbHVtbidcIlxyXG4gICAgW3N0eWxlLm1heC1oZWlnaHRdPVwiZGlyZWN0aW9uID09PSAndmVydGljYWwnID8gdmlld3BvcnQgOiBudWxsXCJcclxuICAgIFtzdHlsZS5vdmVyZmxvdy15XT1cImRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICdhdXRvJyA6IG51bGxcIj5cclxuICAgIDxzcGFuICpuZ0lmPVwic2hvd0NvdW50ZXJcIiBjbGFzcz1cImRpc3BsYXktY291bnRlclwiPmZvdW5kIHt7IGZpbHRlcmVkRGF0YS5sZW5ndGggfX0gaXRlbShzKTwvc3Bhbj5cclxuICAgIDxsaSBcclxuICAgICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBmaWx0ZXJlZERhdGE7IGxldCBpID0gaW5kZXhcIiBcclxuICAgICAgICByb2xlPVwibGlzdGl0ZW1cIiBcclxuICAgICAgICB0YWJpbmRleD1cIjBcIiBcclxuICAgICAgICBbaWRdPVwiZmxleGlibGVJZCArJy1pdGVtLScgKyBpXCIgXHJcbiAgICAgICAgKGZvY3VzKT1cImZvY3VzZWRJdGVtID0gaVwiXHJcbiAgICAgICAgKGJsdXIpPVwib25CbHVySXRlbSgkZXZlbnQsIGkpXCJcclxuICAgICAgICAoa2V5dXApPVwiY2xpY2t1cCgkZXZlbnQsIGl0ZW0sIGksIGZpbHRlcmVkRGF0YS5sZW5ndGgpXCIgXHJcbiAgICAgICAgKGNsaWNrKT1cInNlbGVjdFRhYihpdGVtKVwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgIFxyXG4gICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldF09XCJ0ZW1wbGF0ZSA/IHRlbXBsYXRlIDogZGVmYXVsdFRlbXBsYXRlXCIgXHJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7ZGF0YTogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImljb24gZmEgZmEtcmVwbHlcIiBhcmVhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XHJcbiAgICA8L2xpPlxyXG48L3VsPlxyXG5cclxuPG5nLXRlbXBsYXRlICNkZWZhdWx0VGVtcGxhdGUgbGV0LWRldGFpbD1cImRhdGFcIj5cclxuICA8c3BhbiAqbmdGb3I9XCJsZXQgeCBvZiBrZXltYXBcIiBbdGV4dENvbnRlbnRdPVwiZGV0YWlsW3hdICsgJyZuYnNwOydcIj48L3NwYW4+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==