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
        else if (code === 38 && i > 0) {
            // arrow up
            document.getElementById("item" + (i - 1)).focus();
        }
        else if (code === 40 && i < max) {
            // arrow down
            document.getElementById("item" + (i + 1)).focus();
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
                    template: "\r\n<label for=\"\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"'item' + i\" \r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n",
                    styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out;width:100%}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#ff3e58}:host .viewport li:focus{background-color:#3e8bff}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}"]
                }] }
    ];
    /** @nocollapse */
    FlexibleAutoCompleteComponent.ctorParameters = function () { return [
        { type: Http },
        { type: ElementRef }
    ]; };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSxPQUFPLEVBQ0gsU0FBUyxFQUNaLEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLFVBQVUsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQWlFcEMsdUNBQW9CLElBQVUsRUFBVSxFQUFjO1FBQWxDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO3FCQXREOUMsRUFBRTs0QkFDWSxFQUFFOzJCQUdILEVBQUU7MEJBR0gsTUFBTTs0QkFHSixLQUFLOytCQUdGLEtBQUs7NkJBR1AsS0FBSztzQkFHRixFQUFFO29CQUdYLEVBQUU7dUJBR0MsRUFBRTt5QkFHQSxVQUFVO3VCQUdaLEdBQUc7eUJBR0QsQ0FBQzt3QkFHRixPQUFPO3dCQVlqQixJQUFJLFlBQVksRUFBRTt3QkFHbEIsSUFBSSxZQUFZLEVBQUU7S0FFNkI7Ozs7SUFFMUQsdURBQWU7OztJQUFmO1FBQUEsaUJBWUM7UUFYQSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FDbkMsVUFBQyxNQUFXOztnQkFDWCxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFD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UTt1QkFHWCxLQUFLLFNBQUMsTUFBTTswQkFHWixLQUFLLFNBQUMsU0FBUzs0QkFHbEIsS0FBSyxTQUFDLFdBQVc7MEJBR2QsS0FBSyxTQUFDLFNBQVM7NEJBR2YsS0FBSyxTQUFDLFdBQVc7MkJBR2pCLEtBQUssU0FBQyxVQUFVOzJCQUduQixLQUFLLFNBQUMsVUFBVTt5QkFHYixLQUFLLFNBQUMsUUFBUTt1QkFHZCxLQUFLLFNBQUMsTUFBTTsyQkFHZixNQUFNLFNBQUMsVUFBVTsyQkFHakIsTUFBTSxTQUFDLFVBQVU7O3dDQTdFbkI7O1NBc0JhLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGEgdGFibGUgd2hpY2ggaXMgdXNpbmcgdGhlIGdpdmVuIEZsZXhpYmxlVGFibGVIZWFkZXIgc2V0IGluXHJcbiogb3JkZXIgdG8gdGFidWxhdGUgdGhlIGdpdmVuIGRhdGEuIEFzIHBlciBkZWZpbml0aW9uIG9mIGVhcmNoIGhlYWRlciBjb21wb25lbnQsXHJcbiogYSBjb2x1bW4gY291bGQgYmUgaGlkZGVuLCBzb3J0YWJsZSwgb3IgZHJhZ2dhYmxlLiBFYWNoIHRhYmxlIHJvdyBjYW4gZXhwYW5kL2NvbGxhcHNlXHJcbiogb3IgcmVzcG9uZCB0byBhIGNsaWNrIGFjdGlvbi5cclxuKi9cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0QWZ0ZXJWaWV3SW5pdCxcclxuXHRFdmVudEVtaXR0ZXIsXHJcblx0RWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS1hdXRvLWNvbXBsZXRlJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZUF1dG9Db21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXR7XHJcblxyXG5cdHByaXZhdGUgaW50ZXJ2YWw6IGFueTtcclxuXHJcblx0ZW50cnkgPSBcIlwiO1xyXG5cdGZpbHRlcmVkRGF0YTogYW55W10gPSBbXTtcclxuXHJcblx0QElucHV0KFwicGxhY2Vob2xkZXJcIilcclxuXHRwdWJsaWMgcGxhY2Vob2xkZXIgPSBcIlwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInJlbW90ZXBhdGhcIilcclxuXHRwdWJsaWMgcmVtb3RlcGF0aCA9IFwiYm9keVwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInByZWZldGNoZGF0YVwiKVxyXG5cdHB1YmxpYyBwcmVmZXRjaGRhdGEgPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoXCJhbmltYXRlb25yZXN1bHRcIilcclxuXHRwdWJsaWMgYW5pbWF0ZW9ucmVzdWx0ID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KFwiYWxsb3dkcm9wZG93blwiKVxyXG5cdHB1YmxpYyBhbGxvd2Ryb3Bkb3duID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KCdrZXltYXAnKVxyXG4gICAgcHVibGljIGtleW1hcDogYW55W10gPSBbXTtcclxuXHJcbiAgICBASW5wdXQoXCJpY29uXCIpXHJcbiAgICBwdWJsaWMgaWNvbiA9IFwiXCI7XHJcblxyXG4gICAgQElucHV0KFwibWVzc2FnZVwiKVxyXG4gICAgcHVibGljIG1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuXHRASW5wdXQoXCJkaXJlY3Rpb25cIilcclxuICAgIHB1YmxpYyBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XHJcblxyXG4gICAgQElucHV0KFwiZGVsYXlieVwiKVxyXG4gICAgcHVibGljIGRlbGF5YnkgPSAzMDA7XHJcblxyXG4gICAgQElucHV0KFwidHJpZ2dlcm9uXCIpXHJcbiAgICBwdWJsaWMgdHJpZ2dlcm9uID0gMjtcclxuXHJcbiAgICBASW5wdXQoXCJ2aWV3cG9ydFwiKVxyXG4gICAgcHVibGljIHZpZXdwb3J0ID0gXCIyMDBweFwiO1xyXG5cclxuXHRASW5wdXQoXCJ0ZW1wbGF0ZVwiKVxyXG4gICAgcHVibGljIHRlbXBsYXRlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwic291cmNlXCIpXHJcbiAgICBwdWJsaWMgc291cmNlOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwiZGF0YVwiKVxyXG4gICAgcHVibGljIGRhdGE6IGFueTtcclxuXHJcblx0QE91dHB1dChcIm9uc2VsZWN0XCIpXHJcblx0b25zZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdEBPdXRwdXQoXCJvbnNlYXJjaFwiKVxyXG5cdG9uc2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XHJcblx0XHJcblx0bmdBZnRlclZpZXdJbml0KCkge1xyXG5cdFx0dGhpcy5yZXNpemUoZmFsc2UpO1xyXG5cdFx0aWYgKHRoaXMucHJlZmV0Y2hkYXRhICYmIHRoaXMuc291cmNlKSB7XHJcblx0XHRcdHRoaXMuaHR0cC5nZXQodGhpcy5zb3VyY2UpLnN1YnNjcmliZShcclxuXHRcdFx0XHQocmVzdWx0OiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gdGhpcy50cmF2ZXJzZVJlc3VsdChyZXN1bHQpO1xyXG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGF0YSA9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdHJhdmVyc2VSZXN1bHQocmVzcG9uc2UpIHtcclxuXHRcdGNvbnN0IGxpc3QgPSB0aGlzLnJlbW90ZXBhdGguc3BsaXQoXCIuXCIpO1xyXG5cdFx0bGlzdC5tYXAoIChpdGVtKSA9PiB7XHJcblx0XHRcdHJlc3BvbnNlID0gcmVzcG9uc2UgPyByZXNwb25zZVtpdGVtXSA6IHVuZGVmaW5lZDtcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3QgeCA9IGxpc3QubGVuZ3RoID8gcmVzcG9uc2UgOiB1bmRlZmluZWQ7XHJcblx0XHRyZXR1cm4geCAmJiAodHlwZW9mIHggPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZSh4KSA6IHg7XHJcblx0fVxyXG5cclxuXHRjbGlja3VwKGV2ZW50LCBpdGVtLCBpLCBtYXgpIHtcclxuXHRcdGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0VGFiKCBpdGVtICk7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDM4ICYmIGk+MCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIml0ZW1cIiArICggaSAtIDEpKS5mb2N1cygpO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSA0MCAmJiBpIDwgbWF4KSB7IC8vIGFycm93IGRvd25cclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpdGVtXCIgKyAoIGkgKyAxKSkuZm9jdXMoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHJpdmF0ZSByZXNpemUoZmxhZykge1xyXG5cdFx0aWYgKHRoaXMuYW5pbWF0ZW9ucmVzdWx0KSB7XHJcblx0XHRcdGlmIChmbGFnKSB7XHJcblx0XHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYXMtZGF0YVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhhcy1kYXRhXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhhcy1kYXRhXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRrZXl1cChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YSAmJiB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdFRhYiggdGhpcy5maWx0ZXJlZERhdGFbMF0gKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5lbnRyeSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuXHRcdFx0aWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5pbnRlcnZhbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5pbnRlcnZhbCA9IHNldFRpbWVvdXQoICgpID0+IHtcclxuXHRcdFx0XHRjb25zdCBrZXkgPSB0aGlzLmVudHJ5LnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0aWYgKGtleS5sZW5ndGggPiB0aGlzLnRyaWdnZXJvbikge1xyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLnByZWZldGNoZGF0YSAmJiB0aGlzLnNvdXJjZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmh0dHAuZ2V0KHRoaXMuc291cmNlICsga2V5KS5zdWJzY3JpYmUoXHJcblx0XHRcdFx0XHRcdFx0KHJlc3VsdDogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IHRoaXMudHJhdmVyc2VSZXN1bHQocmVzdWx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmRhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5maWx0ZXJlZERhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMub25zZWFyY2guZW1pdChrZXkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZSh0cnVlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5kYXRhKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gdGhpcy5kYXRhLmZpbHRlciggKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRcdFx0XHRsZXQga2VlcCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmtleW1hcC5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgayA9IHRoaXMua2V5bWFwW2pdO1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHRtcCA9IGl0ZW1ba11cclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHYgPSB0bXAgPyB0bXAudG9Mb3dlckNhc2UoKSA6IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh2ICYmIHYuaW5kZXhPZihrZXkpID49IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0a2VlcCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4ga2VlcDtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLm9uc2VhcmNoLmVtaXQoa2V5KTtcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5maWx0ZXJlZERhdGEgPSBbXTtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIHRoaXMuZGVsYXlieSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpdGVtKSB7XHJcblx0XHR0aGlzLm9uc2VsZWN0LmVtaXQoaXRlbSk7XHJcblx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IFtdO1xyXG5cdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0dGhpcy5lbnRyeSA9IFwiXCI7XHJcblx0fVxyXG59XHJcbiJdfQ==