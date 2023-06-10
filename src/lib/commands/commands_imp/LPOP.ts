import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import CircularQueue from "../../utils/circularQueue";
import LPUSHCommand from "./LPUSH";
export default class LPOPCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(mediator: StoreMediator): Result<string> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (!(value instanceof CircularQueue)) return Result.err("Type error");
    const res = value.shift();
    if (res === undefined) return Result.err("Popping an empty list");
    mediator.clearTimeout(this.key);
    return Result.ok(res);
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (!(value instanceof CircularQueue)) return Result.err("Type error");
    if (value.length() === 0) return Result.err("Popping an empty list");

    return Result.ok(new LPUSHCommand(this.key, [value.get(0)]));
  }
  toString(): string {
    return `LPOP ${this.key}`;
  }
}
