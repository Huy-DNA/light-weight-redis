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
    if (!store.has(this.key)) return Result.err("ERR no value at this key");

    store.clearExpire(this.key);

    store.setExpire(this.key, this.seconds * 1000);

    return Result.ok(1);
  }
}
