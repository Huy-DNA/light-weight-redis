import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import CircularQueue from "../../utils/circularQueue";
import RPUSHCommand from "./RPUSH";
export default class RPOPCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(mediator: StoreMediator): Result<string> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (value === undefined) return Result.err("No value at this key");
    if (!(value instanceof CircularQueue)) return Result.err("Type error");
    const res = value.pop();
    if (res === undefined) return Result.err("Popping an empty list");
    mediator.clearTimeout(this.key);
    return Result.ok(res);
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (!(value instanceof CircularQueue)) return Result.err("Type error");
    if (value.length() === 0) return Result.err("Popping an empty list");

    return Result.ok(
      new RPUSHCommand(this.key, [value.get(value.length() - 1)])
    );
  }

  toString(): string {
    return `RPOP ${this.key}`;
  }
}
