import { IPool } from "./..";
export declare function poolRunThrow<T>(pool: IPool, count: number, func: () => T): T;
