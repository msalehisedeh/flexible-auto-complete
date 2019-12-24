import * as tslib_1 from "tslib";
/*
* Provides rendering of flexible tabs in a lazy load fashion.
*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FlexibleAutoCompleteComponent } from './flexible-auto-complete.component';
var FlexibleAutoCompleteModule = /** @class */ (function () {
    function FlexibleAutoCompleteModule() {
    }
    FlexibleAutoCompleteModule = tslib_1.__decorate([
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
export { FlexibleAutoCompleteModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS1tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZmxleGlibGUtYXV0by1jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZmxleGlibGUtYXV0by1jb21wbGV0ZS9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0VBRUU7QUFDRixPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBb0JuRjtJQUFBO0lBQXlDLENBQUM7SUFBN0IsMEJBQTBCO1FBbEJ0QyxRQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsWUFBWTtnQkFDWixVQUFVO2FBQ2I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNkJBQTZCO2FBQ2hDO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLDZCQUE2QjthQUNoQztZQUNELGVBQWUsRUFBRSxFQUNoQjtZQUNELFNBQVMsRUFBRSxFQUNWO1lBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDcEMsQ0FBQztPQUVXLDBCQUEwQixDQUFHO0lBQUQsaUNBQUM7Q0FBQSxBQUExQyxJQUEwQztTQUE3QiwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4qIFByb3ZpZGVzIHJlbmRlcmluZyBvZiBmbGV4aWJsZSB0YWJzIGluIGEgbGF6eSBsb2FkIGZhc2hpb24uXHJcbiovXHJcbmltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEh0dHBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuXHJcbmltcG9ydCB7IEZsZXhpYmxlQXV0b0NvbXBsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIENvbW1vbk1vZHVsZSxcclxuICAgICAgICBIdHRwTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgRmxleGlibGVBdXRvQ29tcGxldGVDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBGbGV4aWJsZUF1dG9Db21wbGV0ZU1vZHVsZSB7fVxyXG4iXX0=