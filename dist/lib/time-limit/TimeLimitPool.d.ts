import { ITimeController } from '@flemist/time-controller';
import { IPoolWrapper, PoolWrapper, PoolWrapperParams } from "../pool/PoolWrapper";
export interface ITimeLimitPool extends IPoolWrapper {
    time: number;
}
export declare type TimeLimitPoolParams = PoolWrapperParams & {
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
