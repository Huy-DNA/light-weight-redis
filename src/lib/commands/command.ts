import Result from "../result";
import StoreMediator from "../storeMediator";
export default class Command {
  execute(mediator: StoreMediator): Result<any> {
    return Result.err("Not implemented");
  }

  getRollbackCommand(mediator: StoreMediator): Result<Command> {
    return Result.err("Not implemented");
  }

  toString(): string {
    return "";
  }
}
