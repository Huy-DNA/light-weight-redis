import LPOPCommand from "../../lib/commands/commands_imp/LPOP";
import LPOPFactory from "../../lib/commands/factories/LPOPFactory";

describe("Test LPOPCommands", () => {
  const factory = new LPOPFactory();
  test("LPOPCommands should be returned", () => {
    const input = [
      "LPOP 123",
      " LPOP 112223",
      "   LPOP   1112222   ",
      "  LPOP 2222222222222222 ",
      " LPOP \"222jj1l1''\" ",
      "   LPOP '222222\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof LPOPCommand).toBeTruthy());
  });

  test("LPOPCommands mismatched when passing the correct number of arguments", () => {
    const input = [
      "LPOP 123",
      " LPOP 112223",
      "   LPOP   1112222   ",
      "  LPOP 2x3 ",
      " LPOP \"2ab1''\" ",
      "   LPOP '2\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value.key);
    const expected = ["123", "112223", "1112222", "2x3", "2ab1''", '2"'];

    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test("LPOPCommands passing wrong number of arguments should return an error", () => {
    const input = [
      "LPOP 123 222",
      ' LPOP 112223 "123"',
      "LPOP",
      " LPOP",
      " LPOP  ",
    ];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
