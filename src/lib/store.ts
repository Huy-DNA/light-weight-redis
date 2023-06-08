import Logger from "./logger";
import CircularQueue from "./utils/circularQueue";
import Command from "./commands/command";
import Result from "./result";
import EventTimer from "./utils/eventTimer";
import DELCommand from "./commands/commands_imp/DEL";
import LogEntry from "./logentry";

type Value = string | CircularQueue<string> | Set<string>;

export default class Store {
  #logger: Logger;
  #keyValueStore: Map<string, Value>;
  #timerMap: Map<string, EventTimer>;

  constructor() {
    this.#logger = new Logger();
    this.#keyValueStore = new Map();
    this.#timerMap = new Map();
  }

  execute(command: Command): Result<any> {
    const rollbackCommand = this.getRollbackCommand(command);
    const res = command.execute(this);
    if (
      rollbackCommand.error === null &&
      rollbackCommand.value instanceof Command
    )
      this.#logger.log(new LogEntry(command, rollbackCommand.value));
    return res;
  }

  getRollbackCommand(command: Command): Result<Command> {
    return command.getRollbackCommand(this);
  }

  get(key: string): Result<Value> {
    const value = this.#keyValueStore.get(key);

    return Result.ok(value === undefined ? null : value);
  }

  set(key: string, value: Value) {
    this.#keyValueStore.set(key, value);
  }

  delete(key: string) {
    this.#keyValueStore.delete(key);
  }
  has(key: string): boolean {
    return this.#keyValueStore.has(key);
  }

  keys(): Array<string> {
    return [...this.#keyValueStore.keys()];
  }

  setExpire(key: string, milliseconds: number) {
    const delCommand = new DELCommand(key);

    this.#timerMap.set(
      key,
      new EventTimer(() => {
        this.#timerMap.delete(key);
        this.execute(delCommand);
      }, milliseconds)
    );
  }

  clearExpire(key: string) {
    const eventTimer = this.#timerMap.get(key);

    if (eventTimer === undefined) return;

    eventTimer.clear();
    this.#timerMap.delete(key);
  }

  hasExpire(key: string) {
    return this.#timerMap.has(key);
  }

  getTTL(key: string): Result<number> {
    const eventTimer = this.#timerMap.get(key);
    if (eventTimer === undefined || eventTimer.getRemainingTime() <= 0)
      return Result.err("ERR no value at this key");
    return Result.ok(eventTimer.getRemainingTime());
  }

  snap() {
    this.#logger.takeCheckpoint();
  }

  restore(): Result<number> {
    const checkpoint = this.#logger.popCheckpoint();
    if (checkpoint.error !== null || checkpoint.value === null)
      return Result.err("ERR no checkpoint");
    const checkpointVal = checkpoint.value;
    while (this.#logger.current() > checkpointVal) {
      const rollbackCommand = this.#logger.popRollbackCommand()
        .value as Command;
      rollbackCommand.execute(this);
    }

    return Result.ok(1);
  }
}
