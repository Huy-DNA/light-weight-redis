import Store from "./store";
import Command from "./commands/command";
import LogEntry from "./logentry";
import Result from "./result";

export default class Logger {
  #log: Array<LogEntry>;
  #snapshots: Array<number>;

  constructor() {
    this.#log = new Array();
    this.#snapshots = new Array();
  }

  log(entry: LogEntry) {
    this.#log.push(entry);
  }

  takeCheckpoint() {
    this.#snapshots.push(this.#log.length - 1);
  }

  current() {
    return this.#log.length - 1;
  }

  popCheckpoint(): Result<number> {
    const lastCheckpoint = this.#snapshots.pop();
    if (lastCheckpoint === undefined)
      return Result.err("ERR no more checkpoints");
    return Result.ok(lastCheckpoint);
  }

  popRollbackCommand(): Result<Command> {
    const entry = this.#log.pop();
    if (entry === undefined) return Result.err("ERR no more commands");
    return Result.ok(entry.backwardCommand);
  }
}
