import CommandFactory from "../commandFactory";
import KEYSCommand from "../commands_imp/KEYS";
import Result from "../../result";

export default class KEYSFactory extends CommandFactory {
  constructor() {
    super("KEYS", [], [], new RegExp(`^\\s*KEYS\\s*$`));
  }

  create(rawString: string): Result<KEYSCommand> {
    const matchRes = rawString.match(this.regex);

    if (matchRes === null) {
      return Result.err("ERR invalid arguments");
    } else {
      return Result.ok(new KEYSCommand());
    }
  }
}
