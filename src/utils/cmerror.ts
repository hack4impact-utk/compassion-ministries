enum CMErrorType {
  OK,
  UnknownError,
  InternalError,
  BadValue,
  NoSuchKey,
  DuplicateKey,
}

const defaultStatusCodes: { readonly [id: number]: number } = {
  [CMErrorType.OK]: 200,
  [CMErrorType.UnknownError]: 500,
  [CMErrorType.InternalError]: 500,
  [CMErrorType.BadValue]: 400,
  [CMErrorType.NoSuchKey]: 404,
  [CMErrorType.DuplicateKey]: 409,
};

const defaultErrorMessages: { readonly [id: number]: string } = {
  [CMErrorType.OK]: 'Ok',
  [CMErrorType.UnknownError]: 'Unknown error',
  [CMErrorType.InternalError]: 'Internal error',
  [CMErrorType.BadValue]: 'Invalid value',
  [CMErrorType.NoSuchKey]: 'Key not found',
  [CMErrorType.DuplicateKey]: 'Duplicate entry',
};

// Custom error type constructed with CMErrorType values
export default class CMError extends Error {
  readonly type: CMErrorType;
  readonly status: number;

  // Constructs a CMError based on a CMErrorType value
  // Default status and message for a CMErrorType can be overridden with options param
  // By convention, cause is used to encapsulate a parent error
  constructor(
    type: CMErrorType,
    options?: { status?: number; message?: string; cause?: unknown }
  ) {
    super(
      options?.message ??
        defaultErrorMessages[type] ??
        defaultErrorMessages[CMErrorType.UnknownError],
      options ? { cause: options.cause } : undefined
    );

    this.type = type;
    this.status =
      options?.status ??
      defaultStatusCodes[type] ??
      defaultStatusCodes[CMErrorType.UnknownError];
  }

  // Get a response object representing this CMError
  toResponse(): { message: string; status: number } {
    return {
      message: this.message,
      status: this.status,
    };
  }
}
