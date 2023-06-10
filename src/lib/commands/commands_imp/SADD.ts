import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import SREMCommand from "./SREM";
import DELCommand from "./DEL";
export default class SADDCommand extends Command {
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
    
    if (value === undefined) {
      const set = new Set<string>();
      for (let v of this.values) set.add(v);
      store.set(this.key, set);

      return Result.ok(this.values.length);
    }

    if (!(value instanceof Set)) return Result.err("Type error");

    mediator.clearTimeout(this.key);
    for (let v of this.values) {
      value.add(v);
    }

    return Result.ok(value.size);
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (value === undefined) return Result.ok(new DELCommand(this.key));
    if (!(value instanceof Set)) return Result.err("Type error");

    const deleteList = this.values.filter((value) => !store.has(value));
    return Result.ok(new SREMCommand(this.key, deleteList));
  }

  toString(): string {
    return `SADD ${this.key} ${this.values.join(" ")}`;
  }
}
