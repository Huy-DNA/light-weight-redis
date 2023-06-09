import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";

export default class EXPIRECommand extends Command {
  key: string;
  seconds: number;

  constructor(key: string, seconds: number) {
    super();
    this.key = key;
    this.seconds = seconds;
  }

  execute(mediator: StoreMediator): Result<number> {
    const store = mediator.getStore();
    if (!store.has(this.key)) return Result.err("ERR no value at this key");

    return store.setTimeout(this.key, this.seconds * 1000);
  }

  toString(): string {
    return `EXPIRE ${this.key} ${this.seconds}`;
  }
}
