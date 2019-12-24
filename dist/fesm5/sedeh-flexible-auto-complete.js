import { __decorate } from 'tslib';
import { EventEmitter, ElementRef, Input, Output, Component, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

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
    FlexibleAutoCompleteComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.resize(false);
        if (this.prefetchdata && this.source) {
            this.http.get(this.source).subscribe(function (result) {
                var response = _this.traverseResult(result);
                if (response) {
                    _this.data = response;
                }
            });
        }
    };
    FlexibleAutoCompleteComponent.prototype.traverseResult = function (response) {
        var list = this.remotepath.split(".");
        list.map(function (item) {
            response = response ? response[item] : undefined;
        });
        var x = list.length ? response : undefined;
        return x && (typeof x === "string") ? JSON.parse(x) : x;
    };
    FlexibleAutoCompleteComponent.prototype.clickup = function (event, item, i, max) {
        var code = event.which;
        if (code === 13) {
            this.selectTab(item);
        }
        else if (code === 38) { // arrow up
            if (i > 0) {
                document.getElementById(this.flexibleId + "-item-" + (i - 1)).focus();
            }
            else {
                document.getElementById(this.flexibleId).focus();
            }
        }
        else if (code === 40 && i < max) { // arrow down
            document.getElementById(this.flexibleId + "-item-" + (i + 1)).focus();
        }
    };
    FlexibleAutoCompleteComponent.prototype.resize = function (flag) {
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
    FlexibleAutoCompleteComponent.prototype.keyup = function (event) {
        var _this = this;
        var code = event.which;
        if (code === 13) {
            if (this.filteredData && this.filteredData.length) {
                this.selectTab(this.filteredData[0]);
            }
        }
        else if (code === 38) { // arrow up
            // do nothing
        }
        else if (code === 40) { // arrow down
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
                var key = _this.entry.toLowerCase();
                if (key.length > _this.triggeron) {
                    if (!_this.prefetchdata && _this.source) {
                        _this.http.get(_this.source + key).subscribe(function (result) {
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
    FlexibleAutoCompleteComponent.prototype.selectTab = function (item) {
        var _this = this;
        this.onselect.emit(item);
        this.filteredData = [];
        setTimeout(function () { return _this.resize(false); }, 66);
        this.entry = "";
    };
    FlexibleAutoCompleteComponent.ctorParameters = function () { return [
        { type: Http },
        { type: ElementRef }
    ]; };
    __decorate([
        Input("flexibleId")
    ], FlexibleAutoCompleteComponent.prototype, "flexibleId", void 0);
    __decorate([
        Input("placeholder")
    ], FlexibleAutoCompleteComponent.prototype, "placeholder", void 0);
    __decorate([
        Input("remotepath")
    ], FlexibleAutoCompleteComponent.prototype, "remotepath", void 0);
    __decorate([
        Input("prefetchdata")
    ], FlexibleAutoCompleteComponent.prototype, "prefetchdata", void 0);
    __decorate([
        Input("animateonresult")
    ], FlexibleAutoCompleteComponent.prototype, "animateonresult", void 0);
    __decorate([
        Input("allowdropdown")
    ], FlexibleAutoCompleteComponent.prototype, "allowdropdown", void 0);
    __decorate([
        Input('keymap')
    ], FlexibleAutoCompleteComponent.prototype, "keymap", void 0);
    __decorate([
        Input("icon")
    ], FlexibleAutoCompleteComponent.prototype, "icon", void 0);
    __decorate([
        Input("message")
    ], FlexibleAutoCompleteComponent.prototype, "message", void 0);
    __decorate([
        Input("direction")
    ], FlexibleAutoCompleteComponent.prototype, "direction", void 0);
    __decorate([
        Input("delayby")
    ], FlexibleAutoCompleteComponent.prototype, "delayby", void 0);
    __decorate([
        Input("triggeron")
    ], FlexibleAutoCompleteComponent.prototype, "triggeron", void 0);
    __decorate([
        Input("viewport")
    ], FlexibleAutoCompleteComponent.prototype, "viewport", void 0);
    __decorate([
        Input("template")
    ], FlexibleAutoCompleteComponent.prototype, "template", void 0);
    __decorate([
        Input("source")
    ], FlexibleAutoCompleteComponent.prototype, "source", void 0);
    __decorate([
        Input("data")
    ], FlexibleAutoCompleteComponent.prototype, "data", void 0);
    __decorate([
        Output("onselect")
    ], FlexibleAutoCompleteComponent.prototype, "onselect", void 0);
    __decorate([
        Output("onsearch")
    ], FlexibleAutoCompleteComponent.prototype, "onsearch", void 0);
    FlexibleAutoCompleteComponent = __decorate([
        Component({
            selector: 'flexible-auto-complete',
            template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n",
            styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out;width:100%}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#ff3e58}:host .viewport li:focus{background-color:#3e8bff}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}"]
        })
    ], FlexibleAutoCompleteComponent);
    return FlexibleAutoCompleteComponent;
}());

var FlexibleAutoCompleteModule = /** @class */ (function () {
    function FlexibleAutoCompleteModule() {
    }
    FlexibleAutoCompleteModule = __decorate([
        NgModule({
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
        })
    ], FlexibleAutoCompleteModule);
    return FlexibleAutoCompleteModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { FlexibleAutoCompleteComponent, FlexibleAutoCompleteModule };
//# sourceMappingURL=sedeh-flexible-auto-complete.js.map
