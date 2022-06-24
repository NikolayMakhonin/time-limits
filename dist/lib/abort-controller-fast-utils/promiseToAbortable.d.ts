import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare function promiseToAbortable<T>(abortSignal: IAbortSignalFast | null, promise: Promise<T>): Promise<T>;
