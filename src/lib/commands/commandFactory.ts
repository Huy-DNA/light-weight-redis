import Result from "../result";
import Command from "./command";

export default class CommandFactory {
  name: string;
  paramName: Array<string>;
  paramTypes: Array<Function>;

  constructor(
    name: string,
    paramName: Array<string>,
    paramTypes: Array<Function>
  ) {
    this.name = name;
    this.paramName = paramName;
    this.paramTypes = paramTypes;
  }

  create(rawString: string): Result<Command> {
    return Result.err("Not implemented");
  }
}
