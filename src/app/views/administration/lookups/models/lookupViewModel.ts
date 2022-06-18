import { LookupChild } from "./lookupChild";
import { LookupLocal } from "./LookupLocal";
import { DefinitionCommonModel } from './definitionCommonModel';

export class LookupViewModel extends DefinitionCommonModel<LookupLocal>
{
    constructor() {
        super();
    }
    isEdit: boolean;
    lookupDisplayName?: string;
    lookupName: string;
    createdBy: string
    description: string;
    isReadOnly: boolean;
    createdByName: any;
    lookupOrder: number;
    modifiedByName: any;
    createdAt: any;
    modifiedAt: any;
    currentLocalDisplayName: string;
    altDisplayName: string;

    id?: number
    uniqueKey?: string;
    displayName?: string;
    lookupChildren?: LookupChild[];

    setDisplayNameAndSubLevels(): void {
        this.displayName = this.defaultLocalValue ? this.defaultLocalValue?.displayName : this.uniqueKey;
        this.altDisplayName = this.tempLocalValue ? this.tempLocalValue?.displayName : null;
        this.currentLocalDisplayName = this.tempLocalValue ? (this.tempLocalValue?.displayName ? this.tempLocalValue?.displayName : this.displayName) : this.displayName;
    }
}

