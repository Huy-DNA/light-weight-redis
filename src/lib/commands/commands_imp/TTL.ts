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
    const store = mediator.getStore();
    return store.getTimeout(this.key);
  }

  toString(): string {
    return `TTL ${this.key}`;
  }
}
