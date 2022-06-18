import { LookupLocal } from "./LookupLocal";
import { DefinitionCommonModel } from './definitionCommonModel';

export class LookupChildItem extends DefinitionCommonModel<LookupLocal> {
    constructor() {
        super();
        this.setDisplayNameAndSubLevels();
    }

    id?: number;
    uniqueKey?: string;
    displayName?: string;
    localizations?: LookupLocal[] = [];
    parentId?: number;
    currentLocalDisplayName: string;
    altDisplayName: string;

    setDisplayNameAndSubLevels(): void {
        this.displayName = this.defaultLocalValue ? this.defaultLocalValue?.displayName : this.uniqueKey;
        this.altDisplayName = this.tempLocalValue ? this.tempLocalValue?.displayName : null;
        this.currentLocalDisplayName = this.tempLocalValue ? (this.tempLocalValue?.displayName ? this.tempLocalValue?.displayName : this.displayName) : this.displayName;
    }
}