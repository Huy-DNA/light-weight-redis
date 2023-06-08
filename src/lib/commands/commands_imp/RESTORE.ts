import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
export default class RESTORECommand extends Command {
  execute(store: Store): Result<number> {
    return store.restore();
  }
}
