import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
import SREMCommand from "./SREM";
export default class SADDCommand extends Command {
  key: string;
  values: Array<string>;

  constructor(key: string, values: Array<string>) {
    super();
    this.key = key;
    this.values = values;
  }

  execute(store: Store): Result<number> {
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (res.value !== null && !(res.value instanceof Set))
      return Result.err("ERR type error");

    if (res.value === null) {
      const set = new Set<string>();
      for (let value of this.values) set.add(value);
      store.set(this.key, set);

      return Result.ok(this.values.length);
    }

    for (let value of this.values) {
      res.value.add(value);
    }

    return Result.ok(res.value.size);
  }

  getRollbackCommand(store: Store): Result<Command> {
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (!(res.value instanceof Set)) return Result.err("ERR type error");

    const deleteList = this.values.filter((value) => !store.has(value));
    return Result.ok(new SREMCommand(this.key, deleteList));
  }
}
