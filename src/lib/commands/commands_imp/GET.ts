import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
export default class GETCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(store: Store): Result<string> {
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (res.value === null) return Result.ok<string>(null);
    if (typeof res.value === "string") return Result.ok(res.value);
    return Result.err("ERR type error");
  }
}
