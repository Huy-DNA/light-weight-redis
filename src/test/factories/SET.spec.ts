import SETCommand from "../../lib/commands/commands_imp/SET";
import SETFactory from "../../lib/commands/factories/SETFactory";

describe("Test SETCommands", () => {
  const factory = new SETFactory();
  test("SETCommands should be returned", () => {
    const input = [
      "SET 123 12",
      " SET 112223   22",
      "  SET 22222'222' 22 ",
      ' SET "222jj1l1\'\'" 2"0" ',
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof SETCommand).toBeTruthy());
  });

  test("SETCommands passing wrong number of arguments should return an error", () => {
    const input = ["SET 123 ", ' SET 112223 "123" 10', "SET", " SET", " SET  "];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
