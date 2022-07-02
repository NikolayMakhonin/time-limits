import {ITimeController, timeControllerDefault} from '@flemist/time-controller'
import {delay} from '@flemist/async-utils'
import {IPoolWrapper, PoolWrapper} from 'src/pool/PoolWrapper'
import {IPool} from 'src/pool'

export interface ITimeLimitPool extends IPoolWrapper {
  time: number
}

export type TimeLimitPoolParams = {
  pool: IPool,
  time: number,
  timeController?: ITimeController,
}

export class TimeLimitPool extends PoolWrapper implements ITimeLimitPool {
  private readonly _time: number
  private readonly _timeController: ITimeController

  constructor({
    pool,
    time,
    timeController,
  }: TimeLimitPoolParams) {
    super(pool)
    this._time = time
    this._timeController = timeController || timeControllerDefault
  }

  get time(): number {
    return this._time
  }

  async release(count: number) {
    await delay(this._time, null, this._timeController)
    return this._release(count)
  }

  private _release(count: number) {
    return this._pool.release(count)
  }
}
