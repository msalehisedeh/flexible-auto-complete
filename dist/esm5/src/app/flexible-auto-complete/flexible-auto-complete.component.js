import * as tslib_1 from "tslib";
/*
* Provides rendering of a table which is using the given FlexibleTableHeader set in
* order to tabulate the given data. As per definition of earch header component,
* a column could be hidden, sortable, or draggable. Each table row can expand/collapse
* or respond to a click action.
*/
import { Component, Input, Output, AfterViewInit, EventEmitter, ElementRef } from '@angular/core';
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
    tslib_1.__decorate([
        Input("flexibleId")
    ], FlexibleAutoCompleteComponent.prototype, "flexibleId", void 0);
    tslib_1.__decorate([
        Input("placeholder")
    ], FlexibleAutoCompleteComponent.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Input("remotepath")
    ], FlexibleAutoCompleteComponent.prototype, "remotepath", void 0);
    tslib_1.__decorate([
        Input("prefetchdata")
    ], FlexibleAutoCompleteComponent.prototype, "prefetchdata", void 0);
    tslib_1.__decorate([
        Input("animateonresult")
    ], FlexibleAutoCompleteComponent.prototype, "animateonresult", void 0);
    tslib_1.__decorate([
        Input("allowdropdown")
    ], FlexibleAutoCompleteComponent.prototype, "allowdropdown", void 0);
    tslib_1.__decorate([
        Input('keymap')
    ], FlexibleAutoCompleteComponent.prototype, "keymap", void 0);
    tslib_1.__decorate([
        Input("icon")
    ], FlexibleAutoCompleteComponent.prototype, "icon", void 0);
    tslib_1.__decorate([
        Input("message")
    ], FlexibleAutoCompleteComponent.prototype, "message", void 0);
    tslib_1.__decorate([
        Input("direction")
    ], FlexibleAutoCompleteComponent.prototype, "direction", void 0);
    tslib_1.__decorate([
        Input("delayby")
    ], FlexibleAutoCompleteComponent.prototype, "delayby", void 0);
    tslib_1.__decorate([
        Input("triggeron")
    ], FlexibleAutoCompleteComponent.prototype, "triggeron", void 0);
    tslib_1.__decorate([
        Input("viewport")
    ], FlexibleAutoCompleteComponent.prototype, "viewport", void 0);
    tslib_1.__decorate([
        Input("template")
    ], FlexibleAutoCompleteComponent.prototype, "template", void 0);
    tslib_1.__decorate([
        Input("source")
    ], FlexibleAutoCompleteComponent.prototype, "source", void 0);
    tslib_1.__decorate([
        Input("data")
    ], FlexibleAutoCompleteComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        Output("onselect")
    ], FlexibleAutoCompleteComponent.prototype, "onselect", void 0);
    tslib_1.__decorate([
        Output("onsearch")
    ], FlexibleAutoCompleteComponent.prototype, "onsearch", void 0);
    FlexibleAutoCompleteComponent = tslib_1.__decorate([
        Component({
            selector: 'flexible-auto-complete',
            template: "\r\n<label [for]=\"flexibleId\">\r\n    <span class=\"off-screen\" [textContent]=\"message\"></span>\r\n    <input [value]=\"entry\"\r\n        [placeholder]= \"placeholder\"\r\n\t\t[id]=\"flexibleId\"\r\n        (keyup)=\"keyup($event)\" />\r\n    <span [class]=\"icon ? icon : null\" *ngIf=\"filteredData.length == 0\" [class.icon]=\"true\" area-hidden=\"true\"></span>\r\n    <span class=\"icon fa fa-reply\" *ngIf=\"icon && filteredData.length\" area-hidden=\"true\"></span>\r\n</label>\r\n<ul *ngIf=\"filteredData.length\" \r\n    role=\"list\" \r\n    class=\"viewport\" \r\n    [class.fix-height]=\"allowdropdown\"\r\n    [style.max-width]=\"direction === 'horizontal' ? viewport : null\"\r\n    [style.overflow-x]=\"direction === 'horizontal' ? 'auto' : null\"\r\n    [style.flex-direction]=\"direction === 'horizontal' ? 'row' : 'column'\"\r\n    [style.max-height]=\"direction === 'vertical' ? viewport : null\"\r\n    [style.overflow-y]=\"direction === 'vertical' ? 'auto' : null\">\r\n    <li \r\n        *ngFor=\"let item of filteredData; let i = index\" \r\n        role=\"listitem\" \r\n        tabindex=\"0\" \r\n        [id]=\"flexibleId +'-item-' + i\" \r\n        (keyup)=\"clickup($event, item, i, filteredData.length)\" \r\n        (click)=\"selectTab(item)\">\r\n        <ng-container  \r\n            [ngTemplateOutlet]=\"template ? template : defaultTemplate\" \r\n            [ngTemplateOutletContext]=\"{data: item}\"></ng-container>\r\n        <span class=\"icon fa fa-reply\" area-hidden=\"true\"></span>\r\n    </li>\r\n</ul>\r\n\r\n<ng-template #defaultTemplate let-detail=\"data\">\r\n  <span *ngFor=\"let x of keymap\" [textContent]=\"detail[x] + '&nbsp;'\"></span>\r\n</ng-template>\r\n",
            styles: [":host{display:table;position:relative}:host.has-data{transition:width 3s ease-in-out;width:100%}:host label{display:flex;flex-direction:row;border:1px solid #ddd;padding:2px;height:22px;vertical-align:top;border-radius:2px;box-shadow:0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);transition:box-shadow .2s cubic-bezier(.4,0,.2,1)}:host label input{flex:1;border:0;padding-left:16px}:host label .icon{flex:0 0 15px;margin-right:5px;margin-top:3px;color:#ddd}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .viewport{box-sizing:border-box;list-style-type:none;display:flex;margin:0;padding:0;z-index:2;border:1px solid #ddd;border-radius:2px;background-color:#fff;overflow:hidden;width:100%;transition:height 3s ease-in-out}:host .viewport.fix-height{position:absolute}:host .viewport li{box-sizing:border-box;white-space:nowrap;background-color:#fdfeff;padding:2px 5px;position:relative}:host .viewport li:hover{background-color:#ff3e58}:host .viewport li:focus{background-color:#3e8bff}:host .viewport li .icon{color:#fff;display:block;right:0;top:5px;position:absolute;margin-right:10px}"]
        })
    ], FlexibleAutoCompleteComponent);
    return FlexibleAutoCompleteComponent;
}());
export { FlexibleAutoCompleteComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZmxleGlibGUtYXV0by1jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZmxleGlibGUtYXV0by1jb21wbGV0ZS9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0VBS0U7QUFDRixPQUFPLEVBQ0gsU0FBUyxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sYUFBYSxFQUNiLFlBQVksRUFDWixVQUFVLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU9yQztJQTZEQyx1Q0FBb0IsSUFBVSxFQUFVLEVBQWM7UUFBbEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVk7UUF6RHRELFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxpQkFBWSxHQUFVLEVBQUUsQ0FBQztRQUdsQixlQUFVLEdBQUcsVUFBVSxDQUFDO1FBR3hCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBR2pCLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFHcEIsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFHckIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFHeEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFHbkIsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUduQixTQUFJLEdBQUcsRUFBRSxDQUFDO1FBR1YsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUdiLGNBQVMsR0FBRyxVQUFVLENBQUM7UUFHdkIsWUFBTyxHQUFHLEdBQUcsQ0FBQztRQUdkLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFHZCxhQUFRLEdBQUcsT0FBTyxDQUFDO1FBWTdCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRzlCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFB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aXMgdXNpbmcgdGhlIGdpdmVuIEZsZXhpYmxlVGFibGVIZWFkZXIgc2V0IGluXHJcbiogb3JkZXIgdG8gdGFidWxhdGUgdGhlIGdpdmVuIGRhdGEuIEFzIHBlciBkZWZpbml0aW9uIG9mIGVhcmNoIGhlYWRlciBjb21wb25lbnQsXHJcbiogYSBjb2x1bW4gY291bGQgYmUgaGlkZGVuLCBzb3J0YWJsZSwgb3IgZHJhZ2dhYmxlLiBFYWNoIHRhYmxlIHJvdyBjYW4gZXhwYW5kL2NvbGxhcHNlXHJcbiogb3IgcmVzcG9uZCB0byBhIGNsaWNrIGFjdGlvbi5cclxuKi9cclxuaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCxcclxuXHRJbnB1dCxcclxuXHRPdXRwdXQsXHJcblx0QWZ0ZXJWaWV3SW5pdCxcclxuXHRFdmVudEVtaXR0ZXIsXHJcblx0RWxlbWVudFJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6ICdmbGV4aWJsZS1hdXRvLWNvbXBsZXRlJyxcclxuXHR0ZW1wbGF0ZVVybDogJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuaHRtbCcsXHJcblx0c3R5bGVVcmxzOiBbJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZUF1dG9Db21wbGV0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXR7XHJcblxyXG5cdHByaXZhdGUgaW50ZXJ2YWw6IGFueTtcclxuXHJcblx0ZW50cnkgPSBcIlwiO1xyXG5cdGZpbHRlcmVkRGF0YTogYW55W10gPSBbXTtcclxuXHJcblx0QElucHV0KFwiZmxleGlibGVJZFwiKVxyXG5cdHB1YmxpYyBmbGV4aWJsZUlkID0gXCJmbGV4aWJsZVwiO1xyXG5cdFxyXG5cdEBJbnB1dChcInBsYWNlaG9sZGVyXCIpXHJcblx0cHVibGljIHBsYWNlaG9sZGVyID0gXCJcIjtcclxuXHRcclxuXHRASW5wdXQoXCJyZW1vdGVwYXRoXCIpXHJcblx0cHVibGljIHJlbW90ZXBhdGggPSBcImJvZHlcIjtcclxuXHRcclxuXHRASW5wdXQoXCJwcmVmZXRjaGRhdGFcIilcclxuXHRwdWJsaWMgcHJlZmV0Y2hkYXRhID0gZmFsc2U7XHJcblx0XHJcblx0QElucHV0KFwiYW5pbWF0ZW9ucmVzdWx0XCIpXHJcblx0cHVibGljIGFuaW1hdGVvbnJlc3VsdCA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dChcImFsbG93ZHJvcGRvd25cIilcclxuXHRwdWJsaWMgYWxsb3dkcm9wZG93biA9IGZhbHNlO1xyXG5cdFxyXG5cdEBJbnB1dCgna2V5bWFwJylcclxuICAgIHB1YmxpYyBrZXltYXA6IGFueVtdID0gW107XHJcblxyXG4gICAgQElucHV0KFwiaWNvblwiKVxyXG4gICAgcHVibGljIGljb24gPSBcIlwiO1xyXG5cclxuICAgIEBJbnB1dChcIm1lc3NhZ2VcIilcclxuICAgIHB1YmxpYyBtZXNzYWdlID0gXCJcIjtcclxuXHJcblx0QElucHV0KFwiZGlyZWN0aW9uXCIpXHJcbiAgICBwdWJsaWMgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG5cclxuICAgIEBJbnB1dChcImRlbGF5YnlcIilcclxuICAgIHB1YmxpYyBkZWxheWJ5ID0gMzAwO1xyXG5cclxuICAgIEBJbnB1dChcInRyaWdnZXJvblwiKVxyXG4gICAgcHVibGljIHRyaWdnZXJvbiA9IDI7XHJcblxyXG4gICAgQElucHV0KFwidmlld3BvcnRcIilcclxuICAgIHB1YmxpYyB2aWV3cG9ydCA9IFwiMjAwcHhcIjtcclxuXHJcblx0QElucHV0KFwidGVtcGxhdGVcIilcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZTogYW55O1xyXG5cclxuICAgIEBJbnB1dChcInNvdXJjZVwiKVxyXG4gICAgcHVibGljIHNvdXJjZTogc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dChcImRhdGFcIilcclxuICAgIHB1YmxpYyBkYXRhOiBhbnk7XHJcblxyXG5cdEBPdXRwdXQoXCJvbnNlbGVjdFwiKVxyXG5cdG9uc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuXHRAT3V0cHV0KFwib25zZWFyY2hcIilcclxuXHRvbnNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxyXG5cdFxyXG5cdG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuXHRcdHRoaXMucmVzaXplKGZhbHNlKTtcclxuXHRcdGlmICh0aGlzLnByZWZldGNoZGF0YSAmJiB0aGlzLnNvdXJjZSkge1xyXG5cdFx0XHR0aGlzLmh0dHAuZ2V0KHRoaXMuc291cmNlKS5zdWJzY3JpYmUoXHJcblx0XHRcdFx0KHJlc3VsdDogYW55KSA9PiB7XHJcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IHRoaXMudHJhdmVyc2VSZXN1bHQocmVzdWx0KTtcclxuXHRcdFx0XHRcdGlmIChyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmRhdGEgPSByZXNwb25zZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRyYXZlcnNlUmVzdWx0KHJlc3BvbnNlKSB7XHJcblx0XHRjb25zdCBsaXN0ID0gdGhpcy5yZW1vdGVwYXRoLnNwbGl0KFwiLlwiKTtcclxuXHRcdGxpc3QubWFwKCAoaXRlbSkgPT4ge1xyXG5cdFx0XHRyZXNwb25zZSA9IHJlc3BvbnNlID8gcmVzcG9uc2VbaXRlbV0gOiB1bmRlZmluZWQ7XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IHggPSBsaXN0Lmxlbmd0aCA/IHJlc3BvbnNlIDogdW5kZWZpbmVkO1xyXG5cdFx0cmV0dXJuIHggJiYgKHR5cGVvZiB4ID09PSBcInN0cmluZ1wiKSA/IEpTT04ucGFyc2UoeCkgOiB4O1xyXG5cdH1cclxuXHJcblx0Y2xpY2t1cChldmVudCwgaXRlbSwgaSwgbWF4KSB7XHJcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblx0XHRcclxuXHRcdGlmIChjb2RlID09PSAxMykge1xyXG5cdFx0XHR0aGlzLnNlbGVjdFRhYiggaXRlbSApO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHRpZihpID4gMCkge1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tXCIgKyAoIGkgLSAxKSkuZm9jdXMoKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmZsZXhpYmxlSWQpLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoY29kZSA9PT0gNDAgJiYgaSA8IG1heCkgeyAvLyBhcnJvdyBkb3duXHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZmxleGlibGVJZCArIFwiLWl0ZW0tXCIgKyAoIGkgKyAxKSkuZm9jdXMoKTtcclxuXHRcdH1cclxuXHR9XHJcblx0cHJpdmF0ZSByZXNpemUoZmxhZykge1xyXG5cdFx0aWYgKHRoaXMuYW5pbWF0ZW9ucmVzdWx0KSB7XHJcblx0XHRcdGlmIChmbGFnKSB7XHJcblx0XHRcdFx0dGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoYXMtZGF0YVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImhhcy1kYXRhXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImhhcy1kYXRhXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRrZXl1cChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHRcdFxyXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XHJcblx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YSAmJiB0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aGlzLnNlbGVjdFRhYiggdGhpcy5maWx0ZXJlZERhdGFbMF0gKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChjb2RlID09PSAzOCkgeyAvLyBhcnJvdyB1cFxyXG5cdFx0XHQvLyBkbyBub3RoaW5nXHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgPT09IDQwKSB7IC8vIGFycm93IGRvd25cclxuXHRcdFx0aWYgKHRoaXMuZmlsdGVyZWREYXRhICYmIHRoaXMuZmlsdGVyZWREYXRhLmxlbmd0aCl7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mbGV4aWJsZUlkICsgXCItaXRlbS0wXCIpLmZvY3VzKCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuZW50cnkgPSBldmVudC50YXJnZXQudmFsdWU7XHJcblx0XHRcdGlmICh0aGlzLmludGVydmFsKSB7XHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuaW50ZXJ2YWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuaW50ZXJ2YWwgPSBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblx0XHRcdFx0Y29uc3Qga2V5ID0gdGhpcy5lbnRyeS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdGlmIChrZXkubGVuZ3RoID4gdGhpcy50cmlnZ2Vyb24pIHtcclxuXHRcdFx0XHRcdGlmICghdGhpcy5wcmVmZXRjaGRhdGEgJiYgdGhpcy5zb3VyY2UpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5odHRwLmdldCh0aGlzLnNvdXJjZSArIGtleSkuc3Vic2NyaWJlKFxyXG5cdFx0XHRcdFx0XHRcdChyZXN1bHQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgcmVzcG9uc2UgPSB0aGlzLnRyYXZlcnNlUmVzdWx0KHJlc3VsdCk7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5kYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gcmVzcG9uc2U7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0aGlzLmZpbHRlcmVkRGF0YS5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm9uc2VhcmNoLmVtaXQoa2V5KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUodHJ1ZSksIDY2KTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdCk7XHJcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuZGF0YSkge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmZpbHRlcmVkRGF0YSA9IHRoaXMuZGF0YS5maWx0ZXIoIChpdGVtKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0bGV0IGtlZXAgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5rZXltYXAubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGsgPSB0aGlzLmtleW1hcFtqXTtcclxuXHRcdFx0XHRcdFx0XHRcdGxldCB0bXAgPSBpdGVtW2tdXHJcblx0XHRcdFx0XHRcdFx0XHRjb25zdCB2ID0gdG1wID8gdG1wLnRvTG93ZXJDYXNlKCkgOiB1bmRlZmluZWQ7XHJcblx0XHRcdFx0XHRcdFx0XHRpZiAodiAmJiB2LmluZGV4T2Yoa2V5KSA+PSAwKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGtlZXAgPSB0cnVlO1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGtlZXA7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5maWx0ZXJlZERhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0dGhpcy5vbnNlYXJjaC5lbWl0KGtleSk7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKHRydWUpLCA2Nik7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKT0+IHRoaXMucmVzaXplKGZhbHNlKSwgNjYpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuZmlsdGVyZWREYXRhID0gW107XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpPT4gdGhpcy5yZXNpemUoZmFsc2UpLCA2Nik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCB0aGlzLmRlbGF5YnkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRzZWxlY3RUYWIoaXRlbSkge1xyXG5cdFx0dGhpcy5vbnNlbGVjdC5lbWl0KGl0ZW0pO1xyXG5cdFx0dGhpcy5maWx0ZXJlZERhdGEgPSBbXTtcclxuXHRcdHNldFRpbWVvdXQoKCk9PiB0aGlzLnJlc2l6ZShmYWxzZSksIDY2KTtcclxuXHRcdHRoaXMuZW50cnkgPSBcIlwiO1xyXG5cdH1cclxufVxyXG4iXX0=