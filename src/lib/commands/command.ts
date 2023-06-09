import Result from "../result";
import StoreMediator from "../storeMediator";
export default class Command {
  execute(mediator: StoreMediator): Result<any> {
    return Result.err("ERR not implemented");
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    return Result.err("ERR not implemented");
  }
}
