import CommandFactory from "../commandFactory";
import RESTORECommand from "../commands_imp/RESTORE";
import Result from "../../result";

export default class RESTOREFactory extends CommandFactory {
  constructor() {
    super("RESTORE", [], [], new RegExp(`^\\s*RESTORE\\s*$`));
  }

  create(rawString: string): Result<RESTORECommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      return Result.ok(new RESTORECommand());
    }
  }
}
