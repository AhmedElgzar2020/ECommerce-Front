import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { egretAnimations } from 'app/shared/animations/egret-animations';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { AllCategoriesWithLookupsVM } from '../../models/allCategoriesWithLookupsVM';
import { Lookup } from '../../models/lookup';
import { LookupsService } from '../../services/lookups.service';

@Component({
  selector: 'app-lookups-category',
  templateUrl: './lookups-category.component.html',
  styleUrls: ['./lookups-category.component.scss'],
  animations: [egretAnimations]
})
export class LookupsCategoryComponent  implements OnInit, OnDestroy {
  public isSideNavOpen: boolean;
  public viewMode: string = 'grid-view';
  public currentPage: any;
  searchCriteria = { searchKeyword: undefined }

  @ViewChild(MatSidenav) private sideNav: MatSidenav;

  lookupsCategories: AllCategoriesWithLookupsVM[];
  filteredLookupsCategories: Lookup[] = [];
  assignNewLookup: Lookup[] = [];
  public activeCategory: string = 'all';
  public filterForm: FormGroup;


  constructor(private _lookupService: LookupsService,private fb: FormBuilder,private snackBar: MatSnackBar,private loader: AppLoaderService,private router: Router) { }

  ngOnInit() {
    this.getLookupsCategories();
    this.buildFilterForm(this._lookupService.initialFilters);
    
  }
  ngOnDestroy() {

  }
  
  public getLookupsCategories() {
    this._lookupService.getLookupsCategories().subscribe(result => {
      if (result) {
        this.lookupsCategories = result;
        this.lookupsCategories.forEach(lookupCategory=> {
          lookupCategory.lookups.forEach(lookup => {
            lookup.category = lookupCategory.name;
            this.filteredLookupsCategories.push(Object.assign({}, lookup));
          });
          
        });
      }
    }, error => {

    });
  }
  

  onFilter() { 
    this.filteredLookupsCategories = [];
    if (this.searchCriteria.searchKeyword != "") {
      this.lookupsCategories.forEach(lookupCategory => {
        lookupCategory.lookups.forEach(lookupObj => {
          if (lookupObj.displayName.toLowerCase().includes(this.searchCriteria.searchKeyword.toLowerCase())) {
            const assignNewLookup = {} as Lookup;
            assignNewLookup.category = lookupCategory.name;
            assignNewLookup.displayName = lookupObj.displayName;
            assignNewLookup.id = lookupObj.id;
            assignNewLookup.uniqueKey= lookupObj.uniqueKey;
            assignNewLookup.icon= lookupObj.icon;
            assignNewLookup.additionalColumns = lookupObj.additionalColumns;
            this.filteredLookupsCategories.push(Object.assign({}, assignNewLookup));
          }
        });


      });
    }
    else {
      this.lookupsCategories.forEach(lookupCategory => {
        lookupCategory.lookups.forEach(lookup => {
          lookup.category = lookupCategory.name;
          this.filteredLookupsCategories.push(Object.assign({}, lookup));
        });
          
      });
    }
  }
  
  clickLookupsItem(lookup) {
    this._lookupService
      .setComponentChildItems([], [], lookup.displayName);
    this.router.navigate(['./lookup/list/' + lookup.lookupName], { state: { displayName: lookup.displayName } });

  }

  buildFilterForm(filterData:any = {}) {
    this.filterForm = this.fb.group({
      search: [''],
      category: ['all'],
      minPrice: [filterData.minPrice],
      maxPrice: [filterData.maxPrice],
      minRating: [filterData.minRating],
      maxRating: [filterData.maxRating]
    })
  }

  setActiveCategory(category) {
    this.activeCategory = category;
    this.filterForm.controls['category'].setValue(category)
  }

  toggleSideNav() {
    this.sideNav.opened = !this.sideNav.opened;
  }
}
