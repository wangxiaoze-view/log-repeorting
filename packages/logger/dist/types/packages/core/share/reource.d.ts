import { IReource } from '@log-reporting/types';
export declare class Reource {
    data: Partial<IReource>[];
    constructor(reource: Partial<IReource>[]);
}
export declare let reource: Reource;
export declare function initReourceOptions(reourceData: Partial<IReource>[]): void;
