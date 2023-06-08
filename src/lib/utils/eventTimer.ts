export default class EventTimer {
  #timerID: number;
  #timeoutTimestampInMs: number;

  constructor(callback: Function, milliseconds: number) {
    this.#timerID = setTimeout(callback, milliseconds);
    this.#timeoutTimestampInMs = Date.now() + this.#timerID;
  }

  clear() {
    clearTimeout(this.#timerID);
  }

  getRemainingTime(): number {
    return Date.now() - this.#timeoutTimestampInMs;
  }
}
