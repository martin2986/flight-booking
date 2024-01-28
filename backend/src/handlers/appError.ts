class AppError extends Error {
  statusCode: Number;
  status: Boolean;
  isOperational: Boolean;

  constructor(message: string, statusCode: Number) {
    super(message);

    this.statusCode = statusCode || 500;
    this.isOperational = true;

    Error.captureStackTrace(this);
  }
}
export default AppError;
