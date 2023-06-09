import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import CircularQueue from "../../utils/circularQueue";
export default class LLENCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(mediator: StoreMediator): Result<number> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (!(value instanceof CircularQueue)) return Result.err("(ERR) type error");
    return Result.ok(value.length());
  }

  toString(): string {
    return `LLEN ${this.key}`;
  }
}
