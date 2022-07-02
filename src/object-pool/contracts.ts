import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {Priority} from "@flemist/priority-queue";

export interface IPool {
	readonly size: number
	readonly maxSize: number

	holdAvailable: number
	hold(count: number): boolean
	/** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */

	releaseAvailable: number
	release(count: number): Promise<number> | number

	/** it will resolve when size > 0 */
	tick(abortSignal?: IAbortSignalFast): Promise<void>

	/** wait size > 0 and hold, use this for concurrency hold */
	holdWait(
		count: number,
		priority?: Priority,
		abortSignal?: IAbortSignalFast,
		/** throws error if count < holdAvailable */
		force?: boolean,
	): Promise<void>
}

export interface IStackPool<TObject> {
	readonly objects: ReadonlyArray<TObject>
	readonly size: number
	get(): TObject
	release(obj: TObject): void
}

export interface IObjectPool<TObject extends object> {
	readonly available: number
	readonly maxSize: number

	readonly availableObjects: ReadonlyArray<TObject>
	readonly holdObjects?: ReadonlySet<TObject>

	get(): TObject
	/** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
	release(obj: TObject): boolean

	/** it will resolve when size > 0 */
	tick(abortSignal?: IAbortSignalFast): Promise<void>
	/** wait available > 0 and get, use this for concurrency get */
	getWait(abortSignal?: IAbortSignalFast): Promise<TObject>

	use<TResult>(
		func: (obj: TObject, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult,
		abortSignal?: IAbortSignalFast,
	): Promise<TResult>

	allocate<TResult extends PromiseLike<TObject>|TObject>(
		size?: number,
	): TResult extends PromiseLike<any> ? Promise<void> : void
}
