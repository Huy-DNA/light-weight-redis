import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
export default class LPOPCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(store: Store): Result<number> {
    return new Result<number>(null, null);
  }

  log(log: Logger): LogEntry {
    throw "Not implemented";
  }
}
