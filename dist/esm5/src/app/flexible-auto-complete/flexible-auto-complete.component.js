/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
var FlexibleAutoCompleteComponent = /** @class */ (function () {
    function FlexibleAutoCompleteComponent(http, el) {
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
    FlexibleAutoCompleteComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.resize(false);
        if (this.prefetchdata && this.source) {
            this.http.get(this.source).subscribe(function (result) {
                /** @type {?} */
                var response = _this.traverseResult(result);
                if (response) {
                    _this.data = response;
                }
            });
        }
    };
    /**
     * @param {?} response
     * @return {?}
     */
    FlexibleAutoCompleteComponent.prototype.traverseResult = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        /** @type {?} */
        var list = this.remotepath.split(".");
        list.map(function (item) {
            response = response ? response[item] : undefined;
        });
        /** @type {?} */
        var x = list.length ? response : undefined;
        return x && (typeof x === "string") ? JSON.parse(x) : x;
    };
    /**
     * @param {?} event
     * @param {?} item
     * @param {?} i
     * @param {?} max
     * @return {?}
     */
    FlexibleAutoCompleteComponent.prototype.clickup = /**
     * @param {?} event
     * @param {?} item
     * @param {?} i
     * @param {?} max
     * @return {?}
     */
    function (event, item, i, max) {
        /** @type {?} */
        var code = event.which;
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
    };
    /**
     * @param {?} flag
     * @return {?}
     */
    FlexibleAutoCompleteComponent.prototype.resize = /**
     * @param {?} flag
     * @return {?}
     */
    function (flag) {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexibleAutoCompleteComponent.prototype.keyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        /** @type {?} */
        var code = event.which;
        if (code === 13) {
            if (this.filteredData && this.filteredData.length) {
                this.selectTab(this.filteredData[0]);
            }
        }
        else if (code === 38) {
            // arrow up
            // do nothing
        }
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
            this.interval = setTimeout(function () {
                /** @type {?} */
                var key = _this.entry.toLowerCase();
                if (key.length > _this.triggeron) {
                    if (!_this.prefetchdata && _this.source) {
                        _this.http.get(_this.source + key).subscribe(function (result) {
                            /** @type {?} */
                            var response = _this.traverseResult(result);
                            if (response) {
                                _this.data = response;
                                _this.filteredData = response;
                                if (_this.filteredData.length) {
                                    _this.onsearch.emit(key);
                                    setTimeout(function () { return _this.resize(true); }, 66);
                                }
                                else {
                                    setTimeout(function () { return _this.resize(false); }, 66);
                                }
                            }
                        });
                    }
                    else if (_this.data) {
                        _this.filteredData = _this.data.filter(function (item) {
                            /** @type {?} */
                            var keep = false;
                            for (var j = 0; j < _this.keymap.length; j++) {
                                /** @type {?} */
                                var k = _this.keymap[j];
                                /** @type {?} */
                                var tmp = item[k];
                                /** @type {?} */
                                var v = tmp ? tmp.toLowerCase() : undefined;
                                if (v && v.indexOf(key) >= 0) {
                                    keep = true;
                                    break;
                                }
                            }
                            return keep;
                        });
                        if (_this.filteredData.length) {
                            _this.onsearch.emit(key);
                            setTimeout(function () { return _this.resize(true); }, 66);
                        }
                        else {
                            setTimeout(function () { return _this.resize(false); }, 66);
                        }
                    }
                }
                else {
                    _this.filteredData = [];
                    setTimeout(function () { return _this.resize(false); }, 66);
                }
            }, this.delayby);
        }
    };
    /**
     * @param {?} item
     * @return {?}
     */
    FlexibleAutoCompleteComponent.prototype.selectTab = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        this.onselect.emit(item);
        this.filteredData = [];
        setTimeout(function () { return _this.resize(false); }, 66);
        this.entry = "";
    };
    FlexibleAutoCompleteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'flexible-auto-complete',
                    template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n",
                    styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out;width:100%}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#ff3e58}:host .viewport li:focus{background-color:#3e8bff}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}"]
                }] }
    ];
    /** @nocollapse */
    FlexibleAutoCompleteComponent.ctorParameters = function () { return [
        { type: Http },
        { type: ElementRef }
    ]; };
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
    return FlexibleAutoCompleteComponent;
}());
export { FlexibleAutoCompleteComponent };
if (false) {
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.interval;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.entry;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.filteredData;
    /** @type {?} */
    FlexibleAutoCompleteComponent.prototype.flexibleId;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSxPQUFPLEVBQ0gsU0FBUyxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQW9FcEMsdUNBQW9CLElBQVUsRUFBVSxFQUFjO1FBQWxDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO3FCQXpEOUMsRUFBRTs0QkFDWSxFQUFFOzBCQUdKLFVBQVU7MkJBR1QsRUFBRTswQkFHSCxNQUFNOzRCQUdKLEtBQUs7K0JBR0YsS0FBSzs2QkFHUCxLQUFLO3NCQUdGLEVBQUU7b0JBR1gsRUFBRTt1QkFHQyxFQUFFO3lCQUdBLFVBQVU7dUJBR1osR0FBRzt5QkFHRCxDQUFDO3dCQUdGLE9BQU87d0JBWWpCLElBQUksWUFBWSxFQUFFO3dCQUdsQixJQUFJLFlBQVksRUFBRTtLQUU2Qjs7OztJQUUxRCx1REFBZTs7O0lBQWY7UUFBQSxpQkFZQztRQVhBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUNuQyxVQUFDLE1BQVc7O2dCQUNYLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFB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Q0QsaURBQVM7Ozs7SUFBVCxVQUFVLElBQUk7UUFBZCxpQkFLQztRQUpBLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLFVBQVUsQ0FBQyxjQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBbEIsQ0FBa0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUNoQjs7Z0JBM0xELFNBQVMsU0FBQztvQkFDVixRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxtc0RBQXNEOztpQkFFdEQ7Ozs7Z0JBTlEsSUFBSTtnQkFIWixVQUFVOzs7NkJBaUJULEtBQUssU0FBQyxZQUFZOzhCQUdsQixLQUFLLFNBQUMsYUFBYTs2QkFHbkIsS0FBSyxTQUFDLFlBQVk7K0JBR2xCLEtBQUssU0FBQyxjQUFjO2tDQUdwQixLQUFLLFNBQUMsaUJBQWlCO2dDQUd2QixLQUFLLFNBQUMsZUFBZTt5QkFHckIsS0FBSyxTQUFDLFFBQVE7dUJBR1gsS0FBSyxTQUFDLE1BQU07MEJBR1osS0FBSyxTQUFDLFNBQVM7NEJBR2xCLEtBQUssU0FBQyxXQUFXOzBCQUdkLEtBQUssU0FBQyxTQUFTOzRCQUdmLEtBQUssU0FBQyxXQUFXOzJCQUdqQixLQUFLLFNBQUMsVUFBVTsyQkFHbkIsS0FBSyxTQUFDLFVBQVU7eUJBR2IsS0FBSyxTQUFDLFFBQVE7dUJBR2QsS0FBSyxTQUFDLE1BQU07MkJBR2YsTUFBTSxTQUFDLFVBQVU7MkJBR2pCLE1BQU0sU0FBQyxVQUFVOzt3Q0FoRm5COztTQXNCYSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBhIHRhYmxlIHdoaWNoIGlzIHVzaW5nIHRoZSBnaXZlbiBGbGV4aWJsZVRhYmxlSGVhZGVyIHNldCBpblxyXG4qIG9yZGVyIHRvIHRhYnVsYXRlIHRoZSBnaXZlbiBkYXRhLiBBcyBwZXIgZGVmaW5pdGlvbiBvZiBlYXJjaCBoZWFkZXIgY29tcG9uZW50LFxyXG4qIGEgY29sdW1uIGNvdWxkIGJlIGhpZGRlbiwgc29ydGFibGUsIG9yIGRyYWdnYWJsZS4gRWFjaCB0YWJsZSByb3cgY2FuIGV4cGFuZC9jb2xsYXBzZVxyXG4qIG9yIHJlc3BvbmQgdG8gYSBjbGljayBhY3Rpb24uXHJcbiovXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdEFmdGVyVmlld0luaXQsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdEVsZW1lbnRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtYXV0by1jb21wbGV0ZScsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0e1xyXG5cclxuXHRwcml2YXRlIGludGVydmFsOiBhbnk7XHJcblxyXG5cdGVudHJ5ID0gXCJcIjtcclxuXHRmaWx0ZXJlZERhdGE6IGFueVtdID0gW107XHJcblxyXG5cdEBJbnB1dChcImZsZXhpYmxlSWRcIilcclxuXHRwdWJsaWMgZmxleGlibGVJZCA9IFwiZmxleGlibGVcIjtcclxuXHRcclxuXHRASW5wdXQoXCJwbGFjZWhvbGRlclwiKVxyXG5cdHB1YmxpYyBwbGFjZWhvbGRlciA9IFwiXCI7XHJcblx0XHJcblx0QElucHV0KFwicmVtb3RlcGF0aFwiKVxyXG5cdHB1YmxpYyByZW1vdGVwYXRoID0gXCJib2R5XCI7XHJcblx0XHJcblx0QElucHV0KFwicHJlZmV0Y2hkYXRhXCIpXHJcblx0cHVibGljIHByZWZldGNoZGF0YSA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dChcImFuaW1hdGVvbnJlc3VsdFwiKVxyXG5cdHB1YmxpYyBhbmltYXRlb25yZXN1bHQgPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoXCJhbGxvd2Ryb3Bkb3duXCIpXHJcblx0cHVibGljIGFsbG93ZHJvcGRvd24gPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoJ2tleW1hcCcpXHJcbiAgICBwdWJsaWMga2V5bWFwOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIEBJbnB1dChcImljb25cIilcclxuICAgIHB1YmxpYyBpY29uID0gXCJcIjtcclxuXHJcbiAgICBASW5wdXQoXCJtZXNzYWdlXCIpXHJcbiAgICBwdWJsaWMgbWVzc2FnZSA9IFwiXCI7XHJcblxyXG5cdEBJbnB1dChcImRpcmVjdGlvblwiKVxyXG4gICAgcHVibGljIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuXHJcbiAgICBASW5wdXQoXCJkZWxheWJ5XCIpXHJcbiAgICBwdWJsaWMgZGVsYXlieSA9IDMwMDtcclxuXHJcbiAgICBASW5wdXQoXCJ0cmlnZ2Vyb25cIilcclxuICAgIHB1YmxpYyB0cmlnZ2Vyb24gPSAyO1xyXG5cclxuICAgIEBJbnB1dChcInZpZXdwb3J0XCIpXHJcbiAgICBwdWJsaWMgdmlld3BvcnQgPSBcIjIwMHB4XCI7XHJcblxyXG5cdEBJbnB1dChcInRlbXBsYXRlXCIpXHJcbiAgICBwdWJsaWMgdGVtcGxhdGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJzb3VyY2VcIilcclxuICAgIHB1YmxpYyBzb3VyY2U6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgICBwdWJsaWMgZGF0YTogYW55O1xyXG5cclxuXHRAT3V0cHV0KFwib25zZWxlY3RcIilcclxuXHRvbnNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0QE91dHB1dChcIm9uc2VhcmNoXCIpXHJcblx0b25zZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cclxuXHRcclxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XHJcblx0XHR0aGlzLnJlc2l6ZShmYWxzZSk7XHJcblx0XHRpZiAodGhpcy5wcmVmZXRjaGRhdGEgJiYgdGhpcy5zb3VyY2UpIHtcclxuXHRcdFx0dGhpcy5odHRwLmdldCh0aGlzLnNvdXJjZSkuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdChyZXN1bHQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSB0aGlzLnRyYXZlcnNlUmVzdWx0KHJlc3VsdCk7XHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB0cmF2ZXJzZVJlc3VsdChyZXNwb25zZSkge1xyXG5cdFx0Y29uc3QgbGlzdCA9IHRoaXMucmVtb3RlcGF0aC5zcGxpdChcIi5cIik7XHJcblx0XHRsaXN0Lm1hcCggKGl0ZW0pID0+IHtcclxuXHRcdFx0cmVzcG9uc2UgPSByZXNwb25zZSA/IHJlc3BvbnNlW2l0ZW1dIDogdW5kZWZpbmVkO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCB4ID0gbGlzdC5sZW5ndGggPyByZXNwb25zZSA6IHVuZGVmaW5lZDtcclxuXHRcdHJldHVybiB4ICYmICh0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKHgpIDogeDtcclxuXHR9XHJcblxyXG5cdGNsaWNrdXAoZXZlbnQsIGl0ZW0sIGksIG1heCkge1xyXG5cdFx0Y29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0XHJcblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RUYWIoIGl0ZW0gKTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMzgpIHsgLy8gYXJyb3cgdXBcclxuXHRcdFx0aWYoaSA+IDApIHtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyBcIi1pdGVtLVwiICsgKCBpIC0gMSkpLmZvY3VzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkKS5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDQwICYmIGkgPCBtYXgpIHsgLy8gYXJyb3cgZG93blxyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyBcIi1pdGVtLVwiICsgKCBpICsgMSkpLmZvY3VzKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByaXZhdGUgcmVzaXplKGZsYWcpIHtcclxuXHRcdGlmICh0aGlzLmFuaW1hdGVvbnJlc3VsdCkge1xyXG5cdFx0XHRpZiAoZmxhZykge1xyXG5cdFx0XHRcdHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGFzLWRhdGFcIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoYXMtZGF0YVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYXMtZGF0YVwiKTtcclxuXHRcdH1cclxuXHR9XHJcblx0a2V5dXAoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEgJiYgdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RUYWIoIHRoaXMuZmlsdGVyZWREYXRhWzBdICk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMzgpIHsgLy8gYXJyb3cgdXBcclxuXHRcdFx0Ly8gZG8gbm90aGluZ1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSA0MCkgeyAvLyBhcnJvdyBkb3duXHJcblx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YSAmJiB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpe1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tMVwiKS5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVudHJ5ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG5cdFx0XHRpZiAodGhpcy5pbnRlcnZhbCkge1xyXG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmludGVydmFsID0gc2V0VGltZW91dCggKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGtleSA9IHRoaXMuZW50cnkudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRpZiAoa2V5Lmxlbmd0aCA+IHRoaXMudHJpZ2dlcm9uKSB7XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMucHJlZmV0Y2hkYXRhICYmIHRoaXMuc291cmNlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaHR0cC5nZXQodGhpcy5zb3VyY2UgKyBrZXkpLnN1YnNjcmliZShcclxuXHRcdFx0XHRcdFx0XHQocmVzdWx0OiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gdGhpcy50cmF2ZXJzZVJlc3VsdChyZXN1bHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZGF0YSA9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5vbnNlYXJjaC5lbWl0KGtleSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKHRydWUpLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmRhdGEpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5maWx0ZXJlZERhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKCAoaXRlbSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGxldCBrZWVwID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IHRoaXMua2V5bWFwLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBrID0gdGhpcy5rZXltYXBbal07XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgdG1wID0gaXRlbVtrXVxyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdiA9IHRtcCA/IHRtcC50b0xvd2VyQ2FzZSgpIDogdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHYgJiYgdi5pbmRleE9mKGtleSkgPj0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRrZWVwID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBrZWVwO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMub25zZWFyY2guZW1pdChrZXkpO1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZSh0cnVlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IFtdO1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgdGhpcy5kZWxheWJ5KTtcclxuXHRcdH1cclxuXHR9XHJcblx0c2VsZWN0VGFiKGl0ZW0pIHtcclxuXHRcdHRoaXMub25zZWxlY3QuZW1pdChpdGVtKTtcclxuXHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHR0aGlzLmVudHJ5ID0gXCJcIjtcclxuXHR9XHJcbn1cclxuIl19