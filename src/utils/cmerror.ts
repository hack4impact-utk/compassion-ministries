import zCMErrorType, { CMErrorType } from '@/types/dataModel/cmerrortype';

// Custom error type constructed with CMErrorType values
export default class CMError extends Error {
  type: CMErrorType;
  status: number;

  // Constructs a CMError based on a CMErrorType value
  // Default status and message for a CMErrorType can be overridden with options param
  // By convention, cause is used to encapsulate a parent error
  constructor(
    type: CMErrorType,
    options?: { status?: number; message?: string; cause?: unknown }
  ) {
    super(
      options?.message ??
        CMError.defaultErrorMessages.get(type) ??
        CMError.defaultErrorMessages.get(zCMErrorType.Enum.UnknownError),
      options ? { cause: options.cause } : undefined
    );

    this.type = type;
    this.status =
      options?.status ??
      CMError.defaultStatusCodes.get(type) ??
      CMError.defaultStatusCodes.get(zCMErrorType.Enum.UnknownError) ??
      500;
  }

  // Default error messages for each CMErrorType value
  static defaultErrorMessages: Map<CMErrorType, string> = new Map<
    CMErrorType,
    string
  >([
    [zCMErrorType.Enum.OK, 'Ok'],
    [zCMErrorType.Enum.UnknownError, 'Unknown error'],
    [zCMErrorType.Enum.InternalError, 'Internal error'],
    [zCMErrorType.Enum.BadValue, 'Invalid value'],
    [zCMErrorType.Enum.NoSuchKey, 'Key not found'],
    [zCMErrorType.Enum.DuplicateKey, 'Duplicate entry'],
  ]);

  // Default status codes for each CMErrorType value
  static defaultStatusCodes: Map<CMErrorType, number> = new Map<
    CMErrorType,
    number
  >([
    [zCMErrorType.Enum.OK, 200],
    [zCMErrorType.Enum.UnknownError, 500],
    [zCMErrorType.Enum.InternalError, 500],
    [zCMErrorType.Enum.BadValue, 400],
    [zCMErrorType.Enum.NoSuchKey, 404],
    [zCMErrorType.Enum.DuplicateKey, 409],
  ]);

  // Get a response object representing this CMError
  toResponse(): { message: string; status: number } {
    return {
      message: this.message,
      status: this.status,
    };
  }
}
