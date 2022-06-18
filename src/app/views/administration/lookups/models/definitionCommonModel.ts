import { LookupLocal } from "./LookupLocal";

export class DefinitionCommonModel<TLocal>{
    // constructor(localType: { new (): TLocal }, nextLocalUniqueKey, languageList, allLocalsList) {

    // }

    setDefaultAndTempLocalModels<TLocal>(localType: { new(): TLocal }, nextLocalUniqueKey, languageList) {
        if (!this.localizations) {
            this.localizations = [];
        }
        let currentLang = languageList.find(lang => lang.uniqueKey.toLowerCase() == (nextLocalUniqueKey || "en"));
        if (!nextLocalUniqueKey) {
            this.setDefaultTempLocal<TLocal>(localType, currentLang);
        }
        else {
            let tempLocal = this.localizations.find(local => local.langId == currentLang.id);
            if (!tempLocal && (!this.tempLocalValue || (this.tempLocalValue.langId != currentLang.id)) ) {
                this.setDefaultTempLocal<TLocal>(localType, currentLang);
                this.localizations.push(this.tempLocalValue);
            }
            else if (tempLocal && this.tempLocalValue ) {
                if(tempLocal.langId!=this.tempLocalValue.langId)
                {
                    this.tempLocalValue = tempLocal;
                }else{
                let languageIndex = this.localizations.findIndex(local => local.langId == currentLang.id);
                this.localizations[languageIndex] = this.tempLocalValue;
                }
            }
        }

        this.currentLocalUniqueKey = currentLang.uniqueKey;

        let defaultLocal = languageList.find(lang => lang.uniqueKey.toLowerCase() == "en");


        this.defaultLanguageId = defaultLocal.id;
        this.defaultLocalValue = this.localizations.find(local => local.langId == this.defaultLanguageId);
        if (!this.defaultLocalValue) {
            this.defaultLocalValue = this.tempLocalValue;
        }
        if (!this.tempLocalValue) {
            let _tempLocal = this.localizations.find(local => local.langId == currentLang.id);
            if (!_tempLocal) {
                this.tempLocalValue = this.defaultLocalValue;
            } else {
                this.tempLocalValue = _tempLocal;
            }
        }

        let currentLocalId = languageList.find(lang => lang.uniqueKey.toLowerCase() == this.currentLocalUniqueKey).id;

        this.isDefaultLocal = currentLocalId == this.defaultLanguageId;
        if (!this.isDefaultLocal) {
            let defaultLanguage = this.localizations.find(local => local.langId == this.defaultLanguageId);
            let defaultLanguageIndex = this.localizations.findIndex(local => local.langId == this.defaultLanguageId);
            if (!defaultLanguage) {
                const defaultLanguage = Object.assign(new LookupLocal(), { ...this.tempLocalValue, langId: this.defaultLanguageId })
                this.localizations.push(defaultLanguage);
            } else {
                if (!defaultLanguage.displayName) {
                    this.localizations[defaultLanguageIndex].displayName = this.tempLocalValue.displayName;
                }
            }
        }
    }

    tempLocalValue: any;
    defaultLocalValue: any;
    isDefaultLocal: boolean = true;
    currentLocalUniqueKey: any;

    isReadOnly: boolean = false;
    defaultLanguageId: number;

    localizations?: LookupLocal[] = [];
    languageList?: any[];

    private setDefaultTempLocal<TLocal>(localType: new () => TLocal, currentLang) {
        this.tempLocalValue = new localType();
        this.tempLocalValue.displayName = "";
        this.tempLocalValue.langId = currentLang.id;
        this.tempLocalValue.id = 0;
    }
}