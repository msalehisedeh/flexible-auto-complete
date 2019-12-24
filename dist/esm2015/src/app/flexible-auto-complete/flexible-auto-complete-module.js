import * as tslib_1 from "tslib";
/*
* Provides rendering of flexible tabs in a lazy load fashion.
*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FlexibleAutoCompleteComponent } from './flexible-auto-complete.component';
let FlexibleAutoCompleteModule = class FlexibleAutoCompleteModule {
};
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
export { FlexibleAutoCompleteModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtYXV0by1jb21wbGV0ZS1tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvZmxleGlibGUtYXV0by1jb21wbGV0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvZmxleGlibGUtYXV0by1jb21wbGV0ZS9mbGV4aWJsZS1hdXRvLWNvbXBsZXRlLW1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0VBRUU7QUFDRixPQUFPLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBb0JuRixJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtDQUFHLENBQUE7QUFBN0IsMEJBQTBCO0lBbEJ0QyxRQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCxZQUFZO1lBQ1osVUFBVTtTQUNiO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsNkJBQTZCO1NBQ2hDO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsNkJBQTZCO1NBQ2hDO1FBQ0QsZUFBZSxFQUFFLEVBQ2hCO1FBQ0QsU0FBUyxFQUFFLEVBQ1Y7UUFDRCxPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztLQUNwQyxDQUFDO0dBRVcsMEJBQTBCLENBQUc7U0FBN0IsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuKiBQcm92aWRlcyByZW5kZXJpbmcgb2YgZmxleGlibGUgdGFicyBpbiBhIGxhenkgbG9hZCBmYXNoaW9uLlxyXG4qL1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBIdHRwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XHJcblxyXG5pbXBvcnQgeyBGbGV4aWJsZUF1dG9Db21wbGV0ZUNvbXBvbmVudCB9IGZyb20gJy4vZmxleGlibGUtYXV0by1jb21wbGV0ZS5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgSHR0cE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEZsZXhpYmxlQXV0b0NvbXBsZXRlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIEZsZXhpYmxlQXV0b0NvbXBsZXRlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVBdXRvQ29tcGxldGVNb2R1bGUge31cclxuIl19