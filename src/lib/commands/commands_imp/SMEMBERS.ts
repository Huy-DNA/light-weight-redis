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
    const value = store.get(this.key);
    if (!(value instanceof Set)) return Result.err("Type error");

    const keys = Array.from(value.keys());
    return Result.ok(keys);
  }

  toString(): string {
    return `SMEMBERS ${this.key}`;
  }
}
