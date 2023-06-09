import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
export default class RESTORECommand extends Command {
  execute(mediator: StoreMediator): Result<any> {
    const store = mediator.getStore();
    return mediator.restoreSnapshot();
  }
  toString(): string {
    return `RESTORE`;
  }
}
