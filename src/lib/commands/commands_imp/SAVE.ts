import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
export default class SAVECommand extends Command {
  execute(mediator: StoreMediator): Result<number> {
    mediator.takeSnapshot();
    return Result.ok(1);
  }
}
