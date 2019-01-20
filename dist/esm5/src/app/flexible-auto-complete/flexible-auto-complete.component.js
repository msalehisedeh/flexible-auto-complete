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
                document.getElementById(this.flexibleId + "-item-0").focus();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZmxleGlibGUtYXV0by1jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZmxleGlibGUtYXV0by1jb21wbGV0ZS9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUNILFNBQVMsRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFvRXBDLHVDQUFvQixJQUFVLEVBQVUsRUFBYztRQUFsQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtxQkF6RDlDLEVBQUU7NEJBQ1ksRUFBRTswQkFHSixVQUFVOzJCQUdULEVBQUU7MEJBR0gsTUFBTTs0QkFHSixLQUFLOytCQUdGLEtBQUs7NkJBR1AsS0FBSztzQkFHRixFQUFFO29CQUdYLEVBQUU7dUJBR0MsRUFBRTt5QkFHQSxVQUFVO3VCQUdaLEdBQUc7eUJBR0QsQ0FBQzt3QkFHRixPQUFPO3dCQVlqQixJQUFJLFlBQVksRUFBRTt3QkFHbEIsSUFBSSxZQUFZLEVBQUU7S0FFNkI7Ozs7SUFFMUQsdURBQWU7OztJQUFmO1FBQUEsaUJBWUM7UUFYQSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FDbkMsVUFBQyxNQUFXOztnQkFDWCxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsY0FBYyxD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Ozs7OztJQUNELGlEQUFTOzs7O0lBQVQsVUFBVSxJQUFJO1FBQWQsaUJBS0M7UUFKQSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixVQUFVLENBQUMsY0FBSyxPQUFBLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQWxCLENBQWtCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDaEI7O2dCQTNMRCxTQUFTLFNBQUM7b0JBQ1YsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsbXNEQUFzRDs7aUJBRXREOzs7O2dCQU5RLElBQUk7Z0JBSFosVUFBVTs7OzZCQWlCVCxLQUFLLFNBQUMsWUFBWTs4QkFHbEIsS0FBSyxTQUFDLGFBQWE7NkJBR25CLEtBQUssU0FBQyxZQUFZOytCQUdsQixLQUFLLFNBQUMsY0FBYztrQ0FHcEIsS0FBSyxTQUFDLGlCQUFpQjtnQ0FHdkIsS0FBSyxTQUFDLGVBQWU7eUJBR3JCLEtBQUssU0FBQyxRQUFRO3VCQUdYLEtBQUssU0FBQyxNQUFNOzBCQUdaLEtBQUssU0FBQyxTQUFTOzRCQUdsQixLQUFLLFNBQUMsV0FBVzswQkFHZCxLQUFLLFNBQUMsU0FBUzs0QkFHZixLQUFLLFNBQUMsV0FBVzsyQkFHakIsS0FBSyxTQUFDLFVBQVU7MkJBR25CLEtBQUssU0FBQyxVQUFVO3lCQUdiLEtBQUssU0FBQyxRQUFRO3VCQUdkLEtBQUssU0FBQyxNQUFNOzJCQUdmLE1BQU0sU0FBQyxVQUFVOzJCQUdqQixNQUFNLFNBQUMsVUFBVTs7d0NBaEZuQjs7U0FzQmEsNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuKiBQcm92aWRlcyByZW5kZXJpbmcgb2YgYSB0YWJsZSB3aGljaCBpcyB1c2luZyB0aGUgZ2l2ZW4gRmxleGlibGVUYWJsZUhlYWRlciBzZXQgaW5cclxuKiBvcmRlciB0byB0YWJ1bGF0ZSB0aGUgZ2l2ZW4gZGF0YS4gQXMgcGVyIGRlZmluaXRpb24gb2YgZWFyY2ggaGVhZGVyIGNvbXBvbmVudCxcclxuKiBhIGNvbHVtbiBjb3VsZCBiZSBoaWRkZW4sIHNvcnRhYmxlLCBvciBkcmFnZ2FibGUuIEVhY2ggdGFibGUgcm93IGNhbiBleHBhbmQvY29sbGFwc2VcclxuKiBvciByZXNwb25kIHRvIGEgY2xpY2sgYWN0aW9uLlxyXG4qL1xyXG5pbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LFxyXG5cdElucHV0LFxyXG5cdE91dHB1dCxcclxuXHRBZnRlclZpZXdJbml0LFxyXG5cdEV2ZW50RW1pdHRlcixcclxuXHRFbGVtZW50UmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogJ2ZsZXhpYmxlLWF1dG8tY29tcGxldGUnLFxyXG5cdHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLmNvbXBvbmVudC5odG1sJyxcclxuXHRzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlQXV0b0NvbXBsZXRlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdHtcclxuXHJcblx0cHJpdmF0ZSBpbnRlcnZhbDogYW55O1xyXG5cclxuXHRlbnRyeSA9IFwiXCI7XHJcblx0ZmlsdGVyZWREYXRhOiBhbnlbXSA9IFtdO1xyXG5cclxuXHRASW5wdXQoXCJmbGV4aWJsZUlkXCIpXHJcblx0cHVibGljIGZsZXhpYmxlSWQgPSBcImZsZXhpYmxlXCI7XHJcblx0XHJcblx0QElucHV0KFwicGxhY2Vob2xkZXJcIilcclxuXHRwdWJsaWMgcGxhY2Vob2xkZXIgPSBcIlwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInJlbW90ZXBhdGhcIilcclxuXHRwdWJsaWMgcmVtb3RlcGF0aCA9IFwiYm9keVwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInByZWZldGNoZGF0YVwiKVxyXG5cdHB1YmxpYyBwcmVmZXRjaGRhdGEgPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoXCJhbmltYXRlb25yZXN1bHRcIilcclxuXHRwdWJsaWMgYW5pbWF0ZW9ucmVzdWx0ID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KFwiYWxsb3dkcm9wZG93blwiKVxyXG5cdHB1YmxpYyBhbGxvd2Ryb3Bkb3duID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KCdrZXltYXAnKVxyXG4gICAgcHVibGljIGtleW1hcDogYW55W10gPSBbXTtcclxuXHJcbiAgICBASW5wdXQoXCJpY29uXCIpXHJcbiAgICBwdWJsaWMgaWNvbiA9IFwiXCI7XHJcblxyXG4gICAgQElucHV0KFwibWVzc2FnZVwiKVxyXG4gICAgcHVibGljIG1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuXHRASW5wdXQoXCJkaXJlY3Rpb25cIilcclxuICAgIHB1YmxpYyBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XHJcblxyXG4gICAgQElucHV0KFwiZGVsYXlieVwiKVxyXG4gICAgcHVibGljIGRlbGF5YnkgPSAzMDA7XHJcblxyXG4gICAgQElucHV0KFwidHJpZ2dlcm9uXCIpXHJcbiAgICBwdWJsaWMgdHJpZ2dlcm9uID0gMjtcclxuXHJcbiAgICBASW5wdXQoXCJ2aWV3cG9ydFwiKVxyXG4gICAgcHVibGljIHZpZXdwb3J0ID0gXCIyMDBweFwiO1xyXG5cclxuXHRASW5wdXQoXCJ0ZW1wbGF0ZVwiKVxyXG4gICAgcHVibGljIHRlbXBsYXRlOiBhbnk7XHJcblxyXG4gICAgQElucHV0KFwic291cmNlXCIpXHJcbiAgICBwdWJsaWMgc291cmNlOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KFwiZGF0YVwiKVxyXG4gICAgcHVibGljIGRhdGE6IGFueTtcclxuXHJcblx0QE91dHB1dChcIm9uc2VsZWN0XCIpXHJcblx0b25zZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdEBPdXRwdXQoXCJvbnNlYXJjaFwiKVxyXG5cdG9uc2VhcmNoID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHAsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XHJcblx0XHJcblx0bmdBZnRlclZpZXdJbml0KCkge1xyXG5cdFx0dGhpcy5yZXNpemUoZmFsc2UpO1xyXG5cdFx0aWYgKHRoaXMucHJlZmV0Y2hkYXRhICYmIHRoaXMuc291cmNlKSB7XHJcblx0XHRcdHRoaXMuaHR0cC5nZXQodGhpcy5zb3VyY2UpLnN1YnNjcmliZShcclxuXHRcdFx0XHQocmVzdWx0OiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gdGhpcy50cmF2ZXJzZVJlc3VsdChyZXN1bHQpO1xyXG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZGF0YSA9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgdHJhdmVyc2VSZXN1bHQocmVzcG9uc2UpIHtcclxuXHRcdGNvbnN0IGxpc3QgPSB0aGlzLnJlbW90ZXBhdGguc3BsaXQoXCIuXCIpO1xyXG5cdFx0bGlzdC5tYXAoIChpdGVtKSA9PiB7XHJcblx0XHRcdHJlc3BvbnNlID0gcmVzcG9uc2UgPyByZXNwb25zZVtpdGVtXSA6IHVuZGVmaW5lZDtcclxuXHRcdH0pO1xyXG5cdFx0Y29uc3QgeCA9IGxpc3QubGVuZ3RoID8gcmVzcG9uc2UgOiB1bmRlZmluZWQ7XHJcblx0XHRyZXR1cm4geCAmJiAodHlwZW9mIHggPT09IFwic3RyaW5nXCIpID8gSlNPTi5wYXJzZSh4KSA6IHg7XHJcblx0fVxyXG5cclxuXHRjbGlja3VwKGV2ZW50LCBpdGVtLCBpLCBtYXgpIHtcclxuXHRcdGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0VGFiKCBpdGVtICk7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDM4KSB7IC8vIGFycm93IHVwXHJcblx0XHRcdGlmKGkgPiAwKSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgXCItaXRlbS1cIiArICggaSAtIDEpKS5mb2N1cygpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCkuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSA0MCAmJiBpIDwgbWF4KSB7IC8vIGFycm93IGRvd25cclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgXCItaXRlbS1cIiArICggaSArIDEpKS5mb2N1cygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRwcml2YXRlIHJlc2l6ZShmbGFnKSB7XHJcblx0XHRpZiAodGhpcy5hbmltYXRlb25yZXN1bHQpIHtcclxuXHRcdFx0aWYgKGZsYWcpIHtcclxuXHRcdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhhcy1kYXRhXCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaGFzLWRhdGFcIik7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGFzLWRhdGFcIik7XHJcblx0XHR9XHJcblx0fVxyXG5cdGtleXVwKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0XHJcblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcclxuXHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhICYmIHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRcdHRoaXMuc2VsZWN0VGFiKCB0aGlzLmZpbHRlcmVkRGF0YVswXSApO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDM4KSB7IC8vIGFycm93IHVwXHJcblx0XHRcdC8vIGRvIG5vdGhpbmdcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gNDApIHsgLy8gYXJyb3cgZG93blxyXG5cdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEgJiYgdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKXtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyBcIi1pdGVtLTBcIikuZm9jdXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5lbnRyeSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuXHRcdFx0aWYgKHRoaXMuaW50ZXJ2YWwpIHtcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5pbnRlcnZhbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5pbnRlcnZhbCA9IHNldFRpbWVvdXQoICgpID0+IHtcclxuXHRcdFx0XHRjb25zdCBrZXkgPSB0aGlzLmVudHJ5LnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0aWYgKGtleS5sZW5ndGggPiB0aGlzLnRyaWdnZXJvbikge1xyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLnByZWZldGNoZGF0YSAmJiB0aGlzLnNvdXJjZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmh0dHAuZ2V0KHRoaXMuc291cmNlICsga2V5KS5zdWJzY3JpYmUoXHJcblx0XHRcdFx0XHRcdFx0KHJlc3VsdDogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IHRoaXMudHJhdmVyc2VSZXN1bHQocmVzdWx0KTtcclxuXHRcdFx0XHRcdFx0XHRcdGlmIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmRhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5maWx0ZXJlZERhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMub25zZWFyY2guZW1pdChrZXkpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZSh0cnVlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0KTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5kYXRhKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gdGhpcy5kYXRhLmZpbHRlciggKGl0ZW0pID0+IHtcclxuXHRcdFx0XHRcdFx0XHRsZXQga2VlcCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmtleW1hcC5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgayA9IHRoaXMua2V5bWFwW2pdO1xyXG5cdFx0XHRcdFx0XHRcdFx0bGV0IHRtcCA9IGl0ZW1ba11cclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHYgPSB0bXAgPyB0bXAudG9Mb3dlckNhc2UoKSA6IHVuZGVmaW5lZDtcclxuXHRcdFx0XHRcdFx0XHRcdGlmICh2ICYmIHYuaW5kZXhPZihrZXkpID49IDApIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0a2VlcCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4ga2VlcDtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHR0aGlzLm9uc2VhcmNoLmVtaXQoa2V5KTtcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5maWx0ZXJlZERhdGEgPSBbXTtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIHRoaXMuZGVsYXlieSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHNlbGVjdFRhYihpdGVtKSB7XHJcblx0XHR0aGlzLm9uc2VsZWN0LmVtaXQoaXRlbSk7XHJcblx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IFtdO1xyXG5cdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0dGhpcy5lbnRyeSA9IFwiXCI7XHJcblx0fVxyXG59XHJcbiJdfQ==