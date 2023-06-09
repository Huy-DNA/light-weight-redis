import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
export default class GETCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(mediator: StoreMediator): Result<string> {
    const store = mediator.getStore();
    const res = store.get(this.key);
    if (res.error !== null) return Result.err(res.error);
    if (res.value === null) return Result.ok<string>(null);
    if (typeof res.value === "string") return Result.ok(res.value);
    return Result.err("ERR type error");
  }
}
