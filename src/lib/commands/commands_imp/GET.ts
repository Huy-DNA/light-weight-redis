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
    const value = store.get(this.key);
    if (value === undefined) return Result.err("No value at this key");
    if (typeof value === "string") return Result.ok(value);
    return Result.err("Type error");
  }

  toString(): string {
    return `GET ${this.key}`;
  }
}
