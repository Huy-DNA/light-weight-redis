import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import SADDCommand from "./SADD";
export default class SREMCommand extends Command {
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
    if (!(value instanceof Set)) return Result.err("(ERR) type error");

    for (let v of this.values) {
      value.delete(v);
    }

    return Result.ok(value.size);
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (!(value instanceof Set)) return Result.err("(ERR) type error");

    const addList = this.values.filter(store.has);
    return Result.ok(new SADDCommand(this.key, addList));
  }

  toString(): string {
    return `SREM ${this.key} ${this.values.join(" ")}`;
  }
}
