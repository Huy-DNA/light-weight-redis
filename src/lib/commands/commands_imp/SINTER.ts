import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import Logger from "../../logger";
import LogEntry from "../../logentry";
export default class SINTERCommand extends Command {
  keys: Array<string>;

  constructor(keys: Array<string>) {
    super();
    this.keys = keys;
  }

  execute(store: Store): Result<Array<string>> {
    const resList = this.keys.map((key) => store.get(key));

    if (
      resList.some((res) => res.error !== null || !(res.value instanceof Set))
    )
      return Result.err("ERR type error");

    const setList = resList.map((res) => res.value) as Array<Set<string>>;

    const resSet: Set<string> = new Set();
    for (let set of setList) [...set].forEach(resSet.add);

    return Result.ok([...resSet]);
  }
}
