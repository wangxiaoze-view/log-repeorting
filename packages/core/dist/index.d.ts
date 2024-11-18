import { IWindow, LogReportingType, IExposure, IPv, IBaseOptions } from '@log-reporting/types';

declare const _global: IWindow;
declare const _support: LogReportingType;

declare enum EVENT_TYPES {
    ERROR = "error",
    UNHANDLEDREJECTION = "unhandledrejection",
    CONSOLE_ERROR = "consoleError",
    XHR = "xhr",
    FETCH = "fetch",
    PV = "pv",
    EXPOSURE = "exposure"
}
declare enum ERROR_TYPES {
    JS = "js_error",
    PROMISE = "promise_error",
    CONSOLE_ERROR = "console_error",
    XHR = "xhr_error",
    FETCH = "fetch_error"
}

declare function encryptFun(value: Record<string, any>, k?: string): string;
declare function decryptionFun(value: string, k: string): string;

declare function lestenExposure(target: IExposure[] | IExposure): void;

declare function lestenPv(options: IPv): void;

declare function getNavigator(): {
    platform: string | number | boolean | Clipboard | CredentialsContainer | Geolocation | MediaCapabilities | MediaDevices | MediaSession | Permissions | ServiceWorkerContainer | UserActivation | WakeLock | ((data?: ShareData) => boolean) | ((options?: MIDIOptions) => Promise<MIDIAccess>) | {
        (keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
        (keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    } | ((url: string | URL, data?: BodyInit | null) => boolean) | ((data?: ShareData) => Promise<void>) | {
        (pattern: VibratePattern): boolean;
        (pattern: Iterable<number>): boolean;
    } | ((contents?: number) => Promise<void>) | ((scheme: string, url: string | URL) => void) | readonly string[] | LockManager | MimeTypeArray | PluginArray | StorageManager | null;
    appName: string | number | boolean | Clipboard | CredentialsContainer | Geolocation | MediaCapabilities | MediaDevices | MediaSession | Permissions | ServiceWorkerContainer | UserActivation | WakeLock | ((data?: ShareData) => boolean) | ((options?: MIDIOptions) => Promise<MIDIAccess>) | {
        (keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
        (keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    } | ((url: string | URL, data?: BodyInit | null) => boolean) | ((data?: ShareData) => Promise<void>) | {
        (pattern: VibratePattern): boolean;
        (pattern: Iterable<number>): boolean;
    } | ((contents?: number) => Promise<void>) | ((scheme: string, url: string | URL) => void) | readonly string[] | LockManager | MimeTypeArray | PluginArray | StorageManager | null;
    appVersion: string | number | boolean | Clipboard | CredentialsContainer | Geolocation | MediaCapabilities | MediaDevices | MediaSession | Permissions | ServiceWorkerContainer | UserActivation | WakeLock | ((data?: ShareData) => boolean) | ((options?: MIDIOptions) => Promise<MIDIAccess>) | {
        (keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
        (keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    } | ((url: string | URL, data?: BodyInit | null) => boolean) | ((data?: ShareData) => Promise<void>) | {
        (pattern: VibratePattern): boolean;
        (pattern: Iterable<number>): boolean;
    } | ((contents?: number) => Promise<void>) | ((scheme: string, url: string | URL) => void) | readonly string[] | LockManager | MimeTypeArray | PluginArray | StorageManager | null;
    appCodeName: string | number | boolean | Clipboard | CredentialsContainer | Geolocation | MediaCapabilities | MediaDevices | MediaSession | Permissions | ServiceWorkerContainer | UserActivation | WakeLock | ((data?: ShareData) => boolean) | ((options?: MIDIOptions) => Promise<MIDIAccess>) | {
        (keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
        (keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    } | ((url: string | URL, data?: BodyInit | null) => boolean) | ((data?: ShareData) => Promise<void>) | {
        (pattern: VibratePattern): boolean;
        (pattern: Iterable<number>): boolean;
    } | ((contents?: number) => Promise<void>) | ((scheme: string, url: string | URL) => void) | readonly string[] | LockManager | MimeTypeArray | PluginArray | StorageManager | null;
    vendor: string | number | boolean | Clipboard | CredentialsContainer | Geolocation | MediaCapabilities | MediaDevices | MediaSession | Permissions | ServiceWorkerContainer | UserActivation | WakeLock | ((data?: ShareData) => boolean) | ((options?: MIDIOptions) => Promise<MIDIAccess>) | {
        (keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
        (keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    } | ((url: string | URL, data?: BodyInit | null) => boolean) | ((data?: ShareData) => Promise<void>) | {
        (pattern: VibratePattern): boolean;
        (pattern: Iterable<number>): boolean;
    } | ((contents?: number) => Promise<void>) | ((scheme: string, url: string | URL) => void) | readonly string[] | LockManager | MimeTypeArray | PluginArray | StorageManager | null;
    userAgent: string | number | boolean | Clipboard | CredentialsContainer | Geolocation | MediaCapabilities | MediaDevices | MediaSession | Permissions | ServiceWorkerContainer | UserActivation | WakeLock | ((data?: ShareData) => boolean) | ((options?: MIDIOptions) => Promise<MIDIAccess>) | {
        (keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
        (keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    } | ((url: string | URL, data?: BodyInit | null) => boolean) | ((data?: ShareData) => Promise<void>) | {
        (pattern: VibratePattern): boolean;
        (pattern: Iterable<number>): boolean;
    } | ((contents?: number) => Promise<void>) | ((scheme: string, url: string | URL) => void) | readonly string[] | LockManager | MimeTypeArray | PluginArray | StorageManager | null;
    onLine: string | number | boolean | Clipboard | CredentialsContainer | Geolocation | MediaCapabilities | MediaDevices | MediaSession | Permissions | ServiceWorkerContainer | UserActivation | WakeLock | ((data?: ShareData) => boolean) | ((options?: MIDIOptions) => Promise<MIDIAccess>) | {
        (keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
        (keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    } | ((url: string | URL, data?: BodyInit | null) => boolean) | ((data?: ShareData) => Promise<void>) | {
        (pattern: VibratePattern): boolean;
        (pattern: Iterable<number>): boolean;
    } | ((contents?: number) => Promise<void>) | ((scheme: string, url: string | URL) => void) | readonly string[] | LockManager | MimeTypeArray | PluginArray | StorageManager | null;
    language: string | number | boolean | Clipboard | CredentialsContainer | Geolocation | MediaCapabilities | MediaDevices | MediaSession | Permissions | ServiceWorkerContainer | UserActivation | WakeLock | ((data?: ShareData) => boolean) | ((options?: MIDIOptions) => Promise<MIDIAccess>) | {
        (keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
        (keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    } | ((url: string | URL, data?: BodyInit | null) => boolean) | ((data?: ShareData) => Promise<void>) | {
        (pattern: VibratePattern): boolean;
        (pattern: Iterable<number>): boolean;
    } | ((contents?: number) => Promise<void>) | ((scheme: string, url: string | URL) => void) | readonly string[] | LockManager | MimeTypeArray | PluginArray | StorageManager | null;
    product: string | number | boolean | Clipboard | CredentialsContainer | Geolocation | MediaCapabilities | MediaDevices | MediaSession | Permissions | ServiceWorkerContainer | UserActivation | WakeLock | ((data?: ShareData) => boolean) | ((options?: MIDIOptions) => Promise<MIDIAccess>) | {
        (keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
        (keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    } | ((url: string | URL, data?: BodyInit | null) => boolean) | ((data?: ShareData) => Promise<void>) | {
        (pattern: VibratePattern): boolean;
        (pattern: Iterable<number>): boolean;
    } | ((contents?: number) => Promise<void>) | ((scheme: string, url: string | URL) => void) | readonly string[] | LockManager | MimeTypeArray | PluginArray | StorageManager | null;
    productSub: string | number | boolean | Clipboard | CredentialsContainer | Geolocation | MediaCapabilities | MediaDevices | MediaSession | Permissions | ServiceWorkerContainer | UserActivation | WakeLock | ((data?: ShareData) => boolean) | ((options?: MIDIOptions) => Promise<MIDIAccess>) | {
        (keySystem: string, supportedConfigurations: MediaKeySystemConfiguration[]): Promise<MediaKeySystemAccess>;
        (keySystem: string, supportedConfigurations: Iterable<MediaKeySystemConfiguration>): Promise<MediaKeySystemAccess>;
    } | ((url: string | URL, data?: BodyInit | null) => boolean) | ((data?: ShareData) => Promise<void>) | {
        (pattern: VibratePattern): boolean;
        (pattern: Iterable<number>): boolean;
    } | ((contents?: number) => Promise<void>) | ((scheme: string, url: string | URL) => void) | readonly string[] | LockManager | MimeTypeArray | PluginArray | StorageManager | null;
    windowWidth: number;
    windowHeight: number;
    colorDepth: number;
};

declare const _name: string;
declare const _version: string;
declare const _author: string;
declare const _description: string;
declare const init: (options?: IBaseOptions) => void;

export { ERROR_TYPES, EVENT_TYPES, _author, _description, _global, _name, _support, _version, decryptionFun, encryptFun, getNavigator, init, lestenExposure, lestenPv };
