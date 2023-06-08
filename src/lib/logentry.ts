import Command from "./commands/command";

export default class LogEntry {
  forwardCommand: Command;
  backwardCommand: Command | null;

  constructor(command: Command, rollbackCommand: Command | null = null) {
    this.forwardCommand = command;
    this.backwardCommand = rollbackCommand;
  }
}
