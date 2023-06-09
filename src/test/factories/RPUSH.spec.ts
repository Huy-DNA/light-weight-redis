import RPUSHCommand from "../../lib/commands/commands_imp/RPUSH";
import RPUSHFactory from "../../lib/commands/factories/RPUSHFactory";

describe("Test RPUSHCommands", () => {
  const factory = new RPUSHFactory();
  test("RPUSHCommands should be returned", () => {
    const input = [
      "RPUSH 123 11 12",
      " RPUSH 11   22   23",
      "   RPUSH 11'1' 22  22   ",
      ' RPUSH "222" "j" j1l1\'\' ',
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof RPUSHCommand).toBeTruthy());
  });

  test("RPUSHCommands passing wrong number of arguments should return an error", () => {
    const input = ["RPUSH 123", ' RPUSH "123"', "RPUSH", " RPUSH", " RPUSH  "];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
