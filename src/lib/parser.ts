import Command from "./commands/command";
import CommandFactory from "./commands/commandFactory";
import Result from "./result";

export default class Parser {
  #commandMapping: Map<string, CommandFactory>;

  constructor(commandMapping: Map<string, CommandFactory>) {
    this.#commandMapping = commandMapping;
  }

  parse(rawString: string): Result<Command> {
    const commandName = rawString.trimStart().split(" ")[0];
    const commandFactory = this.#commandMapping.get(commandName);

    if (commandFactory === undefined) {
      return Result.err("ERR unknown command");
    }
    return commandFactory.create(rawString);
  }
}
