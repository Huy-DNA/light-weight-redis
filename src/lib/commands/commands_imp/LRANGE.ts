import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import CircularQueue from "../../utils/circularQueue";
export default class LRANGECommand extends Command {
  key: string;
  start: number;
  stop: number;

  constructor(key: string, start: number, stop: number) {
    super();
    this.key = key;
    this.start = start;
    this.stop = stop;
  }

  execute(mediator: StoreMediator): Result<Array<string>> {
    const store = mediator.getStore();
    if (this.start < 0 || this.stop < 0)
      return Result.err("Index out-of-bound");
    if (this.start > this.stop)
      return Result.err("<start> should be no greater than <stop>.");
    const value = store.get(this.key);
    if (value === undefined) return Result.err("No value at this key");
    if (!(value instanceof CircularQueue)) return Result.err("Type error");
    if (this.start >= value.length() || this.stop >= value.length())
      return Result.err("Index out-of-bound");

    const range: Array<string> = [];
    for (let i = this.start; i <= this.stop; ++i) range.push(value.get(i));
    return Result.ok(range);
  }

  toString(): string {
    return `LRANGE ${this.key} ${this.start} ${this.stop}`;
  }
}
