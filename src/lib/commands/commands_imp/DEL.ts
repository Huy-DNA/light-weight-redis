import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
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

  execute(mediator: StoreMediator): Result<number> {
    const store = mediator.getStore();
    if (!store.has(this.key)) return Result.err("No value at this key");
    mediator.clearTimeout(this.key);
    store.delete(this.key);
    return Result.ok(1);
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (value === undefined) return Result.err("No value at this key");

    if (value instanceof Set)
      return Result.ok(new SADDCommand(this.key, [...value.values()]));
    if (value instanceof CircularQueue) {
      const list = [];
      for (let i = 0; i < value.length(); ++i) list.push(value.get(i));
      return Result.ok(new RPUSHCommand(this.key, list));
    }
    return Result.ok(new SETCommand(this.key, value));
  }

  toString(): string {
    return `DEL ${this.key}`;
  }
}
