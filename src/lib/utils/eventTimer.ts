export default class EventTimer {
  #timerID: number;
  #timeoutTimestampInMs: number;

  constructor(callback: Function, milliseconds: number) {
    this.#timerID = setTimeout(callback, milliseconds);
    this.#timeoutTimestampInMs = Date.now() + milliseconds;
  }

  clear() {
    clearTimeout(this.#timerID);
  }

  getRemainingTime(): number {
    return Date.now() - this.#timeoutTimestampInMs;
  }
}
