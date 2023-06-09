import RPOPCommand from "../../lib/commands/commands_imp/RPOP";
import RPOPFactory from "../../lib/commands/factories/RPOPFactory";

describe("Test RPOPCommands", () => {
  const factory = new RPOPFactory();
  test("RPOPCommands should be returned", () => {
    const input = [
      "RPOP 123",
      " RPOP 112223",
      "   RPOP   1112222   ",
      "  RPOP 2222222222222222 ",
      " RPOP \"222jj1l1''\" ",
      "   RPOP '222222\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof RPOPCommand).toBeTruthy());
  });

  test("RPOPCommands mismatched when passing the correct number of arguments", () => {
    const input = [
      "RPOP 123",
      " RPOP 112223",
      "   RPOP   1112222   ",
      "  RPOP 2x3 ",
      " RPOP \"2ab1''\" ",
      "   RPOP '2\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value.key);
    const expected = ["123", "112223", "1112222", "2x3", "2ab1''", '2"'];

    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test("RPOPCommands passing wrong number of arguments should return an error", () => {
    const input = [
      "RPOP 123 222",
      ' RPOP 112223 "123"',
      "RPOP",
      " RPOP",
      " RPOP  ",
    ];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
