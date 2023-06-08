import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
import CircularQueue from "../../utils/circularQueue";
import LPUSHCommand from "./LPUSH";
export default class LPOPCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(store: Store): Result<string> {
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (!(res.value instanceof CircularQueue))
      return Result.err("ERR type error");
    const elem = res.value.shift();
    return elem;
  }

  getRollbackCommand(store: Store): Result<Command> {
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (!(res.value instanceof CircularQueue))
      return Result.err("ERR type error");
    if (res.value.length() === 0)
      return Result.err("Err popping an empty list");

    return Result.ok(
      new LPUSHCommand(this.key, [res.value.get(0).value as string])
    );
  }
}
