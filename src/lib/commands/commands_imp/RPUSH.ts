import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import CircularQueue from "../../utils/circularQueue";
import RPOPCommand from "./RPOP";
import DELCommand from "./DEL";
export default class RPUSHCommand extends Command {
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
      for (let value of this.values) list.push(value);
      store.set(this.key, list);

      return Result.ok(this.values.length);
    }

    for (let v of this.values) {
      value.push(v);
    }

    return Result.ok(value.length());
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (value === undefined) return Result.ok(new DELCommand(this.key));
    if (!(value instanceof CircularQueue)) return Result.err("Type error");

    return Result.ok(new RPOPCommand(this.key));
  }

  toString(): string {
    return `RPUSH ${this.key} ${this.values.join(" ")}`;
  }
}
