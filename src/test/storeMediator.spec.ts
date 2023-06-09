import Store from "../lib/store";
import StoreMediator from "../lib/storeMediator";
import Parser from "../lib/parser";
import commandMapping from "../lib/commandMapping";
import Logger from "../lib/logger";
import Command from "../lib/commands/command";

describe("Test storeMediator", () => {
  const store = new Store();
  const logger = new Logger();
  const parser = new Parser(commandMapping);
  const storeMediator = new StoreMediator(store, logger);

  test("Set then Get should return the same value.", () => {
    const setCommand = parser.parse("SET abc 123").value;
    const getCommand = parser.parse("GET abc").value;
    storeMediator.acceptCommand(setCommand as Command);
    const output = storeMediator.acceptCommand(getCommand as Command).value;
    expect(output).toEqual("123");
  });
});
