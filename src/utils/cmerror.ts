import zCMErrorType, { CMErrorType } from '@/types/dataModel/cmerrortype';

const defaultErrorMessages: Map<CMErrorType, string> = new Map<
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

const defaultStatusCodes: Map<CMErrorType, number> = new Map<
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

export default class CMError extends Error {
  type: CMErrorType;
  status: number;

  constructor(
    type: CMErrorType,
    options?: { status?: number; message?: string; cause?: unknown }
  ) {
    super(
      options?.message ??
        defaultErrorMessages.get(type) ??
        defaultErrorMessages.get(zCMErrorType.Enum.UnknownError),
      options ? { cause: options.cause } : undefined
    );

    this.type = type;
    this.status =
      options?.status ??
      defaultStatusCodes.get(type) ??
      defaultStatusCodes.get(zCMErrorType.Enum.UnknownError) ??
      500;
  }

  toResponse() {
    return {
      message: this.message,
      status: this.status,
    };
  }
}
