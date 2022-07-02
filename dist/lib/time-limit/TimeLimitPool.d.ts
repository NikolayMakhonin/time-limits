import { ITimeController } from '@flemist/time-controller';
import { PoolWrapper } from "../pool/PoolWrapper";
import { IPool } from "../pool";
export interface ITimeLimitPool extends IPool {
    time: number;
}
export declare type TimeLimitPoolParams = {
    pool: IPool;
    time: number;
    timeController?: ITimeController;
};
export declare class TimeLimitPool extends PoolWrapper implements ITimeLimitPool {
    private readonly _time;
    private readonly _timeController;
    constructor({ pool, time, timeController, }: TimeLimitPoolParams);
    get time(): number;
    release(count: number): Promise<number>;
    private _release;
}
