export default class CustomError extends Error {
  errorCode: number;

  constructor(errorCode: number, message: string) {
    super(message);
    this.errorCode = errorCode;
  }
}
