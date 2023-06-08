import Result from "../result";

export default class CircularQueue<T> {
  #head: number = 0;
  #size: number = 0;
  #capacity: number = 1;
  #buffer: Array<T> = [];

  shift(): Result<T> {
    if (this.#size === 0)
      return Result.err("ERR trying to shift an empty queue");
    const res = Result.ok(this.#buffer[this.#head]);
    this.#head = (this.#head + 1) % this.#capacity;
    this.#size -= 1;
    return res;
  }

  unshift(value: T) {
    if (this.#size === this.#capacity) this.#expand();
    this.#head = (this.#head - 1) % this.#capacity;
    this.#buffer[this.#head] = value;
    this.#size += 1;
  }

  push(value: T) {
    if (this.#size === this.#capacity) this.#expand();
    this.#buffer[(this.#head + this.#size) % this.#capacity] = value;
    this.#size += 1;
  }

  pop(): Result<T> {
    if (this.#size === 0) return Result.err("ERR trying to pop an empty queue");
    const res = Result.ok(
      this.#buffer[(this.#head + this.#size - 1) % this.#capacity]
    );
    this.#size -= 1;
    return res;
  }

  get(index: number): Result<T> {
    if (index < 0 || index >= this.#size)
      return Result.err("Err index out of range");
    const phyIndex = (index + this.#head) % this.#capacity;
    return Result.ok(this.#buffer[phyIndex]);
  }

  #expand() {
    const tempBuffer = [];
    for (let i = 0; i < this.#size; ++i) {
      tempBuffer[i] = this.#buffer[(this.#head + i) % this.#capacity];
    }
    this.#buffer = tempBuffer;
    this.#head = 0;
    this.#capacity *= 6;
  }
}
