export interface IStackPool<TObject> {
    readonly objects: ReadonlyArray<TObject>;
    readonly size: number;
    get(count: number): TObject[];
    release(objects: TObject[], start?: number, end?: number): void;
}
export declare class StackPool<TObject> implements IStackPool<TObject> {
    private readonly _objects;
    get objects(): ReadonlyArray<TObject>;
    get size(): number;
    get(count: number): TObject[];
    release(objects: TObject[], start?: number, end?: number): void;
}
