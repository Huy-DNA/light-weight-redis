import { aposMerge } from "../extractToken";
import extractToken from "../extractToken";

describe("Test aposMerge", () => {
  test("Strings without \" and ' should stay the same, except from being trimmed", () => {
    const input = ["12  ", "  2334 ", "  22a222 "];

    const output = input.map(aposMerge).map((result) => result.value);
    const expected = ["12", "2334", "22a222"];
    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test('Strings with " should be removed the most outer pair of "', () => {
    const input = ['"1234"', ' 1234"ad"', ' 12344" ad"'];
    const output = input.map(aposMerge).map((result) => result.value);
    const expected = ["1234", "1234ad", "12344 ad"];

    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test("Strings with ' should be removed the most outer pair of '", () => {
    const input = ["'1234'", " 1234'ad'", " 12344' ad'"];
    const output = input.map(aposMerge).map((result) => result.value);
    const expected = ["1234", "1234ad", "12344 ad"];

    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test("Invalid words should return an error", () => {
    const input = ["12   34", " 1234'ad''a'", " 12344' ad ", "1234' \""];
    const output = input.map(aposMerge).map((result) => result.error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});

describe("Test extractToken", () => {
  test("Valid token streams", () => {
    const input = [
      "DEL 123 444",
      "DEL  222  444",
      'DEL "123" 333',
      "DEL '123' 111",
      "DEL 123'123' 111  ",
      "DEL 123'123 123' 111",
      "  ",
      "' '",
    ];

    const output = input.map(extractToken).map((result) => result.value);
    const expected = [
      ["DEL", "123", "444"],
      ["DEL", "222", "444"],
      ["DEL", "123", "333"],
      ["DEL", "123", "111"],
      ["DEL", "123123", "111"],
      ["DEL", "123123 123", "111"],
      [],
      [" "],
    ];

    output.forEach((o, id) => expect(o).toEqual(expected[id]));
  });

  test("Invalid token streams", () => {
    const input = [
      "DEL 123'123'123 444",
      "DEL  222'123   444",
      "DEL \"123 333'",
    ];

    const output = input
      .map(extractToken)
      .map((result) => result.error !== null);

    output.forEach((o, id) => expect(o).toBeTruthy());
  });
});
