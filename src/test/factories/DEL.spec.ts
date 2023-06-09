import DELCommand from "../../lib/commands/commands_imp/DEL";
import DELFactory from "../../lib/commands/factories/DELFactory";

describe("Test DELCommands", () => {
  const factory = new DELFactory();
  test("DELCommands should be returned", () => {
    const input = [
      "DEL 123",
      " DEL 112223",
      "   DEL   1112222   ",
      "  DEL 2222222222222222 ",
      " DEL \"222jj1l1''\" ",
      "   DEL '222222\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof DELCommand).toBeTruthy());
  });

  test("DELCommands mismatched when passing the correct number of arguments", () => {
    const input = [
      "DEL 123",
      " DEL 112223",
      "   DEL   1112222   ",
      "  DEL 2x3 ",
      " DEL \"2ab1''\" ",
      "   DEL '2\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value.key);
    const expected = ["123", "112223", "1112222", "2x3", "2ab1''", '2"'];

    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test("DELCommands passing wrong number of arguments should return an error", () => {
    const input = ["DEL 123 222", ' DEL 112223 "123"', "DEL", " DEL", " DEL  "];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
