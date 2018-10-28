/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
export class FlexibleAutoCompleteComponent {
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
        /** @type {?} */
        const code = event.which;
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
                template: "\r\n<label for=\"\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"'item' + i\" \r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n",
                styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out;width:100%}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#ff3e58}:host .viewport li:focus{background-color:#3e8bff}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}"]
            }] }
];
/** @nocollapse */
FlexibleAutoCompleteComponent.ctorParameters = () => [
    { type: Http },
    { type: ElementRef }
];
FlexibleAutoCompleteComponent.propDecorators = {
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
if (false) {
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.interval;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.entry;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.filteredData;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.placeholder;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.remotepath;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.prefetchdata;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.animateonresult;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.allowdropdown;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.keymap;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.icon;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.message;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.direction;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.delayby;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.triggeron;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.viewport;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.template;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.source;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.data;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.onselect;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.onsearch;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.http;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.el;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSxPQUFPLEVBQ0gsU0FBUyxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3JDLE1BQU07Ozs7O0lBMERMLFlBQW9CLElBQVUsRUFBVSxFQUFjO1FBQWxDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO3FCQXREOUMsRUFBRTs0QkFDWSxFQUFFOzJCQUdILEVBQUU7MEJBR0gsTUFBTTs0QkFHSixLQUFLOytCQUdGLEtBQUs7NkJBR1AsS0FBSztzQkFHRixFQUFFO29CQUdYLEVBQUU7dUJBR0MsRUFBRTt5QkFHQSxVQUFVO3VCQUdaLEdBQUc7eUJBR0QsQ0FBQzt3QkFHRixPQUFPO3dCQVlqQixJQUFJLFlBQVksRUFBRTt3QkFHbEIsSUFBSSxZQUFZLEVBQUU7S0FFNkI7Ozs7SUFFMUQsZUFBZTtRQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUNuQyxDQUFDLE1BQVcsRUFBRSxFQUFFOztnQkFDZixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxD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QVc7c0JBR2QsS0FBSyxTQUFDLFNBQVM7d0JBR2YsS0FBSyxTQUFDLFdBQVc7dUJBR2pCLEtBQUssU0FBQyxVQUFVO3VCQUduQixLQUFLLFNBQUMsVUFBVTtxQkFHYixLQUFLLFNBQUMsUUFBUTttQkFHZCxLQUFLLFNBQUMsTUFBTTt1QkFHZixNQUFNLFNBQUMsVUFBVTt1QkFHakIsTUFBTSxTQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBhIHRhYmxlIHdoaWNoIGlzIHVzaW5nIHRoZSBnaXZlbiBGbGV4aWJsZVRhYmxlSGVhZGVyIHNldCBpblxyXG4qIG9yZGVyIHRvIHRhYnVsYXRlIHRoZSBnaXZlbiBkYXRhLiBBcyBwZXIgZGVmaW5pdGlvbiBvZiBlYXJjaCBoZWFkZXIgY29tcG9uZW50LFxyXG4qIGEgY29sdW1uIGNvdWxkIGJlIGhpZGRlbiwgc29ydGFibGUsIG9yIGRyYWdnYWJsZS4gRWFjaCB0YWJsZSByb3cgY2FuIGV4cGFuZC9jb2xsYXBzZVxyXG4qIG9yIHJlc3BvbmQgdG8gYSBjbGljayBhY3Rpb24uXHJcbiovXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdEFmdGVyVmlld0luaXQsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdEVsZW1lbnRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtYXV0by1jb21wbGV0ZScsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0e1xyXG5cclxuXHRwcml2YXRlIGludGVydmFsOiBhbnk7XHJcblxyXG5cdGVudHJ5ID0gXCJcIjtcclxuXHRmaWx0ZXJlZERhdGE6IGFueVtdID0gW107XHJcblxyXG5cdEBJbnB1dChcInBsYWNlaG9sZGVyXCIpXHJcblx0cHVibGljIHBsYWNlaG9sZGVyID0gXCJcIjtcclxuXHRcclxuXHRASW5wdXQoXCJyZW1vdGVwYXRoXCIpXHJcblx0cHVibGljIHJlbW90ZXBhdGggPSBcImJvZHlcIjtcclxuXHRcclxuXHRASW5wdXQoXCJwcmVmZXRjaGRhdGFcIilcclxuXHRwdWJsaWMgcHJlZmV0Y2hkYXRhID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KFwiYW5pbWF0ZW9ucmVzdWx0XCIpXHJcblx0cHVibGljIGFuaW1hdGVvbnJlc3VsdCA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dChcImFsbG93ZHJvcGRvd25cIilcclxuXHRwdWJsaWMgYWxsb3dkcm9wZG93biA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dCgna2V5bWFwJylcclxuICAgIHB1YmxpYyBrZXltYXA6IGFueVtdID0gW107XHJcblxyXG4gICAgQElucHV0KFwiaWNvblwiKVxyXG4gICAgcHVibGljIGljb24gPSBcIlwiO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJcIjtcclxuXHJcblx0QElucHV0KFwiZGlyZWN0aW9uXCIpXHJcbiAgICBwdWJsaWMgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG5cclxuICAgIEBJbnB1dChcImRlbGF5YnlcIilcclxuICAgIHB1YmxpYyBkZWxheWJ5ID0gMzAwO1xyXG5cclxuICAgIEBJbnB1dChcInRyaWdnZXJvblwiKVxyXG4gICAgcHVibGljIHRyaWdnZXJvbiA9IDI7XHJcblxyXG4gICAgQElucHV0KFwidmlld3BvcnRcIilcclxuICAgIHB1YmxpYyB2aWV3cG9ydCA9IFwiMjAwcHhcIjtcclxuXHJcblx0QElucHV0KFwidGVtcGxhdGVcIilcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInNvdXJjZVwiKVxyXG4gICAgcHVibGljIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcImRhdGFcIilcclxuICAgIHB1YmxpYyBkYXRhOiBhbnk7XHJcblxyXG5cdEBPdXRwdXQoXCJvbnNlbGVjdFwiKVxyXG5cdG9uc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHRAT3V0cHV0KFwib25zZWFyY2hcIilcclxuXHRvbnNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cdFxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdHRoaXMucmVzaXplKGZhbHNlKTtcclxuXHRcdGlmICh0aGlzLnByZWZldGNoZGF0YSAmJiB0aGlzLnNvdXJjZSkge1xyXG5cdFx0XHR0aGlzLmh0dHAuZ2V0KHRoaXMuc291cmNlKS5zdWJzY3JpYmUoXHJcblx0XHRcdFx0KHJlc3VsdDogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IHRoaXMudHJhdmVyc2VSZXN1bHQocmVzdWx0KTtcclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRyYXZlcnNlUmVzdWx0KHJlc3BvbnNlKSB7XHJcblx0XHRjb25zdCBsaXN0ID0gdGhpcy5yZW1vdGVwYXRoLnNwbGl0KFwiLlwiKTtcclxuXHRcdGxpc3QubWFwKCAoaXRlbSkgPT4ge1xyXG5cdFx0XHRyZXNwb25zZSA9IHJlc3BvbnNlID8gcmVzcG9uc2VbaXRlbV0gOiB1bmRlZmluZWQ7XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHggPSBsaXN0Lmxlbmd0aCA/IHJlc3BvbnNlIDogdW5kZWZpbmVkO1xyXG5cdFx0cmV0dXJuIHggJiYgKHR5cGVvZiB4ID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoeCkgOiB4O1xyXG5cdH1cclxuXHJcblx0Y2xpY2t1cChldmVudCwgaXRlbSwgaSwgbWF4KSB7XHJcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggaXRlbSApO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCAmJiBpPjApIHsgLy8gYXJyb3cgdXBcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpdGVtXCIgKyAoIGkgLSAxKSkuZm9jdXMoKTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gNDAgJiYgaSA8IG1heCkgeyAvLyBhcnJvdyBkb3duXHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbVwiICsgKCBpICsgMSkpLmZvY3VzKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByaXZhdGUgcmVzaXplKGZsYWcpIHtcclxuXHRcdGlmICh0aGlzLmFuaW1hdGVvbnJlc3VsdCkge1xyXG5cdFx0XHRpZiAoZmxhZykge1xyXG5cdFx0XHRcdHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGFzLWRhdGFcIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoYXMtZGF0YVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYXMtZGF0YVwiKTtcclxuXHRcdH1cclxuXHR9XHJcblx0a2V5dXAoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEgJiYgdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RUYWIoIHRoaXMuZmlsdGVyZWREYXRhWzBdICk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZW50cnkgPSBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHRcdGlmICh0aGlzLmludGVydmFsKSB7XHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3Qga2V5ID0gdGhpcy5lbnRyeS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdGlmIChrZXkubGVuZ3RoID4gdGhpcy50cmlnZ2Vyb24pIHtcclxuXHRcdFx0XHRcdGlmICghdGhpcy5wcmVmZXRjaGRhdGEgJiYgdGhpcy5zb3VyY2UpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5odHRwLmdldCh0aGlzLnNvdXJjZSArIGtleSkuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0XHRcdChyZXN1bHQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSB0aGlzLnRyYXZlcnNlUmVzdWx0KHJlc3VsdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm9uc2VhcmNoLmVtaXQoa2V5KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGF0YSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIChpdGVtKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IGtlZXAgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5rZXltYXAubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGsgPSB0aGlzLmtleW1hcFtqXTtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCB0bXAgPSBpdGVtW2tdXHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB2ID0gdG1wID8gdG1wLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodiAmJiB2LmluZGV4T2Yoa2V5KSA+PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGtlZXAgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGtlZXA7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5vbnNlYXJjaC5lbWl0KGtleSk7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKHRydWUpLCA2Nik7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCB0aGlzLmRlbGF5YnkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RUYWIoaXRlbSkge1xyXG5cdFx0dGhpcy5vbnNlbGVjdC5lbWl0KGl0ZW0pO1xyXG5cdFx0dGhpcy5maWx0ZXJlZERhdGEgPSBbXTtcclxuXHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdHRoaXMuZW50cnkgPSBcIlwiO1xyXG5cdH1cclxufVxyXG4iXX0=