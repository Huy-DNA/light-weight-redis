import SAVECommand from "../../lib/commands/commands_imp/SAVE";
import SAVEFactory from "../../lib/commands/factories/SAVEFactory";

describe("Test DELCommands", () => {
  const factory = new SAVEFactory();
  test("SAVECommands should be returned", () => {
    const input = ["SAVE  ", "   SAVE", " SAVE  "];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof SAVECommand).toBeTruthy());
  });

  test("SAVECommands passing wrong number of arguments should return an error", () => {
    const input = [
      "SAVE 123 222",
      ' SAVE 112223 "123"',
      "SAVE 12",
      "SAVE 0 0 00",
    ];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
