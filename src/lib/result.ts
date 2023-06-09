export default class Result<T> {
  value: T | null;
  error: string | null;
  message: string | null;

  constructor(value: T | null, error: string | null, message: string | null) {
    this.value = value;
    this.error = error;
    this.message = message;
  }

  static ok<T>(value: T | null): Result<T> {
    return new Result<T>(value, null, null);
  }

  static err<T>(error: string): Result<T> {
    return new Result<T>(null, error, null);
  }

  static mes<T>(mes: string): Result<T> {
    return new Result<T>(null, null, mes);
  }
}
