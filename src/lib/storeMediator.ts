import Command from "./commands/command";
import Logger from "./logger";
import Store from "./store";
import LogEntry from "./logentry";
import Result from "./result";

export default class StoreMediator {
  #store: Store;
  #logger: Logger;

  constructor(store: Store, logger: Logger) {
    this.#store = store;
    this.#logger = logger;
  }

  getStore(): Store {
    return this.#store;
  }

  acceptCommand(command: Command): Result<any> {
    const rollbackCommandRes = command.getRollbackCommand(this);
    const res = command.execute(this);
    if (rollbackCommandRes.error !== null || rollbackCommandRes.value === null)
      return res;
    this.#logger.pushEntry(new LogEntry(command, rollbackCommandRes.value));
    return res;
  }

  takeSnapshot(): Result<number> {
    this.#logger.takeCheckpoint();
    return Result.ok(1);
  }

  restoreSnapshot(): Result<number> {
    const checkpointRes = this.#logger.popCheckpoint();
    if (checkpointRes.error !== null || checkpointRes.value === null)
      return Result.err("ERR no snapshot taken");
    const checkpoint = checkpointRes.value;
    while (this.#logger.length() > checkpoint + 1) {
      const entry = this.#logger.popEntry().value as LogEntry;
      if (entry.backwardCommand === null) continue;
      entry.backwardCommand.execute(this);
    }
    return Result.ok(1);
  }
}
