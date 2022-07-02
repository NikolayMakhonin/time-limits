function slice(arr, start, end) {
    const size = end - start;
    const result = new Array(size);
    for (let i = 0; i < size; i++) {
        result[i] = arr[start + i];
    }
    return result;
}
class StackPool {
    constructor() {
        this._objects = [];
    }
    get objects() {
        return this._objects;
    }
    get size() {
        return this._objects.length;
    }
    get(count) {
        const len = this._objects.length;
        if (count > len) {
            count = len;
        }
        const start = len - count;
        const objects = slice(this._objects, start, start + count);
        this._objects.length = start;
        return objects;
    }
    release(objects, start, end) {
        if (start == null) {
            start = 0;
        }
        if (end == null) {
            end = objects.length;
        }
        for (let i = start; i < end; i++) {
            const obj = objects[i];
            if (obj != null) {
                this._objects.push(obj);
            }
        }
    }
}

export { StackPool };
