class PoolHoldError extends Error {
    constructor(count) {
        super(`Pool hold(${count}) failed`);
        this.count = count;
    }
}

export { PoolHoldError };
