import { ColumnMetadata } from './columnMetadata';
import { ColumnLocalMetadata } from './columnLocalMetadata';

export interface AddtionalCoulmns {
    columns: ColumnMetadata[];
    columnsLocal: ColumnLocalMetadata[];
}