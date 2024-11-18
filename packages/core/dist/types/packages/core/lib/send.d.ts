import { EVENT_TYPES } from '../enum';
export declare function encryptFun(value: Record<string, any>, k?: string): any;
export declare function decryptionFun(value: string, k: string): any;
export declare function sendReport(eventId: EVENT_TYPES, errorData: Record<string, any>): Promise<unknown>;
