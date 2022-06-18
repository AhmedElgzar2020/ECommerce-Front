import { ElementRef } from '@angular/core';
import { CONSTANTS } from '../data/constants/constants';

export class Helper {
    public static isMobile: boolean = false;
    public static extensionsPattern: string = '^(\\.[a-zA-Z]+)(\\,\\.[a-zA-Z]+)*$';
    public static urlPattern: string = '^(http(s)?:\\/\\/)'+ // protocol
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+#]*)*'+ // port and path
    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-zA-Z\\d_]*)?$'; // fragment locator


    /**
    * Gets cookie value by the given name, if no cookie name matches the given name it returns null.
    * @param name  the name of the cookie.
   **/
    public static getCookieValue(name: string): string {
        var b = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : null;
    }

    /**
    * Gets query string value by its name.
    * @param name  The name of the query string.
   **/
    public static getQueryStringByName(name): string | null {
        var qstring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < qstring.length; i++) {
            var urlparam = qstring[i].split('=');
            if (urlparam[0].toLowerCase() == name.toLowerCase()) {
                return urlparam[1];
            }
        }
    }

    /**
    * sum specific property values inside objects of a given array.
    * @param array  The array of objects.
    * @param propertyName  The property path which will be summed.
   **/
    public static Sum(array: Array<any>, propertyName): number {
        let result = array.reduce((a, b) => a + (b[propertyName] || 0), 0);
        return result;
    }

    public static toFormData(obj, ...fileNames: string[]) {
        let formData = new FormData();
        Object.keys(obj).forEach(key => {
            if (fileNames.includes(key)) {
                formData.append(key, obj[key], obj[key].name);
            } else {
                formData.append(key, obj[key]);
            }
        });
        return formData;
    }


    /**
    * in case there is a form validation error occurs,it will focus on the first element which has a validation error.
    * @param formElementRef  instance of the form element.
   **/
    public static focusOnError(formElementRef?: ElementRef) {
        let loader = document.querySelector(".loader")! as HTMLElement;
        if (loader) { loader.classList.remove('hide') }
        let isModal = document.querySelector('body').classList.contains('modal-open');
        let multiErrorSection = document.querySelector('lib-multi-messages') as HTMLElement;
        let container = isModal ? document.querySelector('.modal.show') : window;
        setTimeout(function () {
            let firstInvalidControl: HTMLElement;
            if(document.querySelector("form.ng-invalid")) {
                firstInvalidControl = document.querySelector("form.ng-invalid")?.querySelector('.ng-invalid');
            }
            else if(isModal) {
                firstInvalidControl = document.querySelector('.modal.show')?.querySelector(".ng-invalid");
            }
            else if (multiErrorSection) {
                firstInvalidControl = multiErrorSection;
            }
            else {
                firstInvalidControl = document.querySelector(".ng-invalid")
            }
            firstInvalidControl?.scrollIntoView({ behavior: 'smooth', block: 'center'});
            if (loader) {
                loader.classList.add('hide');
            }
        }, 1000);
    }



    /**
     * creates a cookie with value of the given URL so when user authenticates will be directed to that url.
     * @param url  url of the page which will be set as cookie value, if null the current location will be set as default value.
    **/
    public static createReturnURLCookie(url: String = null): void {
        let expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 5);

        if (!url)
            document.cookie = `${CONSTANTS.returnURLCookieName}=${window.location}; expires=${expiryDate.toString()};`;
        else
            document.cookie = `${CONSTANTS.returnURLCookieName}=${url}; expires=${expiryDate.toString()};`;
    }

    /**
   * localize Datetime string to arabic.
   * @param date  date in string representation
   * @param is12HoursFormat time format 12 / 24 format flag if no parameter value passed the format will be 24.
   * @returns ١٤ أكتوبر ٢٠٢٠ ١٤:٣٠
  **/
    public static localizeDateTimeToArabic(date: string, is12HoursFormat: boolean = false): string {
        let _requestDateLocal = new Date(date);
        let dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        let dateLocalized = _requestDateLocal.toLocaleDateString('ar-EG')
        let timeLocalized = _requestDateLocal.toLocaleTimeString('ar-Eg', { hour: '2-digit', minute: '2-digit', hour12: is12HoursFormat })

        let datetimeDetails = timeLocalized.split(':');
        let hours = datetimeDetails[0];
        let minutes = datetimeDetails[1];
        timeLocalized = minutes + " : " + hours;

        if (!is12HoursFormat) {
            if (hours == '٢٤') {
                hours = '٠٠';
                timeLocalized = minutes + " : " + hours;
                return dateLocalized + " , " + timeLocalized;
            }
        }
        else {

            let minutesDetails = minutes.split(' ');
            let minutesfragment = minutesDetails[0];
            let dayNightFragment = minutesDetails[1];
            timeLocalized = minutesfragment + " : " + hours + ' ' + dayNightFragment;

        }
        return dateLocalized + " , " + timeLocalized;
    }

    // set is mobile value based on window size.
    public static checkIsMobile(): boolean {
        if(window.innerWidth <= 991){
            this.isMobile = true;
        }
        else {
            this.isMobile = false;
        }

        return this.isMobile;
    }

    public static removeHtmlTags(text){
        if(!text){
            return;
        }

        return text.replace(/<(?:.|\n)*?>/gm, '');
    }

    public static validateRegexPattern(textValue, pattern){
        let regx = new RegExp(pattern);
        return regx.test(textValue);
    }
}
