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
      return Result.err("ERR index out-of-bound");
    if (this.start > this.stop)
      return Result.err("ERR <start> should be no greater than <stop>.");
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (!(res.value instanceof CircularQueue))
      return Result.err("ERR type error");
    if (this.start >= res.value.length() || this.stop >= res.value.length())
      return Result.err("ERR index out-of-bound");

    const range: Array<string> = [];
    for (let i = this.start; i <= this.stop; ++i)
      range.push(res.value.get(i).value as string);
    return Result.ok(range);
  }
}
