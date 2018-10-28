(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/http'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('flexible-auto-complete', ['exports', '@angular/core', '@angular/http', '@angular/common'], factory) :
    (factory((global['flexible-auto-complete'] = {}),global.ng.core,global.ng.http,global.ng.common));
}(this, (function (exports,core,http,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FlexibleAutoCompleteComponent = (function () {
        function FlexibleAutoCompleteComponent(http$$1, el) {
            this.http = http$$1;
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
            this.onselect = new core.EventEmitter();
            this.onsearch = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'flexible-auto-complete',
                        template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n",
                        styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out;width:100%}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#ff3e58}:host .viewport li:focus{background-color:#3e8bff}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}"]
                    }] }
        ];
        /** @nocollapse */
        FlexibleAutoCompleteComponent.ctorParameters = function () {
            return [
                { type: http.Http },
                { type: core.ElementRef }
            ];
        };
        FlexibleAutoCompleteComponent.propDecorators = {
            flexibleId: [{ type: core.Input, args: ["flexibleId",] }],
            placeholder: [{ type: core.Input, args: ["placeholder",] }],
            remotepath: [{ type: core.Input, args: ["remotepath",] }],
            prefetchdata: [{ type: core.Input, args: ["prefetchdata",] }],
            animateonresult: [{ type: core.Input, args: ["animateonresult",] }],
            allowdropdown: [{ type: core.Input, args: ["allowdropdown",] }],
            keymap: [{ type: core.Input, args: ['keymap',] }],
            icon: [{ type: core.Input, args: ["icon",] }],
            message: [{ type: core.Input, args: ["message",] }],
            direction: [{ type: core.Input, args: ["direction",] }],
            delayby: [{ type: core.Input, args: ["delayby",] }],
            triggeron: [{ type: core.Input, args: ["triggeron",] }],
            viewport: [{ type: core.Input, args: ["viewport",] }],
            template: [{ type: core.Input, args: ["template",] }],
            source: [{ type: core.Input, args: ["source",] }],
            data: [{ type: core.Input, args: ["data",] }],
            onselect: [{ type: core.Output, args: ["onselect",] }],
            onsearch: [{ type: core.Output, args: ["onsearch",] }]
        };
        return FlexibleAutoCompleteComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var FlexibleAutoCompleteModule = (function () {
        function FlexibleAutoCompleteModule() {
        }
        FlexibleAutoCompleteModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            http.HttpModule
                        ],
                        declarations: [
                            FlexibleAutoCompleteComponent
                        ],
                        exports: [
                            FlexibleAutoCompleteComponent
                        ],
                        entryComponents: [],
                        providers: [],
                        schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
                    },] }
        ];
        return FlexibleAutoCompleteModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.FlexibleAutoCompleteComponent = FlexibleAutoCompleteComponent;
    exports.FlexibleAutoCompleteModule = FlexibleAutoCompleteModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUvc3JjL2FwcC9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL3NyYy9hcHAvZmxleGlibGUtYXV0by1jb21wbGV0ZS9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLW1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBhIHRhYmxlIHdoaWNoIGlzIHVzaW5nIHRoZSBnaXZlbiBGbGV4aWJsZVRhYmxlSGVhZGVyIHNldCBpblxyXG4qIG9yZGVyIHRvIHRhYnVsYXRlIHRoZSBnaXZlbiBkYXRhLiBBcyBwZXIgZGVmaW5pdGlvbiBvZiBlYXJjaCBoZWFkZXIgY29tcG9uZW50LFxyXG4qIGEgY29sdW1uIGNvdWxkIGJlIGhpZGRlbiwgc29ydGFibGUsIG9yIGRyYWdnYWJsZS4gRWFjaCB0YWJsZSByb3cgY2FuIGV4cGFuZC9jb2xsYXBzZVxyXG4qIG9yIHJlc3BvbmQgdG8gYSBjbGljayBhY3Rpb24uXHJcbiovXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdEFmdGVyVmlld0luaXQsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdEVsZW1lbnRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtYXV0by1jb21wbGV0ZScsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0e1xyXG5cclxuXHRwcml2YXRlIGludGVydmFsOiBhbnk7XHJcblxyXG5cdGVudHJ5ID0gXCJcIjtcclxuXHRmaWx0ZXJlZERhdGE6IGFueVtdID0gW107XHJcblxyXG5cdEBJbnB1dChcImZsZXhpYmxlSWRcIilcclxuXHRwdWJsaWMgZmxleGlibGVJZCA9IFwiZmxleGlibGVcIjtcclxuXHRcclxuXHRASW5wdXQoXCJwbGFjZWhvbGRlclwiKVxyXG5cdHB1YmxpYyBwbGFjZWhvbGRlciA9IFwiXCI7XHJcblx0XHJcblx0QElucHV0KFwicmVtb3RlcGF0aFwiKVxyXG5cdHB1YmxpYyByZW1vdGVwYXRoID0gXCJib2R5XCI7XHJcblx0XHJcblx0QElucHV0KFwicHJlZmV0Y2hkYXRhXCIpXHJcblx0cHVibGljIHByZWZldGNoZGF0YSA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dChcImFuaW1hdGVvbnJlc3VsdFwiKVxyXG5cdHB1YmxpYyBhbmltYXRlb25yZXN1bHQgPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoXCJhbGxvd2Ryb3Bkb3duXCIpXHJcblx0cHVibGljIGFsbG93ZHJvcGRvd24gPSBmYWxzZTtcclxuXHRcclxuXHRASW5wdXQoJ2tleW1hcCcpXHJcbiAgICBwdWJsaWMga2V5bWFwOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIEBJbnB1dChcImljb25cIilcclxuICAgIHB1YmxpYyBpY29uID0gXCJcIjtcclxuXHJcbiAgICBASW5wdXQoXCJtZXNzYWdlXCIpXHJcbiAgICBwdWJsaWMgbWVzc2FnZSA9IFwiXCI7XHJcblxyXG5cdEBJbnB1dChcImRpcmVjdGlvblwiKVxyXG4gICAgcHVibGljIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuXHJcbiAgICBASW5wdXQoXCJkZWxheWJ5XCIpXHJcbiAgICBwdWJsaWMgZGVsYXlieSA9IDMwMDtcclxuXHJcbiAgICBASW5wdXQoXCJ0cmlnZ2Vyb25cIilcclxuICAgIHB1YmxpYyB0cmlnZ2Vyb24gPSAyO1xyXG5cclxuICAgIEBJbnB1dChcInZpZXdwb3J0XCIpXHJcbiAgICBwdWJsaWMgdmlld3BvcnQgPSBcIjIwMHB4XCI7XHJcblxyXG5cdEBJbnB1dChcInRlbXBsYXRlXCIpXHJcbiAgICBwdWJsaWMgdGVtcGxhdGU6IGFueTtcclxuXHJcbiAgICBASW5wdXQoXCJzb3VyY2VcIilcclxuICAgIHB1YmxpYyBzb3VyY2U6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoXCJkYXRhXCIpXHJcbiAgICBwdWJsaWMgZGF0YTogYW55O1xyXG5cclxuXHRAT3V0cHV0KFwib25zZWxlY3RcIilcclxuXHRvbnNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0QE91dHB1dChcIm9uc2VhcmNoXCIpXHJcblx0b25zZWFyY2ggPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cCwgcHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cclxuXHRcclxuXHRuZ0FmdGVyVmlld0luaXQoKSB7XHJcblx0XHR0aGlzLnJlc2l6ZShmYWxzZSk7XHJcblx0XHRpZiAodGhpcy5wcmVmZXRjaGRhdGEgJiYgdGhpcy5zb3VyY2UpIHtcclxuXHRcdFx0dGhpcy5odHRwLmdldCh0aGlzLnNvdXJjZSkuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdChyZXN1bHQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSB0aGlzLnRyYXZlcnNlUmVzdWx0KHJlc3VsdCk7XHJcblx0XHRcdFx0XHRpZiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB0cmF2ZXJzZVJlc3VsdChyZXNwb25zZSkge1xyXG5cdFx0Y29uc3QgbGlzdCA9IHRoaXMucmVtb3RlcGF0aC5zcGxpdChcIi5cIik7XHJcblx0XHRsaXN0Lm1hcCggKGl0ZW0pID0+IHtcclxuXHRcdFx0cmVzcG9uc2UgPSByZXNwb25zZSA/IHJlc3BvbnNlW2l0ZW1dIDogdW5kZWZpbmVkO1xyXG5cdFx0fSk7XHJcblx0XHRjb25zdCB4ID0gbGlzdC5sZW5ndGggPyByZXNwb25zZSA6IHVuZGVmaW5lZDtcclxuXHRcdHJldHVybiB4ICYmICh0eXBlb2YgeCA9PT0gXCJzdHJpbmdcIikgPyBKU09OLnBhcnNlKHgpIDogeDtcclxuXHR9XHJcblxyXG5cdGNsaWNrdXAoZXZlbnQsIGl0ZW0sIGksIG1heCkge1xyXG5cdFx0Y29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xyXG5cdFx0XHJcblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcclxuXHRcdFx0dGhpcy5zZWxlY3RUYWIoIGl0ZW0gKTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMzgpIHsgLy8gYXJyb3cgdXBcclxuXHRcdFx0aWYoaSA+IDApIHtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyBcIi1pdGVtLVwiICsgKCBpIC0gMSkpLmZvY3VzKCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkKS5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDQwICYmIGkgPCBtYXgpIHsgLy8gYXJyb3cgZG93blxyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQgKyBcIi1pdGVtLVwiICsgKCBpICsgMSkpLmZvY3VzKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByaXZhdGUgcmVzaXplKGZsYWcpIHtcclxuXHRcdGlmICh0aGlzLmFuaW1hdGVvbnJlc3VsdCkge1xyXG5cdFx0XHRpZiAoZmxhZykge1xyXG5cdFx0XHRcdHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGFzLWRhdGFcIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoYXMtZGF0YVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYXMtZGF0YVwiKTtcclxuXHRcdH1cclxuXHR9XHJcblx0a2V5dXAoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEgJiYgdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RUYWIoIHRoaXMuZmlsdGVyZWREYXRhWzBdICk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gMzgpIHsgLy8gYXJyb3cgdXBcclxuXHRcdFx0Ly8gZG8gbm90aGluZ1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSA0MCkgeyAvLyBhcnJvdyBkb3duXHJcblx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YSAmJiB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpe1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tMVwiKS5mb2N1cygpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVudHJ5ID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG5cdFx0XHRpZiAodGhpcy5pbnRlcnZhbCkge1xyXG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aGlzLmludGVydmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmludGVydmFsID0gc2V0VGltZW91dCggKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGtleSA9IHRoaXMuZW50cnkudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRpZiAoa2V5Lmxlbmd0aCA+IHRoaXMudHJpZ2dlcm9uKSB7XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMucHJlZmV0Y2hkYXRhICYmIHRoaXMuc291cmNlKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuaHR0cC5nZXQodGhpcy5zb3VyY2UgKyBrZXkpLnN1YnNjcmliZShcclxuXHRcdFx0XHRcdFx0XHQocmVzdWx0OiBhbnkpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gdGhpcy50cmF2ZXJzZVJlc3VsdChyZXN1bHQpO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZGF0YSA9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHJlc3BvbnNlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5vbnNlYXJjaC5lbWl0KGtleSk7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKHRydWUpLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHQpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmRhdGEpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5maWx0ZXJlZERhdGEgPSB0aGlzLmRhdGEuZmlsdGVyKCAoaXRlbSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGxldCBrZWVwID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IHRoaXMua2V5bWFwLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBrID0gdGhpcy5rZXltYXBbal07XHJcblx0XHRcdFx0XHRcdFx0XHRsZXQgdG1wID0gaXRlbVtrXVxyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgdiA9IHRtcCA/IHRtcC50b0xvd2VyQ2FzZSgpIDogdW5kZWZpbmVkO1xyXG5cdFx0XHRcdFx0XHRcdFx0aWYgKHYgJiYgdi5pbmRleE9mKGtleSkgPj0gMCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRrZWVwID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdHJldHVybiBrZWVwO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRcdHRoaXMub25zZWFyY2guZW1pdChrZXkpO1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZSh0cnVlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IFtdO1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgdGhpcy5kZWxheWJ5KTtcclxuXHRcdH1cclxuXHR9XHJcblx0c2VsZWN0VGFiKGl0ZW0pIHtcclxuXHRcdHRoaXMub25zZWxlY3QuZW1pdChpdGVtKTtcclxuXHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHR0aGlzLmVudHJ5ID0gXCJcIjtcclxuXHR9XHJcbn1cclxuIiwiLypcclxuKiBQcm92aWRlcyByZW5kZXJpbmcgb2YgZmxleGlibGUgdGFicyBpbiBhIGxhenkgbG9hZCBmYXNoaW9uLlxyXG4qL1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBGbGV4aWJsZUF1dG9Db21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgSHR0cE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEZsZXhpYmxlQXV0b0NvbXBsZXRlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIEZsZXhpYmxlQXV0b0NvbXBsZXRlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVBdXRvQ29tcGxldGVNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbImh0dHAiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJIdHRwIiwiRWxlbWVudFJlZiIsIklucHV0IiwiT3V0cHV0IiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJIdHRwTW9kdWxlIiwiQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU1BO1FBNkVDLHVDQUFvQkEsT0FBVSxFQUFVLEVBQWM7WUFBbEMsU0FBSSxHQUFKQSxPQUFJLENBQU07WUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFZO3lCQXpEOUMsRUFBRTtnQ0FDWSxFQUFFOzhCQUdKLFVBQVU7K0JBR1QsRUFBRTs4QkFHSCxNQUFNO2dDQUdKLEtBQUs7bUNBR0YsS0FBSztpQ0FHUCxLQUFLOzBCQUdGLEVBQUU7d0JBR1gsRUFBRTsyQkFHQyxFQUFFOzZCQUdBLFVBQVU7MkJBR1osR0FBRzs2QkFHRCxDQUFDOzRCQUdGLE9BQU87NEJBWWpCLElBQUlDLGlCQUFZLEVBQUU7NEJBR2xCLElBQUlBLGlCQUFZLEVBQUU7U0FFNkI7Ozs7UUFFMUQsdURBQWU7OztZQUFmO2dCQUFBLGlCQVlDO2dCQVhBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUNuQyxVQUFDLE1BQVc7O3dCQUNYLElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzdDLElBQUksUUFBUSxFQUFFOzRCQUNiLEtBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO3lCQUNyQjtxQkFDRCxDQUNELENBQUM7aUJBQ0Y7YUFDRDs7Ozs7UUFFTyxzREFBYzs7OztzQkFBQyxRQUFROztnQkFD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