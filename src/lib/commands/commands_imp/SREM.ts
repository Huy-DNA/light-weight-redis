import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
import SADDCommand from "./SADD";
export default class SREMCommand extends Command {
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
    if (!(res.value instanceof Set)) return Result.err("ERR type error");

    for (let value of this.values) {
      res.value.delete(value);
    }

    return Result.ok(res.value.size);
  }

  getRollbackCommand(store: Store): Result<Command> {
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (!(res.value instanceof Set)) return Result.err("ERR type error");

    const addList = this.values.filter(store.has);
    return Result.ok(new SADDCommand(this.key, addList));
  }
}
