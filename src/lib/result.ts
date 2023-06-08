export default class Result<T> {
  value: T | null;
  error: string | null;

  constructor(value: T | null, error: string | null) {
    this.value = value;
    this.error = error;
  }

  static ok<T>(value: T | null): Result<T> {
    return new Result<T>(value, null);
  }

  static err<T>(error: string): Result<T> {
    return new Result<T>(null, error);
  }
}
