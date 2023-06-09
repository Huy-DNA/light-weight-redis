import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import CircularQueue from "../../utils/circularQueue";
import LPOPCommand from "./LPOP";
export default class LPUSHCommand extends Command {
  key: string;
  values: Array<string>;

  constructor(key: string, values: Array<string>) {
    super();
    this.key = key;
    this.values = values;
  }

  execute(mediator: StoreMediator): Result<number> {
    const store = mediator.getStore();
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (res.value !== null && !(res.value instanceof CircularQueue))
      return Result.err("ERR type error");

    if (res.value === null) {
      const list = new CircularQueue<string>();
      for (let value of this.values) list.unshift(value);
      store.set(this.key, list);

      return Result.ok(this.values.length);
    }

    for (let value of this.values) {
      res.value.unshift(value);
    }

    return Result.ok(res.value.length());
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (!(res.value instanceof CircularQueue))
      return Result.err("ERR type error");

    return Result.ok(new LPOPCommand(this.key));
  }
  toString(): string {
    return `LPUSH ${this.key} ${this.values.join(" ")}`;
  }
}
