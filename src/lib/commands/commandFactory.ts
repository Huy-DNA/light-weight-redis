import Result from "../result";
import Command from "./command";

export default class CommandFactory {
  static tokenPattern = /\s*(?:[\w\d])*((?:"[^"]*")|(?:'[^']*'))?\s*/;

  name: string;
  paramName: Array<string>;
  paramTypes: Array<Function>;
  regex: RegExp;

  constructor(
    name: string,
    paramName: Array<string>,
    paramTypes: Array<Function>,
    regex: RegExp
  ) {
    this.name = name;
    this.paramName = paramName;
    this.paramTypes = paramTypes;
    this.regex = regex;
  }

  create(rawString: string): Result<Command> {
    return Result.err("ERR not implemented");
  }
}
