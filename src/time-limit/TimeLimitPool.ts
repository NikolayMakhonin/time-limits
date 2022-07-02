import {ITimeController, timeControllerDefault} from '@flemist/time-controller'
import {delay} from '@flemist/async-utils'
import {IPoolWrapper, PoolWrapper, PoolWrapperParams} from 'src/pool/PoolWrapper'

export interface ITimeLimitPool extends IPoolWrapper {
  releaseDelay: number
}

export type TimeLimitPoolParams = PoolWrapperParams & {
  releaseDelay: number,
  timeController?: ITimeController,
}

export class TimeLimitPool extends PoolWrapper implements ITimeLimitPool {
  private readonly _releaseDelay: number
  private readonly _timeController: ITimeController

  constructor({
    pool,
    releaseDelay,
    timeController,
  }: TimeLimitPoolParams) {
    super({pool})
    this._releaseDelay = releaseDelay
    this._timeController = timeController || timeControllerDefault
  }

  get releaseDelay(): number {
    return this._releaseDelay
  }

  async release(count: number) {
    await delay(this._releaseDelay, null, this._timeController)
    return this._release(count)
  }

  private _release(count: number) {
    return this._pool.release(count)
  }
}
