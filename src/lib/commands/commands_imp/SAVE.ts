import Command from "../command";
import Result from "../../result";
import Store from "../../store";
import StoreMediator from "../../storeMediator";
export default class SAVECommand extends Command {
  execute(mediator: StoreMediator): Result<string> {
    return mediator.takeSnapshot();
  }
  toString(): string {
    return `SAVE`;
  }
}
