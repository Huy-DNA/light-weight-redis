import TTLCommand from "../../lib/commands/commands_imp/TTL";
import TTLFactory from "../../lib/commands/factories/TTLFactory";

describe("Test TTLCommands", () => {
  const factory = new TTLFactory();
  test("TTLCommands should be returned", () => {
    const input = [
      "TTL 123",
      " TTL 112223",
      "   TTL   1112222   ",
      "  TTL 2222222222222222 ",
      " TTL \"222jj1l1''\" ",
      "   TTL '222222\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof TTLCommand).toBeTruthy());
  });

  test("TTLCommands mismatched when passing the correct number of arguments", () => {
    const input = [
      "TTL 123",
      " TTL 112223",
      "   TTL   1112222   ",
      "  TTL 2x3 ",
      " TTL \"2ab1''\" ",
      "   TTL '2\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value.key);
    const expected = ["123", "112223", "1112222", "2x3", "2ab1''", '2"'];

    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test("TTLCommands passing wrong number of arguments should return an error", () => {
    const input = ["TTL 123 222", ' TTL 112223 "123"', "TTL", " TTL", " TTL  "];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
