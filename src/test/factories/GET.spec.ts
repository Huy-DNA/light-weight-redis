import GETCommand from "../../lib/commands/commands_imp/GET";
import GETFactory from "../../lib/commands/factories/GETFactory";

describe("Test GETCommands", () => {
  const factory = new GETFactory();
  test("GETCommands should be returned", () => {
    const input = [
      "GET 123",
      " GET 112223",
      "   GET   1112222   ",
      "  GET 2222222222222222 ",
      " GET \"222jj1l1''\" ",
      "   GET '222222\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof GETCommand).toBeTruthy());
  });

  test("GETCommands mismatched when passing the correct number of arguments", () => {
    const input = [
      "GET 123",
      " GET 112223",
      "   GET   1112222   ",
      "  GET 2x3 ",
      " GET \"2ab1''\" ",
      "   GET '2\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value.key);
    const expected = ["123", "112223", "1112222", "2x3", "2ab1''", '2"'];

    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test("GETCommands passing wrong number of arguments should return an error", () => {
    const input = ["GET 123 222", ' GET 112223 "123"', "GET", " GET", " GET  "];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
