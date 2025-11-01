import { IPool } from './Pool';
import { type PromiseLikeOrValue } from '@flemist/async-utils';
export declare function poolRunThrow<Result>(pool: IPool, count: number, func: (() => Result) | null | undefined): Result;
export declare function poolRunThrow<Result>(pool: IPool, count: number, func: (() => PromiseLikeOrValue<Result>) | null | undefined): PromiseLikeOrValue<Result>;
