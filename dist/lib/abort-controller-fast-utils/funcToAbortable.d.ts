import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare function funcToAbortable<T>(abortSignal: IAbortSignalFast | null, func: (abortPromise?: Promise<any>) => Promise<T> | T): Promise<T>;
