import zCMErrorType, { CMErrorType } from '@/types/dataModel/cmerror';

export default class CMError extends Error {
  type: CMErrorType;

  constructor(type: CMErrorType, message?: string, options?: ErrorOptions) {
    super(message ?? CMError.getDefaultMessage(type), options);
    this.type = type;
  }

  static getDefaultMessage(type: CMErrorType): string {
    switch (type) {
      case zCMErrorType.Enum.OK:
        return 'Ok';

      case zCMErrorType.Enum.InternalError:
        return 'Internal error';

      case zCMErrorType.Enum.FailedToParse:
        return 'Invalid value';

      case zCMErrorType.Enum.NoSuchKey:
        return 'Key not found';

      case zCMErrorType.Enum.DuplicateKey:
        return 'Duplicate entry';

      default:
        return 'Unknown error';
    }
  }
}
