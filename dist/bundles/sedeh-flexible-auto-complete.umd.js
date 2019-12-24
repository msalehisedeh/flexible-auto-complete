(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/http'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@sedeh/flexible-auto-complete', ['exports', '@angular/core', '@angular/http', '@angular/common'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['flexible-auto-complete'] = {}), global.ng.core, global.ng.http, global.ng.common));
}(this, (function (exports, core, http, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

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
            this.onselect = new core.EventEmitter();
            this.onsearch = new core.EventEmitter();
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
            { type: http.Http },
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input("flexibleId")
        ], FlexibleAutoCompleteComponent.prototype, "flexibleId", void 0);
        __decorate([
            core.Input("placeholder")
        ], FlexibleAutoCompleteComponent.prototype, "placeholder", void 0);
        __decorate([
            core.Input("remotepath")
        ], FlexibleAutoCompleteComponent.prototype, "remotepath", void 0);
        __decorate([
            core.Input("prefetchdata")
        ], FlexibleAutoCompleteComponent.prototype, "prefetchdata", void 0);
        __decorate([
            core.Input("animateonresult")
        ], FlexibleAutoCompleteComponent.prototype, "animateonresult", void 0);
        __decorate([
            core.Input("allowdropdown")
        ], FlexibleAutoCompleteComponent.prototype, "allowdropdown", void 0);
        __decorate([
            core.Input('keymap')
        ], FlexibleAutoCompleteComponent.prototype, "keymap", void 0);
        __decorate([
            core.Input("icon")
        ], FlexibleAutoCompleteComponent.prototype, "icon", void 0);
        __decorate([
            core.Input("message")
        ], FlexibleAutoCompleteComponent.prototype, "message", void 0);
        __decorate([
            core.Input("direction")
        ], FlexibleAutoCompleteComponent.prototype, "direction", void 0);
        __decorate([
            core.Input("delayby")
        ], FlexibleAutoCompleteComponent.prototype, "delayby", void 0);
        __decorate([
            core.Input("triggeron")
        ], FlexibleAutoCompleteComponent.prototype, "triggeron", void 0);
        __decorate([
            core.Input("viewport")
        ], FlexibleAutoCompleteComponent.prototype, "viewport", void 0);
        __decorate([
            core.Input("template")
        ], FlexibleAutoCompleteComponent.prototype, "template", void 0);
        __decorate([
            core.Input("source")
        ], FlexibleAutoCompleteComponent.prototype, "source", void 0);
        __decorate([
            core.Input("data")
        ], FlexibleAutoCompleteComponent.prototype, "data", void 0);
        __decorate([
            core.Output("onselect")
        ], FlexibleAutoCompleteComponent.prototype, "onselect", void 0);
        __decorate([
            core.Output("onsearch")
        ], FlexibleAutoCompleteComponent.prototype, "onsearch", void 0);
        FlexibleAutoCompleteComponent = __decorate([
            core.Component({
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
            core.NgModule({
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
            })
        ], FlexibleAutoCompleteModule);
        return FlexibleAutoCompleteModule;
    }());

    exports.FlexibleAutoCompleteComponent = FlexibleAutoCompleteComponent;
    exports.FlexibleAutoCompleteModule = FlexibleAutoCompleteModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-flexible-auto-complete.umd.js.map
