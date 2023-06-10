import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import DELCommand from "./DEL";
import { type } from "os";
export default class SETCommand extends Command {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    super();
    this.key = key;
    this.value = value;
  }

  execute(mediator: StoreMediator): Result<any> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (value !== undefined && typeof value !== "string")
      return Result.err("Type error");
    mediator.clearTimeout(this.key);
    store.set(this.key, this.value);
    return Result.mes("OK");
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
    const value = store.get(this.key);
    if (value !== undefined && typeof value !== "string")
      return Result.err("Type error");

    if (value === undefined) return Result.ok(new DELCommand(this.key));

    return Result.ok(new SETCommand(this.key, value));
  }
  toString(): string {
    return `SET ${this.key} ${this.value}`;
  }
}
