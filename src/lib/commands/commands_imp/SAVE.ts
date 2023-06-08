import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
export default class SAVECommand extends Command {
  execute(store: Store): Result<number> {
    store.snap();
    return Result.ok(1);
  }
}
