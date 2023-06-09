import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
export default class SINTERCommand extends Command {
  keys: Array<string>;

  constructor(keys: Array<string>) {
    super();
    this.keys = keys;
  }

  execute(mediator: StoreMediator): Result<Array<string>> {
    const store = mediator.getStore();
    const valList = this.keys.map((key) => store.get(key));

    if (valList.some((val) => val === undefined || !(val instanceof Set)))
      return Result.err("(ERR) type error");

    const res: Set<string> = new Set();
    (valList as Set<string>[]).forEach((set) => set!.forEach((e) => res.add(e)));

    return Result.ok([...res]);
  }

  toString(): string {
    return `SINTER ${this.keys.join(" ")}`;
  }
}
