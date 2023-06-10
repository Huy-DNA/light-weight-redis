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

    if (valList.some((val) => val === undefined))
      return Result.err("Some keys do not have value");

    if (valList.some((val) => !(val instanceof Set)))
      return Result.err("Type error");

    let res: Set<string> = valList[0] as Set<string>;
    const rest = valList.slice(1);

    for (let set of rest) {
      res = new Set([...res].filter((e) => (set as Set<string>).has(e)));
    }

    return Result.ok([...res]);
  }

  toString(): string {
    return `SINTER ${this.keys.join(" ")}`;
  }
}
