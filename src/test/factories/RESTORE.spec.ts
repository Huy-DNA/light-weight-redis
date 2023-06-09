import RESTORECommand from "../../lib/commands/commands_imp/RESTORE";
import RESTOREFactory from "../../lib/commands/factories/RESTOREFactory";

describe("Test RESTORECommands", () => {
  const factory = new RESTOREFactory();
  test("RESTORECommands should be returned", () => {
    const input = ["RESTORE  ", "   RESTORE", " RESTORE  "];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof RESTORECommand).toBeTruthy());
  });

  test("RESTORECommands passing wrong number of arguments should return an error", () => {
    const input = [
      "RESTORE 123 222",
      ' RESTORE 112223 "123"',
      "RESTORE 12",
      "RESTORE 0 0 00",
    ];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
