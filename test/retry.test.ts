import { retry } from "../src";

describe("retry", () => {
  test("should calls mock function 3 times within 3 seconds", async () => {
    const mockFn = jest.fn();
    const start = Date.now();
    function attempt() {
      return new Promise((resolve, reject) => {
        mockFn();
        reject("REJECT");
      });
    }

    try {
      await retry(attempt, { maxRetry: 3, retryInterval: 1000 });
    } catch (error) {
      expect(error).toBe("REJECT");
    }

    const elapsedTime = Date.now() - start;

    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(elapsedTime).toBeGreaterThanOrEqual(3000);
  });
});
