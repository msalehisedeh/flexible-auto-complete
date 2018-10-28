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
            { type: core.Component, args: [{
                        selector: 'flexible-auto-complete',
                        template: "\r\n<label for=\"\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"'item' + i\" \r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n",
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUvc3JjL2FwcC9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnRzIiwibmc6Ly9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlL3NyYy9hcHAvZmxleGlibGUtYXV0by1jb21wbGV0ZS9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLW1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBhIHRhYmxlIHdoaWNoIGlzIHVzaW5nIHRoZSBnaXZlbiBGbGV4aWJsZVRhYmxlSGVhZGVyIHNldCBpblxyXG4qIG9yZGVyIHRvIHRhYnVsYXRlIHRoZSBnaXZlbiBkYXRhLiBBcyBwZXIgZGVmaW5pdGlvbiBvZiBlYXJjaCBoZWFkZXIgY29tcG9uZW50LFxyXG4qIGEgY29sdW1uIGNvdWxkIGJlIGhpZGRlbiwgc29ydGFibGUsIG9yIGRyYWdnYWJsZS4gRWFjaCB0YWJsZSByb3cgY2FuIGV4cGFuZC9jb2xsYXBzZVxyXG4qIG9yIHJlc3BvbmQgdG8gYSBjbGljayBhY3Rpb24uXHJcbiovXHJcbmltcG9ydCB7XHJcbiAgICBDb21wb25lbnQsXHJcblx0SW5wdXQsXHJcblx0T3V0cHV0LFxyXG5cdEFmdGVyVmlld0luaXQsXHJcblx0RXZlbnRFbWl0dGVyLFxyXG5cdEVsZW1lbnRSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEh0dHAgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiAnZmxleGlibGUtYXV0by1jb21wbGV0ZScsXHJcblx0dGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50Lmh0bWwnLFxyXG5cdHN0eWxlVXJsczogWycuL2ZsZXhpYmxlLWF1dG8tY29tcGxldGUuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0e1xyXG5cclxuXHRwcml2YXRlIGludGVydmFsOiBhbnk7XHJcblxyXG5cdGVudHJ5ID0gXCJcIjtcclxuXHRmaWx0ZXJlZERhdGE6IGFueVtdID0gW107XHJcblxyXG5cdEBJbnB1dChcInBsYWNlaG9sZGVyXCIpXHJcblx0cHVibGljIHBsYWNlaG9sZGVyID0gXCJcIjtcclxuXHRcclxuXHRASW5wdXQoXCJyZW1vdGVwYXRoXCIpXHJcblx0cHVibGljIHJlbW90ZXBhdGggPSBcImJvZHlcIjtcclxuXHRcclxuXHRASW5wdXQoXCJwcmVmZXRjaGRhdGFcIilcclxuXHRwdWJsaWMgcHJlZmV0Y2hkYXRhID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KFwiYW5pbWF0ZW9ucmVzdWx0XCIpXHJcblx0cHVibGljIGFuaW1hdGVvbnJlc3VsdCA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dChcImFsbG93ZHJvcGRvd25cIilcclxuXHRwdWJsaWMgYWxsb3dkcm9wZG93biA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dCgna2V5bWFwJylcclxuICAgIHB1YmxpYyBrZXltYXA6IGFueVtdID0gW107XHJcblxyXG4gICAgQElucHV0KFwiaWNvblwiKVxyXG4gICAgcHVibGljIGljb24gPSBcIlwiO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJcIjtcclxuXHJcblx0QElucHV0KFwiZGlyZWN0aW9uXCIpXHJcbiAgICBwdWJsaWMgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG5cclxuICAgIEBJbnB1dChcImRlbGF5YnlcIilcclxuICAgIHB1YmxpYyBkZWxheWJ5ID0gMzAwO1xyXG5cclxuICAgIEBJbnB1dChcInRyaWdnZXJvblwiKVxyXG4gICAgcHVibGljIHRyaWdnZXJvbiA9IDI7XHJcblxyXG4gICAgQElucHV0KFwidmlld3BvcnRcIilcclxuICAgIHB1YmxpYyB2aWV3cG9ydCA9IFwiMjAwcHhcIjtcclxuXHJcblx0QElucHV0KFwidGVtcGxhdGVcIilcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInNvdXJjZVwiKVxyXG4gICAgcHVibGljIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcImRhdGFcIilcclxuICAgIHB1YmxpYyBkYXRhOiBhbnk7XHJcblxyXG5cdEBPdXRwdXQoXCJvbnNlbGVjdFwiKVxyXG5cdG9uc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHRAT3V0cHV0KFwib25zZWFyY2hcIilcclxuXHRvbnNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cdFxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdHRoaXMucmVzaXplKGZhbHNlKTtcclxuXHRcdGlmICh0aGlzLnByZWZldGNoZGF0YSAmJiB0aGlzLnNvdXJjZSkge1xyXG5cdFx0XHR0aGlzLmh0dHAuZ2V0KHRoaXMuc291cmNlKS5zdWJzY3JpYmUoXHJcblx0XHRcdFx0KHJlc3VsdDogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IHRoaXMudHJhdmVyc2VSZXN1bHQocmVzdWx0KTtcclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRyYXZlcnNlUmVzdWx0KHJlc3BvbnNlKSB7XHJcblx0XHRjb25zdCBsaXN0ID0gdGhpcy5yZW1vdGVwYXRoLnNwbGl0KFwiLlwiKTtcclxuXHRcdGxpc3QubWFwKCAoaXRlbSkgPT4ge1xyXG5cdFx0XHRyZXNwb25zZSA9IHJlc3BvbnNlID8gcmVzcG9uc2VbaXRlbV0gOiB1bmRlZmluZWQ7XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHggPSBsaXN0Lmxlbmd0aCA/IHJlc3BvbnNlIDogdW5kZWZpbmVkO1xyXG5cdFx0cmV0dXJuIHggJiYgKHR5cGVvZiB4ID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoeCkgOiB4O1xyXG5cdH1cclxuXHJcblx0Y2xpY2t1cChldmVudCwgaXRlbSwgaSwgbWF4KSB7XHJcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggaXRlbSApO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCAmJiBpPjApIHsgLy8gYXJyb3cgdXBcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpdGVtXCIgKyAoIGkgLSAxKSkuZm9jdXMoKTtcclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gNDAgJiYgaSA8IG1heCkgeyAvLyBhcnJvdyBkb3duXHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXRlbVwiICsgKCBpICsgMSkpLmZvY3VzKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHByaXZhdGUgcmVzaXplKGZsYWcpIHtcclxuXHRcdGlmICh0aGlzLmFuaW1hdGVvbnJlc3VsdCkge1xyXG5cdFx0XHRpZiAoZmxhZykge1xyXG5cdFx0XHRcdHRoaXMuZWwubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGFzLWRhdGFcIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoYXMtZGF0YVwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYXMtZGF0YVwiKTtcclxuXHRcdH1cclxuXHR9XHJcblx0a2V5dXAoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEgJiYgdGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhpcy5zZWxlY3RUYWIoIHRoaXMuZmlsdGVyZWREYXRhWzBdICk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZW50cnkgPSBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHRcdGlmICh0aGlzLmludGVydmFsKSB7XHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3Qga2V5ID0gdGhpcy5lbnRyeS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdGlmIChrZXkubGVuZ3RoID4gdGhpcy50cmlnZ2Vyb24pIHtcclxuXHRcdFx0XHRcdGlmICghdGhpcy5wcmVmZXRjaGRhdGEgJiYgdGhpcy5zb3VyY2UpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5odHRwLmdldCh0aGlzLnNvdXJjZSArIGtleSkuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0XHRcdChyZXN1bHQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSB0aGlzLnRyYXZlcnNlUmVzdWx0KHJlc3VsdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm9uc2VhcmNoLmVtaXQoa2V5KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGF0YSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIChpdGVtKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IGtlZXAgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5rZXltYXAubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGsgPSB0aGlzLmtleW1hcFtqXTtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCB0bXAgPSBpdGVtW2tdXHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB2ID0gdG1wID8gdG1wLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodiAmJiB2LmluZGV4T2Yoa2V5KSA+PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGtlZXAgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGtlZXA7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5vbnNlYXJjaC5lbWl0KGtleSk7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKHRydWUpLCA2Nik7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCB0aGlzLmRlbGF5YnkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RUYWIoaXRlbSkge1xyXG5cdFx0dGhpcy5vbnNlbGVjdC5lbWl0KGl0ZW0pO1xyXG5cdFx0dGhpcy5maWx0ZXJlZERhdGEgPSBbXTtcclxuXHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdHRoaXMuZW50cnkgPSBcIlwiO1xyXG5cdH1cclxufVxyXG4iLCIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBmbGV4aWJsZSB0YWJzIGluIGEgbGF6eSBsb2FkIGZhc2hpb24uXHJcbiovXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbmltcG9ydCB7IEZsZXhpYmxlQXV0b0NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBIdHRwTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZUF1dG9Db21wbGV0ZU1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiaHR0cCIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIkh0dHAiLCJFbGVtZW50UmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSIsIkh0dHBNb2R1bGUiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUE7UUEwRUMsdUNBQW9CQSxPQUFVLEVBQVUsRUFBYztZQUFsQyxTQUFJLEdBQUpBLE9BQUksQ0FBTTtZQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7eUJBdEQ5QyxFQUFFO2dDQUNZLEVBQUU7K0JBR0gsRUFBRTs4QkFHSCxNQUFNO2dDQUdKLEtBQUs7bUNBR0YsS0FBSztpQ0FHUCxLQUFLOzBCQUdGLEVBQUU7d0JBR1gsRUFBRTsyQkFHQyxFQUFFOzZCQUdBLFVBQVU7MkJBR1osR0FBRzs2QkFHRCxDQUFDOzRCQUdGLE9BQU87NEJBWWpCLElBQUlDLGlCQUFZLEVBQUU7NEJBR2xCLElBQUlBLGlC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