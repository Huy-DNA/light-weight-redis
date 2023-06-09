import CircularQueue from "./utils/circularQueue";
import Command from "./commands/command";
import Result from "./result";

type Value = string | CircularQueue<string> | Set<string>;

type TimedValue = {
  value: Value;
  timeout: number;
};
export default class Store {
  #keyValueStore: Map<string, TimedValue>;

  constructor() {
    this.#keyValueStore = new Map();
  }

  get(key: string): Result<Value> {
    const timedValue = this.#keyValueStore.get(key);

    if (timedValue === undefined) return Result.err("ERR no value at this key");

    if (timedValue.timeout >= 0 && Date.now() >= timedValue.timeout) {
      this.delete(key);
      return Result.err("ERR no value at this key");
    }

    return Result.ok(timedValue.value);
  }

  getTimeout(key: string): Result<number> {
    const timedValue = this.#keyValueStore.get(key);

    if (timedValue === undefined) return Result.err("ERR no value at this key");

    const ttl = Date.now() - timedValue.timeout;
    if (timedValue.timeout >= 0 && ttl >= 0) {
      this.delete(key);
      return Result.err("ERR no value at this key");
    }

    return Result.ok(ttl);
  }

  set(key: string, value: Value): Result<number> {
    this.#keyValueStore.set(key, {
      value,
      timeout: -1,
    });

    return Result.ok(1);
  }

  setTimeout(key: string, timeoutInMs: number): Result<number> {
    const timedValue = this.#keyValueStore.get(key);
    if (timedValue === undefined) return Result.err("ERR no value at this key");
    timedValue.timeout = Date.now() + timeoutInMs;
    return Result.ok(1);
  }

  delete(key: string) {
    this.#keyValueStore.delete(key);
  }

  has(key: string): boolean {
    const timedValue = this.#keyValueStore.get(key);
    if (timedValue === undefined) return false;
    if (Date.now() >= timedValue.timeout) {
      this.delete(key);
      return false;
    }
    return true;
  }

  keys(): Array<string> {
    return [...this.#keyValueStore.keys()];
  }
}
