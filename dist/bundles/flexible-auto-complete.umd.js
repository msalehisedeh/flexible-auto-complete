(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/http'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/http', '@angular/common'], factory) :
	(factory((global['flexible-auto-complete'] = {}),global.ng.core,global.ng.http,global.ng.common));
}(this, (function (exports,core,http,common) { 'use strict';

var FlexibleAutoCompleteComponent = /** @class */ (function () {
    function FlexibleAutoCompleteComponent(http$$1) {
        this.http = http$$1;
        this.entry = "";
        this.filteredData = [];
        this.keymap = [];
        this.direction = "vertical";
        this.delayby = 300;
        this.triggeron = 2;
        this.onselect = new core.EventEmitter();
    }
    FlexibleAutoCompleteComponent.prototype.clickup = function (event, item) {
        var code = event.which;
        if (code === 13) {
            this.selectTab(item);
        }
    };
    FlexibleAutoCompleteComponent.prototype.keyup = function (event) {
        var _this = this;
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
                var key = _this.entry.toLowerCase();
                if (key.length > _this.triggeron) {
                    if (_this.source) {
                        _this.http.get(_this.source + key).subscribe(function (result) {
                            _this.data = result.body;
                            _this.filteredData = result.body;
                        });
                    }
                    else if (_this.data) {
                        _this.filteredData = _this.data.filter(function (item) {
                            var keep = false;
                            for (var j = 0; j < _this.keymap.length; j++) {
                                var k = _this.keymap[j];
                                var tmp = item[k];
                                var v = tmp ? tmp.toLowerCase() : undefined;
                                if (v && v.indexOf(key) >= 0) {
                                    keep = true;
                                    break;
                                }
                            }
                            return keep;
                        });
                    }
                }
                else {
                    _this.filteredData = [];
                }
            }, this.delayby);
        }
    };
    FlexibleAutoCompleteComponent.prototype.selectTab = function (item) {
        this.onselect.emit(item);
        this.filteredData = [];
        this.entry = "";
    };
    return FlexibleAutoCompleteComponent;
}());
FlexibleAutoCompleteComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'flexible-auto-complete',
                template: "\n<label for=\"\">\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\n    <input [value]=\"entry\"\n        (keyup)=\"keyup($event)\" />\n    <span [class]=\"icon\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\n</label>\n<ul *ngIf=\"filteredData.length\"\n    role=\"list\"\n    class=\"viewport\"\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\n    <li role=\"listitem\" tabindex=\"0\" *ngFor=\"let item of filteredData\" (keyup)=\"clickup($event, item)\" (click)=\"selectTab(item)\">\n        <ng-container\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\"\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\n    </li>\n</ul>\n<ng-template #defaultTemplate let-detail=\"data\">\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + ' '\"></span>\n</ng-template>\n",
                styles: [":host{display:table;width:100%}:host label{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;-webkit-box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);-webkit-transition:-webkit-box-shadow .2s cubic-bezier(.4,0,.2,1);transition:-webkit-box-shadow .2s cubic-bezier(.4,0,.2,1);transition:box-shadow .2s cubic-bezier(.4,0,.2,1);transition:box-shadow .2s cubic-bezier(.4,0,.2,1),-webkit-box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{-webkit-box-flex:1;-ms-flex:1;flex:1;border:0;padding-left:16px}:host label .icon{-webkit-box-flex:0;-ms-flex:0 0 15px;flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{-webkit-box-sizing:border-box;box-sizing:border-box;list-style-type:none;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden}:host .viewport li{-webkit-box-sizing:border-box;box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px}:host .viewport li:hover{background-color:#ff3e58}:host .viewport li:focus{background-color:#3e8bff}:host .viewport li .icon{color:#fff;display:block}"]
            },] },
];
FlexibleAutoCompleteComponent.ctorParameters = function () { return [
    { type: http.Http, },
]; };
FlexibleAutoCompleteComponent.propDecorators = {
    "keymap": [{ type: core.Input, args: ['keymap',] },],
    "icon": [{ type: core.Input, args: ["icon",] },],
    "message": [{ type: core.Input, args: ["message",] },],
    "direction": [{ type: core.Input, args: ["direction",] },],
    "delayby": [{ type: core.Input, args: ["delayby",] },],
    "triggeron": [{ type: core.Input, args: ["triggeron",] },],
    "source": [{ type: core.Input, args: ["source",] },],
    "viewport": [{ type: core.Input, args: ["viewport",] },],
    "template": [{ type: core.Input, args: ["template",] },],
    "data": [{ type: core.Input, args: ["data",] },],
    "onselect": [{ type: core.Output, args: ["onselect",] },],
};
var FlexibleAutoCompleteModule = /** @class */ (function () {
    function FlexibleAutoCompleteModule() {
    }
    return FlexibleAutoCompleteModule;
}());
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
            },] },
];
FlexibleAutoCompleteModule.ctorParameters = function () { return []; };

exports.FlexibleAutoCompleteComponent = FlexibleAutoCompleteComponent;
exports.FlexibleAutoCompleteModule = FlexibleAutoCompleteModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=flexible-auto-complete.umd.js.map
