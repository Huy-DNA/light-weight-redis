import CommandFactory from "../commandFactory";
import RESTORECommand from "../commands_imp/RESTORE";

export default class RESTOREFactory extends CommandFactory {
  constructor() {
    super("RESTORE", [], [], new RegExp(`^\\s*RESTORE\\s*$`));
  }

  create(rawString: string): RESTORECommand {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      throw "ERR invalid arguments";
    } else {
      return new RESTORECommand();
    }
  }
}
