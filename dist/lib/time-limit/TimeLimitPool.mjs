import { __awaiter } from 'tslib';
import { timeControllerDefault } from '@flemist/time-controller';
import { delay } from '@flemist/async-utils';
import { PoolWrapper } from '../pool/PoolWrapper.mjs';

class TimeLimitPool extends PoolWrapper {
    constructor({ pool, time, timeController, }) {
        super({ pool });
        this._time = time;
        this._timeController = timeController || timeControllerDefault;
    }
    get time() {
        return this._time;
    }
    release(count) {
        return __awaiter(this, void 0, void 0, function* () {
            yield delay(this._time, null, this._timeController);
            return this._release(count);
        });
    }
    _release(count) {
        return this._pool.release(count);
    }
}

export { TimeLimitPool };
