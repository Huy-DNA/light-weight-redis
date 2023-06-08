import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
export default class LRANGECommand extends Command {
  key: string;
  start: number;
  stop: number;

  constructor(key: string, start: number, stop: number) {
    super();
    this.key = key;
    this.start = start;
    this.stop = stop;
  }

  execute(store: Store): Result<Array<string>> {
    return new Result<Array<string>>(null, null);
  }
}
