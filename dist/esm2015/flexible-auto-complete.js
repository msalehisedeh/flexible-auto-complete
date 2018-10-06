import { Component, Input, Output, EventEmitter, ElementRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FlexibleAutoCompleteComponent {
    /**
     * @param {?} http
     * @param {?} el
     */
    constructor(http, el) {
        this.http = http;
        this.el = el;
        this.entry = "";
        this.filteredData = [];
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
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.resize(false);
        if (this.prefetchdata && this.source) {
            this.http.get(this.source).subscribe((result) => {
                const /** @type {?} */ response = this.traverseResult(result);
                if (response) {
                    this.data = response;
                }
            });
        }
    }
    /**
     * @param {?} response
     * @return {?}
     */
    traverseResult(response) {
        const /** @type {?} */ list = this.remotepath.split(".");
        list.map((item) => {
            response = response ? response[item] : undefined;
        });
        const /** @type {?} */ x = list.length ? response : undefined;
        return x && (typeof x === "string") ? JSON.parse(x) : x;
    }
    /**
     * @param {?} event
     * @param {?} item
     * @param {?} i
     * @param {?} max
     * @return {?}
     */
    clickup(event, item, i, max) {
        const /** @type {?} */ code = event.which;
        if (code === 13) {
            this.selectTab(item);
        }
        else if (code === 38 && i > 0) {
            // arrow up
            document.getElementById("item" + (i - 1)).focus();
        }
        else if (code === 40 && i < max) {
            // arrow down
            document.getElementById("item" + (i + 1)).focus();
        }
    }
    /**
     * @param {?} flag
     * @return {?}
     */
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
    /**
     * @param {?} event
     * @return {?}
     */
    keyup(event) {
        const /** @type {?} */ code = event.which;
        if (code === 13) {
            if (this.filteredData && this.filteredData.length) {
                this.selectTab(this.filteredData[0]);
            }
        }
        else {
            this.entry = event.target.value;
            if (this.interval) {
                clearTimeout(this.interval);
            }
            this.interval = setTimeout(() => {
                const /** @type {?} */ key = this.entry.toLowerCase();
                if (key.length > this.triggeron) {
                    if (!this.prefetchdata && this.source) {
                        this.http.get(this.source + key).subscribe((result) => {
                            const /** @type {?} */ response = this.traverseResult(result);
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
                            let /** @type {?} */ keep = false;
                            for (let /** @type {?} */ j = 0; j < this.keymap.length; j++) {
                                const /** @type {?} */ k = this.keymap[j];
                                let /** @type {?} */ tmp = item[k];
                                const /** @type {?} */ v = tmp ? tmp.toLowerCase() : undefined;
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
    /**
     * @param {?} item
     * @return {?}
     */
    selectTab(item) {
        this.onselect.emit(item);
        this.filteredData = [];
        setTimeout(() => this.resize(false), 66);
        this.entry = "";
    }
}
FlexibleAutoCompleteComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-auto-complete',
                template: `
<label for="">
    <span class="off-screen" [textContent]="message"></span>
    <input [value]="entry"
        [placeholder]= "placeholder"
        (keyup)="keyup($event)" />
    <span [class]="icon ? icon : null" *ngIf="filteredData.length == 0" [class.icon]="true" area-hidden="true"></span>
    <span class="icon fa fa-reply" *ngIf="icon && filteredData.length" area-hidden="true"></span>
</label>
<ul *ngIf="filteredData.length"
    role="list"
    class="viewport"
    [class.fix-height]="allowdropdown"
    [style.max-width]="direction === 'horizontal' ? viewport : null"
    [style.overflow-x]="direction === 'horizontal' ? 'auto' : null"
    [style.flex-direction]="direction === 'horizontal' ? 'row' : 'column'"
    [style.max-height]="direction === 'vertical' ? viewport : null"
    [style.overflow-y]="direction === 'vertical' ? 'auto' : null">
    <li
        *ngFor="let item of filteredData; let i = index"
        role="listitem"
        tabindex="0"
        [id]="'item' + i"
        (keyup)="clickup($event, item, i, filteredData.length)"
        (click)="selectTab(item)">
        <ng-container
            [ngTemplateOutlet]="template ? template : defaultTemplate"
            [ngTemplateOutletContext]="{data: item}"></ng-container>
        <span class="icon fa fa-reply" area-hidden="true"></span>
    </li>
</ul>
<ng-template #defaultTemplate let-detail="data">
  <span *ngFor="let x of keymap" [textContent]="detail[x] + '&nbsp;'"></span>
</ng-template>
`,
                styles: [`:host{display:table;position:relative}:host.has-data{-webkit-transition:width 3s ease-in-out;transition:width 3s ease-in-out;width:100%}:host label{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);-webkit-transition:-webkit-box-shadow .2s cubic-bezier(.4,0,.2,1);transition:-webkit-box-shadow .2s cubic-bezier(.4,0,.2,1);transition:box-shadow .2s cubic-bezier(.4,0,.2,1);transition:box-shadow .2s cubic-bezier(.4,0,.2,1),-webkit-box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{-webkit-box-flex:1;-ms-flex:1;flex:1;border:0;padding-left:16px}:host label .icon{-webkit-box-flex:0;-ms-flex:0 0 15px;flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{-webkit-box-sizing:border-box;box-sizing:border-box;list-style-type:none;display:-webkit-box;display:-ms-flexbox;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;width:100%;-webkit-transition:height 3s ease-in-out;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{-webkit-box-sizing:border-box;box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#ff3e58}:host .viewport li:focus{background-color:#3e8bff}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}`]
            },] },
];
/** @nocollapse */
FlexibleAutoCompleteComponent.ctorParameters = () => [
    { type: Http, },
    { type: ElementRef, },
];
FlexibleAutoCompleteComponent.propDecorators = {
    "placeholder": [{ type: Input, args: ["placeholder",] },],
    "remotepath": [{ type: Input, args: ["remotepath",] },],
    "prefetchdata": [{ type: Input, args: ["prefetchdata",] },],
    "animateonresult": [{ type: Input, args: ["animateonresult",] },],
    "allowdropdown": [{ type: Input, args: ["allowdropdown",] },],
    "keymap": [{ type: Input, args: ['keymap',] },],
    "icon": [{ type: Input, args: ["icon",] },],
    "message": [{ type: Input, args: ["message",] },],
    "direction": [{ type: Input, args: ["direction",] },],
    "delayby": [{ type: Input, args: ["delayby",] },],
    "triggeron": [{ type: Input, args: ["triggeron",] },],
    "viewport": [{ type: Input, args: ["viewport",] },],
    "template": [{ type: Input, args: ["template",] },],
    "source": [{ type: Input, args: ["source",] },],
    "data": [{ type: Input, args: ["data",] },],
    "onselect": [{ type: Output, args: ["onselect",] },],
    "onsearch": [{ type: Output, args: ["onsearch",] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FlexibleAutoCompleteModule {
}
FlexibleAutoCompleteModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    HttpModule
                ],
                declarations: [
                    FlexibleAutoCompleteComponent
                ],
                exports: [
                    FlexibleAutoCompleteComponent
                ],
                entryComponents: [],
                providers: [],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
/** @nocollapse */
FlexibleAutoCompleteModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { FlexibleAutoCompleteComponent, FlexibleAutoCompleteModule };
//# sourceMappingURL=flexible-auto-complete.js.map
