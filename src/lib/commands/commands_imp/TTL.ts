import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
export default class TTLCommand extends Command {
  key: string;

  constructor(key: string) {
    super();
    this.key = key;
  }

  execute(mediator: StoreMediator): Result<number> {
    const timeoutInMs = mediator.getTimeout(this.key);
    if (timeoutInMs === undefined)
      return Result.err("No timer or no value at this key");
    return Result.ok(timeoutInMs / 1000);
  }

  toString(): string {
    return `TTL ${this.key}`;
  }
}
