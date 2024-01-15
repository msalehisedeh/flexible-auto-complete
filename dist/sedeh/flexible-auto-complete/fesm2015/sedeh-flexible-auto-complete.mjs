import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output } from '@angular/core';
import * as i1 from '@angular/common/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

/*
* Provides rendering of a table which is using the given FlexibleTableHeader set in
* order to tabulate the given data. As per definition of earch header component,
* a column could be hidden, sortable, or draggable. Each table row can expand/collapse
* or respond to a click action.
*/
class FlexibleAutoCompleteComponent {
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
        var _a, _b, _c, _d;
        const code = event.which;
        if (code === 13) {
            this.selectTab(item);
        }
        else if (code === 38) { // arrow up
            if (i > 0) {
                (_a = document.getElementById(this.flexibleId + "-item-" + (i - 1))) === null || _a === void 0 ? void 0 : _a.focus();
            }
            else {
                (_b = document.getElementById(this.flexibleId)) === null || _b === void 0 ? void 0 : _b.focus();
            }
        }
        else if (code === 40 && i < max) { // arrow down
            (_c = document.getElementById(this.flexibleId + "-item-" + (i + 1))) === null || _c === void 0 ? void 0 : _c.focus();
        }
        else if (code === 9) { // tab
            if (i < max) {
                (_d = document.getElementById(this.flexibleId + "-item-" + (i))) === null || _d === void 0 ? void 0 : _d.focus();
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
        var _a;
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
                (_a = document.getElementById(this.flexibleId + "-item-0")) === null || _a === void 0 ? void 0 : _a.focus();
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

/*
 * Public API Surface of flexible-auto-complete
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FlexibleAutoCompleteComponent };
//# sourceMappingURL=sedeh-flexible-auto-complete.mjs.map
