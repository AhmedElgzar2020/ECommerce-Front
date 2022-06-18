import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppConfig } from './app-config.model';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  static settings: IAppConfig;
  private http: HttpClient;

  constructor(handler: HttpBackend) {
      this.http = new HttpClient(handler);
  }

  public load() {
      const jsonFileUrl = `/assets/config/config.json`;
      return new Promise<any>((resolve, reject) => {
          this.http.get(jsonFileUrl).toPromise().then((response: IAppConfig) => {
              AppConfigService.settings = <IAppConfig>response;
              resolve(response);
          }).catch((response: any) => {
              reject(`Could not load file '${jsonFileUrl}`);
          });
      });
  }
}
