import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
import SETCommand from "./SET";
import SADDCommand from "./SADD";
import CircularQueue from "../../utils/circularQueue";
import RPUSHCommand from "./RPUSH";
export default class DELCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(store: Store): Result<number> {
    if (!store.has(this.key)) return Result.err("ERR no value at this key");
    store.delete(this.key);
    return Result.ok(1);
  }

  getRollbackCommand(store: Store): Result<Command> {
    const value = store.get(this.key).value;
    if (!store.has(this.key) || value === null)
      return Result.err("ERR no value at this key");

    if (value instanceof Set)
      return Result.ok(new SADDCommand(this.key, [...value.values()]));
    if (value instanceof CircularQueue) {
      const list = [];
      for (let i = 0; i < value.length(); ++i)
        list.push(value.get(i).value as string);
      return Result.ok(new RPUSHCommand(this.key, list));
    }
    return Result.ok(new SETCommand(this.key, value));
  }
}
