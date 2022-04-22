export type Retryable = (reason: any) => Promise<any>;

export interface RetryOption {
  maxRetry?: number;
  retryInterval?: number;
}

function rejectDelay(retryInterval: number) {
  return (reason: any) =>
    new Promise((resolve, reject) => {
      setTimeout(reject.bind(null, reason), retryInterval);
    });
}

export function retry(attempt: Retryable, option?: RetryOption) {
  const defaultOption = { maxRetry: 3, retryInterval: 10000 };
  if (option) {
    option = { ...defaultOption, ...option };
  }

  let p: Promise<any> = Promise.reject();

  // Async retries can be achieved by building a .catch() chain, as opposed to the more usual .then() chain.
  for (let retried = 0; retried < option.maxRetry; retried++) {
    p = p.catch(attempt).catch(rejectDelay(option.retryInterval));
  }
  return p;
}
