import Store from "../lib/store";

describe("Test store", () => {
  const store = new Store();
  test("Set then Get should return the same value", () => {
    store.set("abc", "12");
    expect(store.get("abc").value).toBe("12");
  });
});
