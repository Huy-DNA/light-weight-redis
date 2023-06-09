import CircularQueue from "./utils/circularQueue";

type Value = string | CircularQueue<string> | Set<string>;

export default class Store {
  #keyValueStore: Map<string, Value>;

  constructor() {
    this.#keyValueStore = new Map();
  }

  get(key: string): Value | undefined {
    return this.#keyValueStore.get(key);
  }

  set(key: string, value: Value) {
    this.#keyValueStore.set(key, value);
  }

  delete(key: string) {
    this.#keyValueStore.delete(key);
  }

  has(key: string): boolean {
    return this.#keyValueStore.has(key);
  }

  keys(): Array<string> {
    return [...this.#keyValueStore.keys()];
  }
}
