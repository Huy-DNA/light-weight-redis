import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
import CircularQueue from "../../utils/circularQueue";
import LPUSHCommand from "./LPUSH";
export default class LPOPCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(mediator: StoreMediator): Result<string> {
    const store = mediator.getStore();
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (!(res.value instanceof CircularQueue))
      return Result.err("ERR type error");
    const elem = res.value.shift();
    return elem;
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    const store = mediator.getStore();
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
