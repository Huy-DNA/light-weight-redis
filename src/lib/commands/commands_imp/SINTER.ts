import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Log from "../../logger";
import LogEntry from "../../logentry";
export default class SINTERCommand extends Command {
  keys: Array<string>;

  constructor(keys: Array<string>) {
    super();
    this.keys = keys;
  }

  execute(store: Store): Result<Array<string>> {
    return new Result<Array<string>>(null, null);
  }
}
