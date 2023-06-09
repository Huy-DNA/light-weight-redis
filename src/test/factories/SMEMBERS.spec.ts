import SMEMBERSCommand from "../../lib/commands/commands_imp/SMEMBERS";
import SMEMBERSFactory from "../../lib/commands/factories/SMEMBERSFactory";

describe("Test SMEMBERSCommands", () => {
  const factory = new SMEMBERSFactory();
  test("SMEMBERSCommands should be returned", () => {
    const input = [
      "SMEMBERS 123",
      " SMEMBERS 112223",
      "   SMEMBERS   1112222   ",
      "  SMEMBERS 2222222222222222 ",
      " SMEMBERS \"222jj1l1''\" ",
      "   SMEMBERS '222222\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value);

    output.forEach((i) => expect(i instanceof SMEMBERSCommand).toBeTruthy());
  });

  test("SMEMBERSCommands mismatched when passing the correct number of arguments", () => {
    const input = [
      "SMEMBERS 123",
      " SMEMBERS 112223",
      "   SMEMBERS   1112222   ",
      "  SMEMBERS 2x3 ",
      " SMEMBERS \"2ab1''\" ",
      "   SMEMBERS '2\"'   ",
    ];

    const output = input.map((i) => factory.create(i).value.key);
    const expected = ["123", "112223", "1112222", "2x3", "2ab1''", '2"'];

    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test("SMEMBERSCommands passing wrong number of arguments should return an error", () => {
    const input = [
      "SMEMBERS 123 222",
      ' SMEMBERS 112223 "123"',
      "SMEMBERS",
      " SMEMBERS",
      " SMEMBERS  ",
    ];

    const output = input.map((i) => factory.create(i).error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
