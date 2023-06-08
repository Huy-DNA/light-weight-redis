import CommandFactory from "../commandFactory";
import SAVECommand from "../commands_imp/SAVE";

export default class SAVEFactory extends CommandFactory {
  constructor() {
    super("SAVE", [], [], new RegExp(`^\\s*SAVE\\s*$`));
  }

  create(rawString: string): SAVECommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      return new SAVECommand();
    }
  }
}
