import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Helper } from '../helpers/helper';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient, public translate: TranslateService, @Optional() @Inject(LOCALE_ID) private locale: string) {
     
  }


  public post<T>(url: string, body: any, options?: object): Observable<any> {
    return this._http.post<T>(url, body, this._getOptions(options));
  }

  public get<T>(url: string, options?: object): Observable<any> {
    return this._http.get<T>(url, this._getOptions(options));
  }

  public delete<T>(url: string, options?: object): Observable<any> {
    return this._http.delete<T>(url, this._getOptions(options));
  }

  public put<T>(url: string, body: any, options?: object): Observable<any> {
    return this._http.put<T>(url, body, this._getOptions(options));
  }

  private getAcceptHeader(): string {
    return this.getAcceptLanguageByLocale();
  }

  getAcceptLanguageByLocale(): string {
    if (this.translate.currentLang) {
      return (this.translate.currentLang.toLowerCase() == 'en' || this.translate.currentLang.toLowerCase() == 'en-us') ? 'en-us' : 'ar-eg';
    }
    else {
      let cookieName = Helper.getCookieValue("lang");
      return (cookieName?.toLowerCase() == 'en'|| cookieName?.toLowerCase() == 'en-us') ? 'en-us' : 'ar-eg';
    }
  }

  private _getOptions(options: any) {

    if (options == null) {
      options = {};
    }

    if (options.headers == null) {
      options.headers = {};
    }

    options.headers["Accept-Language"] = options.headers["Accept-Language"] || this.getAcceptHeader();

    return options;
  }
}
