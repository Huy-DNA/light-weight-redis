import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import CircularQueue from "../../utils/circularQueue";
import LPOPCommand from "./LPOP";
import DELCommand from "./DEL";
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
    const value = store.get(this.key);
    if (value !== undefined && !(value instanceof CircularQueue))
      return Result.err("Type error");

    if (value === undefined) {
      const list = new CircularQueue<string>();
      for (let v of this.values) list.unshift(v);
      store.set(this.key, list);

      return Result.ok(this.values.length);
    }

    for (let v of this.values) {
      value.unshift(v);
    }

    return Result.ok(value.length());
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (value === undefined) return Result.ok(new DELCommand(this.key));
    if (!(value instanceof CircularQueue)) return Result.err("Type error");

    return Result.ok(new LPOPCommand(this.key));
  }
  toString(): string {
    return `LPUSH ${this.key} ${this.values.join(" ")}`;
  }
}
