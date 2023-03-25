import { IPool } from "./..";
import { FuncAny } from "../contracts";
export declare function toFuncWithPoolThrow<TFunc extends FuncAny>(pool: IPool, count: number, func: TFunc): TFunc;
export declare function runPoolThrow<T>(pool: IPool, count: number, func: () => T): T;
