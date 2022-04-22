"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = void 0;
function rejectDelay(retryInterval) {
    return (reason) => new Promise((resolve, reject) => {
        setTimeout(reject.bind(null, reason), retryInterval);
    });
}
function retry(attempt, option) {
    const defaultOption = { maxRetry: 3, retryInterval: 10000 };
    if (option) {
        option = Object.assign(Object.assign({}, defaultOption), option);
    }
    let p = Promise.reject();
    for (let retried = 0; retried < option.maxRetry; retried++) {
        p = p.catch(attempt).catch(rejectDelay(option.retryInterval));
    }
    return p;
}
exports.retry = retry;
//# sourceMappingURL=index.js.map