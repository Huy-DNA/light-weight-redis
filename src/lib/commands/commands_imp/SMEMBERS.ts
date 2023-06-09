import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
export default class SMEMBERSCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(mediator: StoreMediator): Result<Array<string>> {
    const store = mediator.getStore();
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (!(res.value instanceof Set)) return Result.err("ERR type error");

    const keys = Array.from(res.value.keys());
    return Result.ok(keys);
  }
}
