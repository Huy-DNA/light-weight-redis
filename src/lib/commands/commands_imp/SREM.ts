import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Log from "../../logger";
import LogEntry from "../../logentry";
export default class SREMCommand extends Command {
  key: string;
  values: Array<string>;

  constructor(key: string, values: Array<string>) {
    super();
    this.key = key;
    this.values = values;
  }

  execute(store: Store): Result<number> {
    return new Result<number>(null, null);
  }

  log(log: Log): LogEntry {
    throw "Not implemented";
  }
}
