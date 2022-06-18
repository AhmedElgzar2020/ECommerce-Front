import { Injectable } from '@angular/core';
import { IAppConfig } from 'app/shared/app-config/app-config.model';
import { AppConfigService } from 'app/shared/app-config/app-config.service';
import { HttpService } from 'app/shared/http/http.service';
import { Observable, Subject } from 'rxjs';
import { AddtionalCoulmns } from '../models/addtionalCoulmns';
import { AllCategoriesWithLookupsVM } from '../models/allCategoriesWithLookupsVM';
import { Lookup } from '../models/lookup';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
  appSettings: IAppConfig;
  componentChildItemsSubject = new Subject<any>();
  lookupsListAndCurrentLevelSubject = new Subject<any>();
  public lookupDetails: any;
  forceRefreshGenericDynamicComponents = new Subject<any>();
  forceGenericDynamicComponentsRefresh = this.forceRefreshGenericDynamicComponents.asObservable();
  currentLevel: number;
  isDefaultLocal: boolean = true;
  currentLocalUniqueKey: string = "ar";
  url: string = AppConfigService.settings.lookupsApi;
  public initialFilters = {
    minPrice: 10,
    maxPrice: 40,
    minRating: 1,
    maxRating: 5
  };
  constructor(private _httpservice: HttpService) {
    this.appSettings = AppConfigService.settings;
  }

  forceGenericComponentsRefresh(result: any) {
    this.forceRefreshGenericDynamicComponents.next(result);
  }
  public setComponentChildItems(parents, childs, displayName) {

    this.componentChildItemsSubject.next({ DropItems: parents, gridItems: childs, lookupDisplayName: displayName });
  }

  public getComponentChildItems(): Observable<any> {
    return this.componentChildItemsSubject.asObservable();
  }
  public setlookupDetailsAndCurrentLevel(lookupDetails, currentLevel) {
    this.lookupDetails = lookupDetails;
    this.lookupsListAndCurrentLevelSubject.next({ lookupDetails: lookupDetails, currentLevel: currentLevel });
    this.currentLevel = currentLevel;
  }

  public getlookupDetailsAndCurrentLevel(): Observable<any> {
    return this.lookupsListAndCurrentLevelSubject.asObservable();
  }
  public getLookupsCategories(): Observable<AllCategoriesWithLookupsVM[]> {
    const url = this.url + '/lookups/GetAllCategoriesWithLookups';
    return this._httpservice.get<AllCategoriesWithLookupsVM[]>(url);
  }
  public getLookupChildren(lookupName: string, id: number = null) {
    const url = id != null ? this.url + `/lookups/GetLookupChildren/${lookupName}/${id}` : this.url + `/lookups/GetLookupChildren/${lookupName}`;
    return this._httpservice.get<AllCategoriesWithLookupsVM[]>(url);
  }
  public getLookups(lookupName: string): Observable<Lookup[]> {
    const url = this.url + '/lookups/LookupdaAdmin/' + lookupName;
    return this._httpservice.get<Lookup[]>(url);
  }

  public deleteLookup(lookupName: string, id: number) {
    const url = this.url + `/admin/${lookupName}/${id}`;
    return this._httpservice.delete<any>(url);
  }

  public getLookupDisplayName(lookupName: string) {
    const url = this.url + `/lookups/GetByLookName/${lookupName}`;
    return this._httpservice.get<any>(url);
  }
  public updateLookup(lookups: any, lookupName: string) {
    const url = this.url + `/lookups/admin/${lookupName}`;
    return this._httpservice.put<any>(url, lookups);
  }

  public addOrUpdateLookup(lookupDetails: any) {
    const url = this.url + `/lookups/Save`;
    return this._httpservice.post<any>(url, lookupDetails);
  }

  public getAdditionalColumns(lookupName: string) {
    const url = this.url + `/lookups/admin/columns/${lookupName}`;
    return this._httpservice.get<AddtionalCoulmns>(url);
  }

  setIsDefaultLocal(languageList, currentLocalUniqueKey) {
    let defaultLocal = languageList.find(lang => lang.uniqueKey.toLowerCase() == "en");
    let currentLocalId = languageList.find(lang => lang.uniqueKey.toLowerCase() == currentLocalUniqueKey).id;
    this.currentLocalUniqueKey = currentLocalUniqueKey;
    this.isDefaultLocal = currentLocalId == defaultLocal.id;
  }


 
}


