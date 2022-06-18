import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupsRoutingModule } from './lookups-routing.module';
import { AddLookupComponent } from '../components/add-lookup/add-lookup.component';
import { EditLookupComponent } from '../components/edit-lookup/edit-lookup.component';
import { LookupsCategoryComponent } from '../components/lookups-category/lookups-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingModule } from 'angular-star-rating';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { LookupsService } from '../services/lookups.service';
import { TranslateModule } from '@ngx-translate/core';
import { LookupsListComponent } from '../components/lookup-list/lookup-list.component';
import { CrudService } from 'app/views/cruds/crud.service';
import { SharedModule } from 'app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CrudNgxTableComponent } from 'app/views/cruds/crud-ngx-table/crud-ngx-table.component';
import { NgxTablePopupComponent } from 'app/views/cruds/crud-ngx-table/ngx-table-popup/ngx-table-popup.component';


@NgModule({
  declarations: [
    AddLookupComponent,
    EditLookupComponent,
    LookupsListComponent,
    LookupsCategoryComponent,
    NgxTablePopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatRippleModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatListModule,
    MatSidenavModule,
    StarRatingModule.forRoot(),
    NgxPaginationModule,
    NgxDatatableModule,
    LookupsRoutingModule,
    SharedDirectivesModule,
    TranslateModule,
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxDatatableModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatChipsModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    TranslateModule,
    SharedModule,
  ],
  providers:[
    LookupsService,CrudService
  ]
})
export class LookupsModule { }
