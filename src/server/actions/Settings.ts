import { SettingsResponse } from '@/types/dataModel/settings';
import CMError, { CMErrorType } from '@/utils/cmerror';
import dbConnect from '@/utils/db-connect';
import Settings from '../models/Settings';

export async function getSettings(): Promise<SettingsResponse> {
  let settingsArr: SettingsResponse[] = [];

  try {
    await dbConnect();
    settingsArr = await Settings.find({}).lean();

    // there should always be exactly one settins object in the db
    if (settingsArr.length !== 1) {
      throw new CMError(
        CMErrorType.InternalError,
        `${settingsArr.length} settings records found. Expected 1.`
      );
    }
  } catch (e) {
    if (e instanceof CMError) {
      throw e;
    } else throw new CMError(CMErrorType.UnknownError);
  }

  return settingsArr[0];
}
