import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
export default class SAVECommand extends Command {
  execute(mediator: StoreMediator): Result<string> {
    mediator.takeSnapshot();
    return Result.ok("OK");
  }
  toString(): string {
    return `SAVE`;
  }
}
