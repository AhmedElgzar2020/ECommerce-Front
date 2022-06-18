// import { DefinitionCommonModel } from '@linkdev/shared-library';
import { DefinitionCommonModel } from './definitionCommonModel';

import { LookupChildItem } from "./lookupChildItem";
import { LookupLocal } from "./LookupLocal";

export class LookupChild extends DefinitionCommonModel<LookupLocal> {
    constructor() {
        super();
    }
    id?: number;
    lookupName?: string;
    displayName?: string;
    parentKey?: string;
    level?: number;
    items?: LookupChildItem[];
}