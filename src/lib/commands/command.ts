import Result from "../result";
import Store from "../store";
import Logger from "../logger";
import LogEntry from "../logentry";
export default class Command {
  execute(store: Store): Result<any> {
    throw "Not implemented";
  }

  log(log: Logger): LogEntry {
    throw "Not implemented";
  }
}
