import LRANGECommand from "../../lib/commands/commands_imp/LRANGE";
import LRANGEFactory from "../../lib/commands/factories/LRANGEFactory";

describe("Test LRANGECommands", () => {
  const factory = new LRANGEFactory();
  test("LRANGECommands should be returned", () => {
    const input = [
      "LRANGE 123 123 123",
      " LRANGE 112223 a b",
      "   LRANGE   1112222   c'd' c",
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof LRANGECommand).toBeTruthy());
  });

  test("LRANGECommands passing wrong number of arguments should return an error", () => {
    const input = [
      "LRANGE 123 222",
      ' LRANGE 112223 "123"',
      "LRANGE 1",
      " LRANGE",
      " LRANGE  ",
    ];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
