import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Log from "../../logger";
import LogEntry from "../../logentry";
export default class DELCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(store: Store): Result<number> {
    return new Result<number>(null, null);
  }

  log(log: Log): LogEntry {
    throw "Not implemented";
  }
}
