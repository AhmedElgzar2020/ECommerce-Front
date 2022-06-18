import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppConfigService } from './app-config.service';

export function initializeApp(appConfig: AppConfigService) {
    return () => appConfig.load();
}

@NgModule({
    providers: [
        AppConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfigService],
            multi: true
        }
    ],
})

export class AppConfigModule { }
