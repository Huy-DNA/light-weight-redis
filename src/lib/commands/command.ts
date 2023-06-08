import Result from "../result";
import Store from "../store";
import Logger from "../logger";
import LogEntry from "../logentry";
export default class Command {
  execute(store: Store): Result<any> {
    return Result.err("ERR not implemented");
  }

  getRollbackCommand(store: Store): Result<Command> {
    return Result.err("ERR not implemented");
  }
}
