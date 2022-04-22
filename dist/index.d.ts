export declare type Retryable = (reason: any) => Promise<any>;
export interface RetryOption {
    maxRetry?: number;
    retryInterval?: number;
}
export declare function retry(attempt: Retryable, option?: RetryOption): Promise<any>;
