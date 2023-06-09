import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
export default class KEYSCommand extends Command {
  execute(mediator: StoreMediator): Result<Array<string>> {
    const store = mediator.getStore();
    return Result.ok(store.keys());
  }
}
