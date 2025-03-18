import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
// import { NgSelectModule } from '@ng-select/ng-select';
import {MatBadgeModule} from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registrar el locale de español
registerLocaleData(localeEs);

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatCardModule,
        NgxMatSelectSearchModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatError,
        MatDatepickerModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatExpansionModule,
        CdkAccordionModule,
        MatRadioModule,
        // NgSelectModule,
        MatBadgeModule,
        MatDialogModule,
        MatTooltipModule,
        NgxMatSelectSearchModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es' }
    ]
})
export class WebMaterialModule { }
