import {ReleaseDelayPool, ReleaseDelayPoolParams} from 'src/ReleaseDelayPool'
import {PoolRunner} from 'src/PoolRunner'

export type TimeLimitRunner = ReleaseDelayPoolParams & PoolRunner & {}

export function createTimeLimitRunner({
  pool,
  releaseDelay,
  timeController,
}: TimeLimitRunner) {
  const releaseDelayPool = new ReleaseDelayPool({
    pool,
    releaseDelay,
    timeController,
  })

  const runner = new PoolRunner({pool: releaseDelayPool})

  return runner
}
