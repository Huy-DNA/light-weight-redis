import CircularQueue from "../circularQueue";

describe("Test CircularQueue", () => {
  test("Test length", () => {
    const q = new CircularQueue();
    expect(q.length()).toEqual(0);
    q.push(2);
    expect(q.length()).toEqual(1);
    q.unshift(2);
    expect(q.length()).toEqual(2);
    q.shift();
    q.pop();
    expect(q.length()).toEqual(0);
  });

  test("Test shift & unshift", () => {
    const q = new CircularQueue();
    const l = [1, 2, 3, 4, 5, 6];
    for (let i of l) q.unshift(i);
    expect(q.length()).toEqual(l.length);
    for (let i = 0; i < q.length(); ++i)
      expect(q.get(i).value).toEqual(l[l.length - 1 - i]);
    for (let i = 0; i < l.length; ++i)
      expect(q.shift().value).toEqual(l[l.length - 1 - i]);
    expect(q.length()).toEqual(0);
  });

  test("Test pop & push", () => {
    const q = new CircularQueue();
    const l = [1, 2, 3, 4, 5, 6];
    for (let i of l) q.push(i);
    expect(q.length()).toEqual(l.length);
    for (let i = 0; i < q.length(); ++i) expect(q.get(i).value).toEqual(l[i]);
    for (let i = 0; i < l.length; ++i)
      expect(q.pop().value).toEqual(l[l.length - 1 - i]);
    expect(q.length()).toEqual(0);
  });
});
