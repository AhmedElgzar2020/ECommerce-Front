
export class LocalStorageHelper {

    public static AddToLocalStorage(key, value){
        if(!key){
            return;
        }
        
        localStorage.setItem(key, value);
    }

    public static RemoveFromLocalStorage(key){
        localStorage.removeItem(key);
    }

    public static GetFormLocalStorageAsString(key){
        return localStorage.getItem(key);
    }

    public static GetFormLocalStorageAsObject(key){
        let value = localStorage.getItem(key);
        if (!value){
            return null;
        }

        return JSON.parse(value);
    }
}