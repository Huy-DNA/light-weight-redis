import KEYSCommand from "../../lib/commands/commands_imp/KEYS";
import KEYSFactory from "../../lib/commands/factories/KEYSFactory";

describe("Test KEYSCommands", () => {
  const factory = new KEYSFactory();
  test("KEYSCommands should be returned", () => {
    const input = ["KEYS  ", "   KEYS", " KEYS  "];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof KEYSCommand).toBeTruthy());
  });

  test("KEYSCommands passing wrong number of arguments should return an error", () => {
    const input = [
      "KEYS 123 222",
      ' KEYS 112223 "123"',
      "KEYS 12",
      "KEYS 0 0 00",
    ];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
