/*
* Provides rendering of flexible tabs in a lazy load fashion.
*/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FlexibleAutoCompleteComponent } from './flexible-auto-complete.component';

@NgModule({
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
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FlexibleAutoCompleteModule {}
