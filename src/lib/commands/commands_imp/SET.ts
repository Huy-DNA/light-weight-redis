import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
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

  execute(store: Store): Result<number> {
    const res = store.get(this.key);
    if (res.value !== null && typeof res.value !== "string")
      return Result.err("ERR type error");
    store.set(this.key, this.value);
    return Result.ok(1);
  }

  getRollbackCommand(store: Store): Result<Command> {
    const res = store.get(this.key);
    if (res.value !== null && typeof res.value !== "string")
      return Result.err("ERR type error");

    if (res.value === null) return Result.ok(new DELCommand(this.key));

    return Result.ok(new SETCommand(this.key, res.value));
  }
}
