import EXPIRECommand from "../../lib/commands/commands_imp/EXPIRE";
import EXPIREFactory from "../../lib/commands/factories/EXPIREFactory";

describe("Test EXPIRECommands", () => {
  const factory = new EXPIREFactory();
  test("EXPIRECommands should be returned", () => {
    const input = [
      "EXPIRE 123 12",
      " EXPIRE 112223   22",
      "  EXPIRE 22222'222' 22 ",
      ' EXPIRE "222jj1l1\'\'" 2"0" ',
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof EXPIRECommand).toBeTruthy());
  });

  test("EXPIRECommands passing wrong number of arguments should return an error", () => {
    const input = [
      "EXPIRE 123 ",
      ' EXPIRE 112223 "123" 10',
      "EXPIRE",
      " EXPIRE",
      " EXPIRE  ",
    ];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
