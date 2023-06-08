import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Log from "../../logger";
import LogEntry from "../../logentry";
export default class SETCommand extends Command {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    super();
    this.key = key;
    this.value = value;
  }

  execute(store: Store): Result<number> {
    return new Result<number>(null, null);
  }

  log(log: Log): LogEntry {
    throw "Not implemented";
  }
}
