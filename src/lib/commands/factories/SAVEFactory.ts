import CommandFactory from "../commandFactory";
import SAVECommand from "../commands_imp/SAVE";
import Result from "../../result";

export default class SAVEFactory extends CommandFactory {
  constructor() {
    super("SAVE", [], [], new RegExp(`^\\s*SAVE\\s*$`));
  }

  create(rawString: string): Result<SAVECommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      return Result.ok(new SAVECommand());
    }
  }
}
