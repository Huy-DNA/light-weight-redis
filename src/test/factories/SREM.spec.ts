import SREMCommand from "../../lib/commands/commands_imp/SREM";
import SREMFactory from "../../lib/commands/factories/SREMFactory";

describe("Test SREMCommands", () => {
  const factory = new SREMFactory();
  test("SREMCommands should be returned", () => {
    const input = [
      "SREM 123 11 12",
      " SREM 11   22   23",
      "   SREM 11'1' 22  22   ",
      ' SREM "222" "j" j1l1\'\' ',
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof SREMCommand).toBeTruthy());
  });

  test("SREMCommands passing wrong number of arguments should return an error", () => {
    const input = ["SREM 123", ' SREM "123"', "SREM", " SREM", " SREM  "];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
