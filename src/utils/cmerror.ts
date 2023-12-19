import { NextResponse } from 'next/server';

// All defined error types for CMError objects
// Do not remove or re-order pre-existing values
export enum CMErrorType {
  OK,
  UnknownError,
  InternalError,
  BadValue,
  NoSuchKey,
  DuplicateKey,
}

// Placeholder in error message templates to replace with given source string
const CMERRORTYPE_MSG_SRC_STR = '%s';

// Default messages and templates for each error type
const CMERRORTYPE_MSGS: {
  readonly [id: number]: {
    template: string;
    default: string;
  };
} = {
  [CMErrorType.OK]: {
    template: `${CMERRORTYPE_MSG_SRC_STR} ok`,
    default: 'Ok',
  },
  [CMErrorType.UnknownError]: {
    template: `Unknown ${CMERRORTYPE_MSG_SRC_STR} error`,
    default: 'Unknown error',
  },
  [CMErrorType.InternalError]: {
    template: `Internal ${CMERRORTYPE_MSG_SRC_STR} error`,
    default: 'Internal error',
  },
  [CMErrorType.BadValue]: {
    template: `Invalid ${CMERRORTYPE_MSG_SRC_STR}`,
    default: 'Invalid value',
  },
  [CMErrorType.NoSuchKey]: {
    template: `${CMERRORTYPE_MSG_SRC_STR} not found`,
    default: 'Key not found',
  },
  [CMErrorType.DuplicateKey]: {
    template: `Duplicate ${CMERRORTYPE_MSG_SRC_STR}`,
    default: 'Duplicate key',
  },
};

// Corresponding response status codes for error types
const CMERRORTYPE_STATUS_CODES: {
  readonly [id: number]: number;
} = {
  [CMErrorType.OK]: 200,
  [CMErrorType.UnknownError]: 500,
  [CMErrorType.InternalError]: 500,
  [CMErrorType.BadValue]: 400,
  [CMErrorType.NoSuchKey]: 404,
  [CMErrorType.DuplicateKey]: 409,
};

// Generate an error message for an error type, optionally filling in contextual info
export function getCMErrorTypeMsg(
  errorType: CMErrorType,
  source?: string
): string {
  const defaultErrMsgInfo = CMERRORTYPE_MSGS[errorType];
  return typeof source !== 'undefined'
    ? defaultErrMsgInfo.template.replace(CMERRORTYPE_MSG_SRC_STR, source)
    : defaultErrMsgInfo.default;
}

// Custom error type constructed with CMErrorType values
export default class CMError extends Error {
  readonly type: CMErrorType;

  // Constructs a CMError based on a CMErrorType value
  // If message is not defined, uses a default message for the CMErrorType
  constructor(errorType: CMErrorType, message?: string) {
    super(message ?? getCMErrorTypeMsg(errorType));
    this.type = errorType;
  }

  // Construct a NextResponse object representing the error
  toNextResponse(): NextResponse<{
    message: string;
  }> {
    return NextResponse.json(
      { message: this.message },
      { status: CMERRORTYPE_STATUS_CODES[this.type] }
    );
  }
}

// If err is a CMError, constructs a corresponding NextResponse object
// Otherwise, constructs a generic NextResponse object
export function CMErrorResponse(err: unknown): NextResponse<{
  message: string;
}> {
  return err instanceof CMError
    ? err.toNextResponse()
    : new CMError(CMErrorType.UnknownError).toNextResponse();
}
