(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/http'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/flexible-auto-complete', ['exports', '@angular/core', '@angular/http', '@angular/common'], factory) :
    (factory((global.sedeh = global.sedeh || {}, global.sedeh['flexible-auto-complete'] = {}),global.ng.core,global.ng.http,global.ng.common));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtZmxleGlibGUtYXV0by1jb21wbGV0ZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzZWRlaC9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL3NyYy9hcHAvZmxleGlibGUtYXV0by1jb21wbGV0ZS9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLmNvbXBvbmVudC50cyIsIm5nOi8vQHNlZGVoL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUvc3JjL2FwcC9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUtbW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiogUHJvdmlkZXMgcmVuZGVyaW5nIG9mIGEgdGFibGUgd2hpY2ggaXMgdXNpbmcgdGhlIGdpdmVuIEZsZXhpYmxlVGFibGVIZWFkZXIgc2V0IGluXHJcbiogb3JkZXIgdG8gdGFidWxhdGUgdGhlIGdpdmVuIGRhdGEuIEFzIHBlciBkZWZpbml0aW9uIG9mIGVhcmNoIGhlYWRlciBjb21wb25lbnQsXHJcbiogYSBjb2x1bW4gY291bGQgYmUgaGlkZGVuLCBzb3J0YWJsZSwgb3IgZHJhZ2dhYmxlLiBFYWNoIHRhYmxlIHJvdyBjYW4gZXhwYW5kL2NvbGxhcHNlXHJcbiogb3IgcmVzcG9uZCB0byBhIGNsaWNrIGFjdGlvbi5cclxuKi9cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0QWZ0ZXJWaWV3SW5pdCxcclxuXHRFdmVudEVtaXR0ZXIsXHJcblx0RWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS1hdXRvLWNvbXBsZXRlJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZUF1dG9Db21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXR7XHJcblxyXG5cdHByaXZhdGUgaW50ZXJ2YWw6IGFueTtcclxuXHJcblx0ZW50cnkgPSBcIlwiO1xyXG5cdGZpbHRlcmVkRGF0YTogYW55W10gPSBbXTtcclxuXHJcblx0QElucHV0KFwiZmxleGlibGVJZFwiKVxyXG5cdHB1YmxpYyBmbGV4aWJsZUlkID0gXCJmbGV4aWJsZVwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInBsYWNlaG9sZGVyXCIpXHJcblx0cHVibGljIHBsYWNlaG9sZGVyID0gXCJcIjtcclxuXHRcclxuXHRASW5wdXQoXCJyZW1vdGVwYXRoXCIpXHJcblx0cHVibGljIHJlbW90ZXBhdGggPSBcImJvZHlcIjtcclxuXHRcclxuXHRASW5wdXQoXCJwcmVmZXRjaGRhdGFcIilcclxuXHRwdWJsaWMgcHJlZmV0Y2hkYXRhID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KFwiYW5pbWF0ZW9ucmVzdWx0XCIpXHJcblx0cHVibGljIGFuaW1hdGVvbnJlc3VsdCA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dChcImFsbG93ZHJvcGRvd25cIilcclxuXHRwdWJsaWMgYWxsb3dkcm9wZG93biA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dCgna2V5bWFwJylcclxuICAgIHB1YmxpYyBrZXltYXA6IGFueVtdID0gW107XHJcblxyXG4gICAgQElucHV0KFwiaWNvblwiKVxyXG4gICAgcHVibGljIGljb24gPSBcIlwiO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJcIjtcclxuXHJcblx0QElucHV0KFwiZGlyZWN0aW9uXCIpXHJcbiAgICBwdWJsaWMgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG5cclxuICAgIEBJbnB1dChcImRlbGF5YnlcIilcclxuICAgIHB1YmxpYyBkZWxheWJ5ID0gMzAwO1xyXG5cclxuICAgIEBJbnB1dChcInRyaWdnZXJvblwiKVxyXG4gICAgcHVibGljIHRyaWdnZXJvbiA9IDI7XHJcblxyXG4gICAgQElucHV0KFwidmlld3BvcnRcIilcclxuICAgIHB1YmxpYyB2aWV3cG9ydCA9IFwiMjAwcHhcIjtcclxuXHJcblx0QElucHV0KFwidGVtcGxhdGVcIilcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInNvdXJjZVwiKVxyXG4gICAgcHVibGljIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcImRhdGFcIilcclxuICAgIHB1YmxpYyBkYXRhOiBhbnk7XHJcblxyXG5cdEBPdXRwdXQoXCJvbnNlbGVjdFwiKVxyXG5cdG9uc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHRAT3V0cHV0KFwib25zZWFyY2hcIilcclxuXHRvbnNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cdFxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdHRoaXMucmVzaXplKGZhbHNlKTtcclxuXHRcdGlmICh0aGlzLnByZWZldGNoZGF0YSAmJiB0aGlzLnNvdXJjZSkge1xyXG5cdFx0XHR0aGlzLmh0dHAuZ2V0KHRoaXMuc291cmNlKS5zdWJzY3JpYmUoXHJcblx0XHRcdFx0KHJlc3VsdDogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IHRoaXMudHJhdmVyc2VSZXN1bHQocmVzdWx0KTtcclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRyYXZlcnNlUmVzdWx0KHJlc3BvbnNlKSB7XHJcblx0XHRjb25zdCBsaXN0ID0gdGhpcy5yZW1vdGVwYXRoLnNwbGl0KFwiLlwiKTtcclxuXHRcdGxpc3QubWFwKCAoaXRlbSkgPT4ge1xyXG5cdFx0XHRyZXNwb25zZSA9IHJlc3BvbnNlID8gcmVzcG9uc2VbaXRlbV0gOiB1bmRlZmluZWQ7XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHggPSBsaXN0Lmxlbmd0aCA/IHJlc3BvbnNlIDogdW5kZWZpbmVkO1xyXG5cdFx0cmV0dXJuIHggJiYgKHR5cGVvZiB4ID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoeCkgOiB4O1xyXG5cdH1cclxuXHJcblx0Y2xpY2t1cChldmVudCwgaXRlbSwgaSwgbWF4KSB7XHJcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggaXRlbSApO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHRpZihpID4gMCkge1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tXCIgKyAoIGkgLSAxKSkuZm9jdXMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQpLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gNDAgJiYgaSA8IG1heCkgeyAvLyBhcnJvdyBkb3duXHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tXCIgKyAoIGkgKyAxKSkuZm9jdXMoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHJpdmF0ZSByZXNpemUoZmxhZykge1xyXG5cdFx0aWYgKHRoaXMuYW5pbWF0ZW9ucmVzdWx0KSB7XHJcblx0XHRcdGlmIChmbGFnKSB7XHJcblx0XHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYXMtZGF0YVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhhcy1kYXRhXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhhcy1kYXRhXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRrZXl1cChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YSAmJiB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdFRhYiggdGhpcy5maWx0ZXJlZERhdGFbMF0gKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHQvLyBkbyBub3RoaW5nXHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDQwKSB7IC8vIGFycm93IGRvd25cclxuXHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhICYmIHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCl7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgXCItaXRlbS0wXCIpLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZW50cnkgPSBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHRcdGlmICh0aGlzLmludGVydmFsKSB7XHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3Qga2V5ID0gdGhpcy5lbnRyeS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdGlmIChrZXkubGVuZ3RoID4gdGhpcy50cmlnZ2Vyb24pIHtcclxuXHRcdFx0XHRcdGlmICghdGhpcy5wcmVmZXRjaGRhdGEgJiYgdGhpcy5zb3VyY2UpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5odHRwLmdldCh0aGlzLnNvdXJjZSArIGtleSkuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0XHRcdChyZXN1bHQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSB0aGlzLnRyYXZlcnNlUmVzdWx0KHJlc3VsdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm9uc2VhcmNoLmVtaXQoa2V5KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGF0YSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIChpdGVtKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IGtlZXAgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5rZXltYXAubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGsgPSB0aGlzLmtleW1hcFtqXTtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCB0bXAgPSBpdGVtW2tdXHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB2ID0gdG1wID8gdG1wLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodiAmJiB2LmluZGV4T2Yoa2V5KSA+PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGtlZXAgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGtlZXA7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5vbnNlYXJjaC5lbWl0KGtleSk7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKHRydWUpLCA2Nik7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCB0aGlzLmRlbGF5YnkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RUYWIoaXRlbSkge1xyXG5cdFx0dGhpcy5vbnNlbGVjdC5lbWl0KGl0ZW0pO1xyXG5cdFx0dGhpcy5maWx0ZXJlZERhdGEgPSBbXTtcclxuXHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdHRoaXMuZW50cnkgPSBcIlwiO1xyXG5cdH1cclxufVxyXG4iLCIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBmbGV4aWJsZSB0YWJzIGluIGEgbGF6eSBsb2FkIGZhc2hpb24uXHJcbiovXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbmltcG9ydCB7IEZsZXhpYmxlQXV0b0NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBIdHRwTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZUF1dG9Db21wbGV0ZU1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiaHR0cCIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkh0dHAiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkh0dHBNb2R1bGUiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUE7UUE2RUMsdUNBQW9CQSxPQUFVLEVBQVUsRUFBYztZQUFsQyxTQUFJLEdBQUpBLE9BQUksQ0FBTTtZQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7eUJBekQ5QyxFQUFFO2dDQUNZLEVBQUU7OEJBR0osVUFBVTsrQkFHVCxFQUFFOzhCQUdILE1BQU07Z0NBR0osS0FBSzttQ0FHRixLQUFLO2lDQUdQLEtBQUs7MEJBR0YsRUFBRTt3QkFHWCxFQUFFOzJCQUdDLEVBQUU7NkJBR0EsVUFBVTsyQkFHWixHQUFHOzZCQUdELENBQUM7NEJBR0YsT0FBTzs0QkFZakIsSUFBSUMsaUJBQVksRUFBRTs0QkFHbEIsSUFBSUEsaUJBQVksRUFBRTtTQUU2Qjs7OztRQUUxRCx1REFBZTs7O1lBQWY7Z0JBQUEsaUJBWUM7Z0JBWEEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQ25DLFVBQUMsTUFBVzs7d0JBQ1gsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDN0MsSUFBSSxRQUFRLEVBQUU7NEJBQ2IsS0FBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7eUJBQ3JCO3FCQUNELENBQ0QsQ0FBQztpQkFDRjthQUNEOzs7OztRQUVPLHNEQUFj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