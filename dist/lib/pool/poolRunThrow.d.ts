import { IPool } from './Pool';
import { type PromiseLikeOrValue, type PromiseOrValue } from '@flemist/async-utils';
export declare function poolRunThrow<Result>(pool: IPool, count: number, func: (() => Result) | null | undefined): Result;
export declare function poolRunThrow<Result>(pool: IPool, count: number, func: (() => PromiseLikeOrValue<Result>) | null | undefined): PromiseOrValue<Result>;
