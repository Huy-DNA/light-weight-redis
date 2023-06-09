import CommandFactory from "../commandFactory";
import TTLCommand from "../commands_imp/TTL";
import Result from "../../result";
import extractToken from "../../utils/extractToken";
import { toEditorSettings } from "typescript";

export default class TTLFactory extends CommandFactory {
  constructor() {
    super("TTL", ["key"], [String]);
  }

  create(rawString: string): Result<TTLCommand> {
    const matchRes = extractToken(rawString);

    if (matchRes.error !== null || matchRes.value === null)
      return Result.err("Invalid arguments");

    const tokenList = matchRes.value;
    if (tokenList[0] !== "TTL") return Result.err("Not a TTL command");

    if (tokenList.length != 2) return Result.err("TTL expects 1 argument");

    return Result.ok(new TTLCommand(tokenList[1]));
  }
}
