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

  execute(mediator: StoreMediator): Result<number> {
    const store = mediator.getStore();
    const res = store.get(this.key);
    if (res.value !== null && typeof res.value !== "string")
      return Result.err("ERR type error");
    store.set(this.key, this.value);
    return Result.ok(1);
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
    const res = store.get(this.key);
    if (res.value !== null && typeof res.value !== "string")
      return Result.err("ERR type error");

    if (res.value === null) return Result.ok(new DELCommand(this.key));

    return Result.ok(new SETCommand(this.key, res.value));
  }
  toString(): string {
    return `SET ${this.key} ${this.value}`;
  }
}
