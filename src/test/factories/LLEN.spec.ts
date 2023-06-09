import LLENCommand from "../../lib/commands/commands_imp/LLEN";
import LLENFactory from "../../lib/commands/factories/LLENFactory";

describe("Test LLENCommands", () => {
  const factory = new LLENFactory();
  test("LLENCommands should be returned", () => {
    const input = [
      "LLEN 123",
      " LLEN 112223",
      "   LLEN   1112222   ",
      "  LLEN 2222222222222222 ",
      " LLEN \"222jj1l1''\" ",
      "   LLEN '222222\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof LLENCommand).toBeTruthy());
  });

  test("LLENCommands mismatched when passing the correct number of arguments", () => {
    const input = [
      "LLEN 123",
      " LLEN 112223",
      "   LLEN   1112222   ",
      "  LLEN 2x3 ",
      " LLEN \"2ab1''\" ",
      "   LLEN '2\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value.key);
    const expected = ["123", "112223", "1112222", "2x3", "2ab1''", '2"'];

    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test("LLENCommands passing wrong number of arguments should return an error", () => {
    const input = [
      "LLEN 123 222",
      ' LLEN 112223 "123"',
      "LLEN",
      " LLEN",
      " LLEN  ",
    ];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
