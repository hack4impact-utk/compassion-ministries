import { NextResponse } from 'next/server';

export enum CMErrorType {
  OK,
  UnknownError,
  InternalError,
  BadValue,
  NoSuchKey,
  DuplicateKey,
}

const cmErrorTypeStatusCodes: { readonly [id: number]: number } = {
  [CMErrorType.OK]: 200,
  [CMErrorType.UnknownError]: 500,
  [CMErrorType.InternalError]: 500,
  [CMErrorType.BadValue]: 400,
  [CMErrorType.NoSuchKey]: 404,
  [CMErrorType.DuplicateKey]: 409,
};

const cmErrorDefaultErrMsgs: {
  readonly [id: number]: { template: string; source: string };
} = {
  [CMErrorType.OK]: { template: 'Ok', source: '' },
  [CMErrorType.UnknownError]: { template: 'Unknown error', source: '' },
  [CMErrorType.InternalError]: { template: 'Internal error', source: '' },
  [CMErrorType.BadValue]: { template: 'Invalid %s', source: 'Value' },
  [CMErrorType.NoSuchKey]: { template: '%s not found', source: 'Key' },
  [CMErrorType.DuplicateKey]: { template: 'Duplicate %s', source: 'Entry' },
};

// Generate an error message for an error type, optionally filling in contextual info
export function getCMErrMsg(errtype: CMErrorType, source?: string): string {
  const defaultErrMsgInfo = cmErrorDefaultErrMsgs[errtype];
  return defaultErrMsgInfo.template.replace(
    '%s',
    source ?? defaultErrMsgInfo.source
  );
}

// Custom error type constructed with CMErrorType values
export default class CMError extends Error {
  readonly type: CMErrorType;

  // Constructs a CMError based on a CMErrorType value
  // Default message for a CMErrorType can be overridden with options param
  // Generally best to use cmErrorMsg() for error messages
  constructor(type: CMErrorType, message?: string) {
    super(message ?? getCMErrMsg(type));
    this.type = type;
  }

  // Get a response object representing this CMError
  toResponse(): Response {
    return NextResponse.json(
      { message: this.message },
      { status: cmErrorTypeStatusCodes[this.type] }
    );
  }
}

// If err is a CMError, return the value from toResponse()
// Otherwise, create a CMError with err type UnknownError and return its toResponse()
export function CMErrorResponse(err: unknown): Response {
  if (err instanceof CMError) {
    return err.toResponse();
  } else {
    return new CMError(CMErrorType.UnknownError).toResponse();
  }
}
