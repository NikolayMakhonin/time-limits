function promiseToAbortable(abortSignal, promise) {
    return new Promise(function executor(resolve, reject) {
        if (abortSignal && abortSignal.aborted) {
            reject(abortSignal.reason);
            return;
        }
        let unsubscribe;
        function onResolve(value) {
            if (unsubscribe) {
                unsubscribe();
            }
            resolve(value);
        }
        let rejected;
        function onReject(value) {
            if (rejected) {
                return;
            }
            rejected = true;
            if (unsubscribe) {
                unsubscribe();
            }
            reject(value);
        }
        promise
            .then(onResolve)
            .catch(onReject);
        if (abortSignal) {
            unsubscribe = abortSignal.subscribe(onReject);
        }
    });
}

export { promiseToAbortable };
