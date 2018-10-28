import { Component, Input, Output, EventEmitter, ElementRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.resize(false);
        if (this.prefetchdata && this.source) {
            this.http.get(this.source).subscribe((result) => {
                /** @type {?} */
                const response = this.traverseResult(result);
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
        /** @type {?} */
        const list = this.remotepath.split(".");
        list.map((item) => {
            response = response ? response[item] : undefined;
        });
        /** @type {?} */
        const x = list.length ? response : undefined;
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
        /** @type {?} */
        const code = event.which;
        if (code === 13) {
            this.selectTab(item);
        }
        else if (code === 38) {
            // arrow up
            if (i > 0) {
                document.getElementById(this.flexibleId + "-item-" + (i - 1)).focus();
            }
            else {
                document.getElementById(this.flexibleId).focus();
            }
        }
        else if (code === 40 && i < max) {
            // arrow down
            document.getElementById(this.flexibleId + "-item-" + (i + 1)).focus();
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
        /** @type {?} */
        const code = event.which;
        if (code === 13) {
            if (this.filteredData && this.filteredData.length) {
                this.selectTab(this.filteredData[0]);
            }
        }
        else if (code === 38) ;
        else if (code === 40) {
            // arrow down
            if (this.filteredData && this.filteredData.length) {
                document.getElementById(this.flexibleId + "-item-1").focus();
            }
        }
        else {
            this.entry = event.target.value;
            if (this.interval) {
                clearTimeout(this.interval);
            }
            this.interval = setTimeout(() => {
                /** @type {?} */
                const key = this.entry.toLowerCase();
                if (key.length > this.triggeron) {
                    if (!this.prefetchdata && this.source) {
                        this.http.get(this.source + key).subscribe((result) => {
                            /** @type {?} */
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
                            /** @type {?} */
                            let keep = false;
                            for (let j = 0; j < this.keymap.length; j++) {
                                /** @type {?} */
                                const k = this.keymap[j];
                                /** @type {?} */
                                let tmp = item[k];
                                /** @type {?} */
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
                template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n",
                styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out;width:100%}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#ff3e58}:host .viewport li:focus{background-color:#3e8bff}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}"]
            }] }
];
/** @nocollapse */
FlexibleAutoCompleteComponent.ctorParameters = () => [
    { type: Http },
    { type: ElementRef }
];
FlexibleAutoCompleteComponent.propDecorators = {
    flexibleId: [{ type: Input, args: ["flexibleId",] }],
    placeholder: [{ type: Input, args: ["placeholder",] }],
    remotepath: [{ type: Input, args: ["remotepath",] }],
    prefetchdata: [{ type: Input, args: ["prefetchdata",] }],
    animateonresult: [{ type: Input, args: ["animateonresult",] }],
    allowdropdown: [{ type: Input, args: ["allowdropdown",] }],
    keymap: [{ type: Input, args: ['keymap',] }],
    icon: [{ type: Input, args: ["icon",] }],
    message: [{ type: Input, args: ["message",] }],
    direction: [{ type: Input, args: ["direction",] }],
    delayby: [{ type: Input, args: ["delayby",] }],
    triggeron: [{ type: Input, args: ["triggeron",] }],
    viewport: [{ type: Input, args: ["viewport",] }],
    template: [{ type: Input, args: ["template",] }],
    source: [{ type: Input, args: ["source",] }],
    data: [{ type: Input, args: ["data",] }],
    onselect: [{ type: Output, args: ["onselect",] }],
    onsearch: [{ type: Output, args: ["onsearch",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { FlexibleAutoCompleteComponent, FlexibleAutoCompleteModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vZmxleGlibGUtYXV0by1jb21wbGV0ZS9zcmMvYXBwL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUvZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQudHMiLCJuZzovL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUvc3JjL2FwcC9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUtbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGEgdGFibGUgd2hpY2ggaXMgdXNpbmcgdGhlIGdpdmVuIEZsZXhpYmxlVGFibGVIZWFkZXIgc2V0IGluXHJcbiogb3JkZXIgdG8gdGFidWxhdGUgdGhlIGdpdmVuIGRhdGEuIEFzIHBlciBkZWZpbml0aW9uIG9mIGVhcmNoIGhlYWRlciBjb21wb25lbnQsXHJcbiogYSBjb2x1bW4gY291bGQgYmUgaGlkZGVuLCBzb3J0YWJsZSwgb3IgZHJhZ2dhYmxlLiBFYWNoIHRhYmxlIHJvdyBjYW4gZXhwYW5kL2NvbGxhcHNlXHJcbiogb3IgcmVzcG9uZCB0byBhIGNsaWNrIGFjdGlvbi5cclxuKi9cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0QWZ0ZXJWaWV3SW5pdCxcclxuXHRFdmVudEVtaXR0ZXIsXHJcblx0RWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS1hdXRvLWNvbXBsZXRlJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZUF1dG9Db21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXR7XHJcblxyXG5cdHByaXZhdGUgaW50ZXJ2YWw6IGFueTtcclxuXHJcblx0ZW50cnkgPSBcIlwiO1xyXG5cdGZpbHRlcmVkRGF0YTogYW55W10gPSBbXTtcclxuXHJcblx0QElucHV0KFwiZmxleGlibGVJZFwiKVxyXG5cdHB1YmxpYyBmbGV4aWJsZUlkID0gXCJmbGV4aWJsZVwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInBsYWNlaG9sZGVyXCIpXHJcblx0cHVibGljIHBsYWNlaG9sZGVyID0gXCJcIjtcclxuXHRcclxuXHRASW5wdXQoXCJyZW1vdGVwYXRoXCIpXHJcblx0cHVibGljIHJlbW90ZXBhdGggPSBcImJvZHlcIjtcclxuXHRcclxuXHRASW5wdXQoXCJwcmVmZXRjaGRhdGFcIilcclxuXHRwdWJsaWMgcHJlZmV0Y2hkYXRhID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KFwiYW5pbWF0ZW9ucmVzdWx0XCIpXHJcblx0cHVibGljIGFuaW1hdGVvbnJlc3VsdCA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dChcImFsbG93ZHJvcGRvd25cIilcclxuXHRwdWJsaWMgYWxsb3dkcm9wZG93biA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dCgna2V5bWFwJylcclxuICAgIHB1YmxpYyBrZXltYXA6IGFueVtdID0gW107XHJcblxyXG4gICAgQElucHV0KFwiaWNvblwiKVxyXG4gICAgcHVibGljIGljb24gPSBcIlwiO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJcIjtcclxuXHJcblx0QElucHV0KFwiZGlyZWN0aW9uXCIpXHJcbiAgICBwdWJsaWMgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG5cclxuICAgIEBJbnB1dChcImRlbGF5YnlcIilcclxuICAgIHB1YmxpYyBkZWxheWJ5ID0gMzAwO1xyXG5cclxuICAgIEBJbnB1dChcInRyaWdnZXJvblwiKVxyXG4gICAgcHVibGljIHRyaWdnZXJvbiA9IDI7XHJcblxyXG4gICAgQElucHV0KFwidmlld3BvcnRcIilcclxuICAgIHB1YmxpYyB2aWV3cG9ydCA9IFwiMjAwcHhcIjtcclxuXHJcblx0QElucHV0KFwidGVtcGxhdGVcIilcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInNvdXJjZVwiKVxyXG4gICAgcHVibGljIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcImRhdGFcIilcclxuICAgIHB1YmxpYyBkYXRhOiBhbnk7XHJcblxyXG5cdEBPdXRwdXQoXCJvbnNlbGVjdFwiKVxyXG5cdG9uc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHRAT3V0cHV0KFwib25zZWFyY2hcIilcclxuXHRvbnNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cdFxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdHRoaXMucmVzaXplKGZhbHNlKTtcclxuXHRcdGlmICh0aGlzLnByZWZldGNoZGF0YSAmJiB0aGlzLnNvdXJjZSkge1xyXG5cdFx0XHR0aGlzLmh0dHAuZ2V0KHRoaXMuc291cmNlKS5zdWJzY3JpYmUoXHJcblx0XHRcdFx0KHJlc3VsdDogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IHRoaXMudHJhdmVyc2VSZXN1bHQocmVzdWx0KTtcclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRyYXZlcnNlUmVzdWx0KHJlc3BvbnNlKSB7XHJcblx0XHRjb25zdCBsaXN0ID0gdGhpcy5yZW1vdGVwYXRoLnNwbGl0KFwiLlwiKTtcclxuXHRcdGxpc3QubWFwKCAoaXRlbSkgPT4ge1xyXG5cdFx0XHRyZXNwb25zZSA9IHJlc3BvbnNlID8gcmVzcG9uc2VbaXRlbV0gOiB1bmRlZmluZWQ7XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHggPSBsaXN0Lmxlbmd0aCA/IHJlc3BvbnNlIDogdW5kZWZpbmVkO1xyXG5cdFx0cmV0dXJuIHggJiYgKHR5cGVvZiB4ID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoeCkgOiB4O1xyXG5cdH1cclxuXHJcblx0Y2xpY2t1cChldmVudCwgaXRlbSwgaSwgbWF4KSB7XHJcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggaXRlbSApO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHRpZihpID4gMCkge1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tXCIgKyAoIGkgLSAxKSkuZm9jdXMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQpLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gNDAgJiYgaSA8IG1heCkgeyAvLyBhcnJvdyBkb3duXHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tXCIgKyAoIGkgKyAxKSkuZm9jdXMoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHJpdmF0ZSByZXNpemUoZmxhZykge1xyXG5cdFx0aWYgKHRoaXMuYW5pbWF0ZW9ucmVzdWx0KSB7XHJcblx0XHRcdGlmIChmbGFnKSB7XHJcblx0XHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYXMtZGF0YVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhhcy1kYXRhXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhhcy1kYXRhXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRrZXl1cChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YSAmJiB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdFRhYiggdGhpcy5maWx0ZXJlZERhdGFbMF0gKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHQvLyBkbyBub3RoaW5nXHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDQwKSB7IC8vIGFycm93IGRvd25cclxuXHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhICYmIHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCl7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgXCItaXRlbS0xXCIpLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZW50cnkgPSBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHRcdGlmICh0aGlzLmludGVydmFsKSB7XHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3Qga2V5ID0gdGhpcy5lbnRyeS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdGlmIChrZXkubGVuZ3RoID4gdGhpcy50cmlnZ2Vyb24pIHtcclxuXHRcdFx0XHRcdGlmICghdGhpcy5wcmVmZXRjaGRhdGEgJiYgdGhpcy5zb3VyY2UpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5odHRwLmdldCh0aGlzLnNvdXJjZSArIGtleSkuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0XHRcdChyZXN1bHQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSB0aGlzLnRyYXZlcnNlUmVzdWx0KHJlc3VsdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm9uc2VhcmNoLmVtaXQoa2V5KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGF0YSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIChpdGVtKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IGtlZXAgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5rZXltYXAubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGsgPSB0aGlzLmtleW1hcFtqXTtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCB0bXAgPSBpdGVtW2tdXHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB2ID0gdG1wID8gdG1wLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodiAmJiB2LmluZGV4T2Yoa2V5KSA+PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGtlZXAgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGtlZXA7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5vbnNlYXJjaC5lbWl0KGtleSk7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKHRydWUpLCA2Nik7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCB0aGlzLmRlbGF5YnkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RUYWIoaXRlbSkge1xyXG5cdFx0dGhpcy5vbnNlbGVjdC5lbWl0KGl0ZW0pO1xyXG5cdFx0dGhpcy5maWx0ZXJlZERhdGEgPSBbXTtcclxuXHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdHRoaXMuZW50cnkgPSBcIlwiO1xyXG5cdH1cclxufVxyXG4iLCIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBmbGV4aWJsZSB0YWJzIGluIGEgbGF6eSBsb2FkIGZhc2hpb24uXHJcbiovXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbmltcG9ydCB7IEZsZXhpYmxlQXV0b0NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBIdHRwTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZUF1dG9Db21wbGV0ZU1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFNQTs7Ozs7SUE2RUMsWUFBb0IsSUFBVSxFQUFVLEVBQWM7UUFBbEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7cUJBekQ5QyxFQUFFOzRCQUNZLEVBQUU7MEJBR0osVUFBVTsyQkFHVCxFQUFFOzBCQUdILE1BQU07NEJBR0osS0FBSzsrQkFHRixLQUFLOzZCQUdQLEtBQUs7c0JBR0YsRUFBRTtvQkFHWCxFQUFFO3VCQUdDLEVBQUU7eUJBR0EsVUFBVTt1QkFHWixHQUFHO3lCQUdELENBQUM7d0JBR0YsT0FBTzt3QkFZakIsSUFBSSxZQUFZLEVBQUU7d0JBR2xCLElBQUksWUFBWSxFQUFFO0tBRTZCOzs7O0lBRTFELGVBQWU7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ25DLENBQUMsTUFBVzs7Z0JBQ1gsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxRQUFRLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7aUJBQ3JCO2FBQ0QsQ0FDRCxDQUFDO1NBQ0Y7S0FDRDs7Ozs7SUFFTyxjQUFjLENBQUMsUUFBUTs7UUFDOUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDLElBQUk7WUFDZCxRQUFRLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7U0FDakQsQ0FBQyxDQUFDOztRQUNILE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUM3QyxPQUFPLENBQUMsS0FBSyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBR3pELE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHOztRQUMxQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBRXpCLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBRSxDQUFDO1NBQ3ZCO2FBQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFOztZQUN2QixJQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsSUFBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN2RTtpQkFBTTtnQkFDTixRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNqRDtTQUNEO2FBQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7O1lBQ2xDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLElBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkU7S0FDRDs7Ozs7SUFDTyxNQUFNLENBQUMsSUFBSTtRQUNsQixJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDekIsSUFBSSxJQUFJLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoRDtpQkFBTTtnQkFDTixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ25EO1NBQ0Q7YUFBTTtZQUNOLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDaEQ7Ozs7OztJQUVGLEtBQUssQ0FBQyxLQUFLOztRQUNKLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFFL0IsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ2hCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTtnQkFDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7YUFDdkM7U0FDRDthQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRSxDQUV2QjthQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTs7WUFDdkIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDO2dCQUNqRCxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDN0Q7U0FDRDthQUFNO1lBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDNUI7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBRTs7Z0JBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JDLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FDekMsQ0FBQyxNQUFXOzs0QkFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUM3QyxJQUFJLFFBQVEsRUFBRTtnQ0FDYixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQ0FDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7Z0NBQzdCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7b0NBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUN4QixVQUFVLENBQUMsTUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lDQUN2QztxQ0FBTTtvQ0FDTixVQUFVLENBQUMsTUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lDQUN4Qzs2QkFDRDt5QkFDRCxDQUNELENBQUM7cUJBQ0Y7eUJBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO3dCQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUMsSUFBSTs7NEJBQzFDLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQzs0QkFDakIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztnQ0FDM0MsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0NBQ3pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTs7Z0NBQ2pCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsU0FBUyxDQUFDO2dDQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQ0FDN0IsSUFBSSxHQUFHLElBQUksQ0FBQztvQ0FDWixNQUFNO2lDQUNOOzZCQUNEOzRCQUNELE9BQU8sSUFBSSxDQUFDO3lCQUNaLENBQUMsQ0FBQzt3QkFDSCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFOzRCQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs0QkFDeEIsVUFBVSxDQUFDLE1BQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzt5QkFDdkM7NkJBQU07NEJBQ04sVUFBVSxDQUFDLE1BQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQzt5QkFDeEM7cUJBQ0Q7aUJBQ0Q7cUJBQU07b0JBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBQ3ZCLFVBQVUsQ0FBQyxNQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ3hDO2FBQ0QsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDakI7S0FDRDs7Ozs7SUFDRCxTQUFTLENBQUMsSUFBSTtRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLFVBQVUsQ0FBQyxNQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDaEI7OztZQTNMRCxTQUFTLFNBQUM7Z0JBQ1YsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsbXNEQUFzRDs7YUFFdEQ7Ozs7WUFOUSxJQUFJO1lBSFosVUFBVTs7O3lCQWlCVCxLQUFLLFNBQUMsWUFBWTswQkFHbEIsS0FBSyxTQUFDLGFBQWE7eUJBR25CLEtBQUssU0FBQyxZQUFZOzJCQUdsQixLQUFLLFNBQUMsY0FBYzs4QkFHcEIsS0FBSyxTQUFDLGlCQUFpQjs0QkFHdkIsS0FBSyxTQUFDLGVBQWU7cUJBR3JCLEtBQUssU0FBQyxRQUFRO21CQUdYLEtBQUssU0FBQyxNQUFNO3NCQUdaLEtBQUssU0FBQyxTQUFTO3dCQUdsQixLQUFLLFNBQUMsV0FBVztzQkFHZCxLQUFLLFNBQUMsU0FBUzt3QkFHZixLQUFLLFNBQUMsV0FBVzt1QkFHakIsS0FBSyxTQUFDLFVBQVU7dUJBR25CLEtBQUssU0FBQyxVQUFVO3FCQUdiLEtBQUssU0FBQyxRQUFRO21CQUdkLEtBQUssU0FBQyxNQUFNO3VCQUdmLE1BQU0sU0FBQyxVQUFVO3VCQUdqQixNQUFNLFNBQUMsVUFBVTs7Ozs7OztBQzdFbkI7OztZQU1DLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixVQUFVO2lCQUNiO2dCQUNELFlBQVksRUFBRTtvQkFDViw2QkFBNkI7aUJBQ2hDO2dCQUNELE9BQU8sRUFBRTtvQkFDTCw2QkFBNkI7aUJBQ2hDO2dCQUNELGVBQWUsRUFBRSxFQUNoQjtnQkFDRCxTQUFTLEVBQUUsRUFDVjtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzthQUNwQzs7Ozs7Ozs7Ozs7Ozs7OyJ9