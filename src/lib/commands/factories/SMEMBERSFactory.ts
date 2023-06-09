import CommandFactory from "../commandFactory";
import SMEMBERSCommand from "../commands_imp/SMEMBERS";
import Result from "../../result";
import extractToken from "../../utils/extractToken";

export default class SMEMBERSFactory extends CommandFactory {
  constructor() {
    super("SMEMBERS", ["key"], [String]);
  }

  create(rawString: string): Result<SMEMBERSCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("ERR invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0] !== "SMEMBERS") return Result.err("ERR not a SMEMBERS command");

    if (tokenList.length != 2)
      return Result.err("ERR SMEMBERS expects 1 argument");

    return Result.ok(new SMEMBERSCommand(tokenList[1]));
  }
}
