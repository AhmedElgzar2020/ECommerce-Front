import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AddLookupComponent } from './lookups/components/add-lookup/add-lookup.component';
import { EditLookupComponent } from './lookups/components/edit-lookup/edit-lookup.component';
import { LookupsListComponent } from './lookups/components/lookup-list/lookup-list.component';
import { LookupsCategoryComponent } from './lookups/components/lookups-category/lookups-category.component';
 
export const AdministratioRoutes: Routes = [
  {
    path: '',
    children: [
      {
      path: '',
      component: LookupsCategoryComponent,
      data: { title: 'lookups', breadcrumb: 'lookups' }
    },
    {
      path: 'list/:lookupName',
      component: LookupsListComponent,
      data: { title: 'lookups', breadcrumb: 'lookups' }
    },
    {
      path: 'list/:lookupName/new',
      component: AddLookupComponent,
      data: { title: 'lookups', breadcrumb: 'lookups' }
    },
    {
      path: 'list/:lookupName/edit/:id',
      component: EditLookupComponent,
      data: { title: 'lookups', breadcrumb: 'lookups' }
    }  ]
  }
];
