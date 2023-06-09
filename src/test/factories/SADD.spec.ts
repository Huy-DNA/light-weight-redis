import SADDCommand from "../../lib/commands/commands_imp/SADD";
import SADDFactory from "../../lib/commands/factories/SADDFactory";

describe("Test SADDCommands", () => {
  const factory = new SADDFactory();
  test("SADDCommands should be returned", () => {
    const input = [
      "SADD 123 11 12",
      " SADD 11   22   23",
      "   SADD 11'1' 22  22   ",
      ' SADD "222" "j" j1l1\'\' ',
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof SADDCommand).toBeTruthy());
  });

  test("SADDCommands passing wrong number of arguments should return an error", () => {
    const input = ["SADD 123", ' SADD "123"', "SADD", " SADD", " SADD  "];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
