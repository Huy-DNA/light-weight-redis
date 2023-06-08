import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
export default class KEYSCommand extends Command {
  execute(store: Store): Result<Array<string>> {
    return new Result<Array<string>>(null, null);
  }
}
