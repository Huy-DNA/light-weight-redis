import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";

export default class EXPIRECommand extends Command {
  key: string;
  seconds: number;

  constructor(key: string, seconds: number) {
    super();
    this.key = key;
    this.seconds = seconds;
  }

  execute(store: Store): Result<number> {
    return new Result<number>(null, null);
  }
}
