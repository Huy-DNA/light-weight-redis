import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
import CircularQueue from "../../utils/circularQueue";
import RPOPCommand from "./RPOP";
export default class RPUSHCommand extends Command {
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
    if (res.value !== null && !(res.value instanceof CircularQueue))
      return Result.err("ERR type error");

    if (res.value === null) {
      const list = new CircularQueue<string>();
      for (let value of this.values) list.push(value);
      store.set(this.key, list);

      return Result.ok(this.values.length);
    }

    for (let value of this.values) {
      res.value.push(value);
    }

    return Result.ok(res.value.length());
  }

  getRollbackCommand(store: Store): Result<Command> {
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (!(res.value instanceof CircularQueue))
      return Result.err("ERR type error");

    return Result.ok(new RPOPCommand(this.key));
  }
}
