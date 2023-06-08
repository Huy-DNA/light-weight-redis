import CommandFactory from "../commandFactory";
import KEYSCommand from "../commands_imp/KEYS";

export default class KEYSFactory extends CommandFactory {
  constructor() {
    super("KEYS", [], [], new RegExp(`^\\s*KEYS\\s*$`));
  }

  create(rawString: string): KEYSCommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      3;
      return new KEYSCommand();
    }
  }
}
