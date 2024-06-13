import { IConsoleErrorType, IELBindType, IErrorType, IXhrOpenType } from '@log-reporting/types';
/**
 * @description 错误栈读取对应的栈信息
 * @param stack
 */
export declare function formatStack(stack?: string, line?: number): string;
export declare function getErrorStackLine(e: Error): Partial<IConsoleErrorType>;
export declare function getErrorElInfo(elTarget?: Node | Element): IELBindType;
export declare function getError(e: ErrorEvent): IErrorType;
export declare function getPromiseError(e: PromiseRejectionEvent): IErrorType;
export declare function getXhrError(
  e: Event,
  questOptions: IXhrOpenType,
): IErrorType & {
  questOptions: IXhrOpenType;
};
export declare function getFetchError(
  questOptions: IXhrOpenType,
  otherOptions?: Partial<IConsoleErrorType>,
): {
  errorMessage?: string | undefined;
  time?: number | undefined;
  colno?: number | undefined;
  lineno?: number | undefined;
  stackMessage?: string | undefined;
  fileName?: string | undefined;
  questOptions: IXhrOpenType;
  el: IELBindType;
};
