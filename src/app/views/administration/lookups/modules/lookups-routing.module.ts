import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLookupComponent } from '../components/add-lookup/add-lookup.component';
import { EditLookupComponent } from '../components/edit-lookup/edit-lookup.component';
import { LookupsListComponent } from '../components/lookup-list/lookup-list.component';
import { LookupsCategoryComponent } from '../components/lookups-category/lookups-category.component';

const routes: Routes = [
  {
    path: 'lookups',
    component: LookupsCategoryComponent
},
{
    path: 'list/:lookupName',
    component: LookupsListComponent,
},
{
  path: 'list/:lookupName/new',
  component: AddLookupComponent
},
{
  path: 'list/:lookupName/edit/:id',
  component: EditLookupComponent
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupsRoutingModule { }
