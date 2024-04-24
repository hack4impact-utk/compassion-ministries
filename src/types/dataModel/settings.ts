import { z } from 'zod';
import zBase from './base';

const zSettings = z.object({
  allowedEmails: z.array(z.string().email()),
});

const zSettingsEntity = zSettings.extend(zBase.shape);
const zSettingsResponse = zSettingsEntity;

const zEmail = z.object({
  email: z.string()
});

export const zRemoveAllowedEmailRequest = zEmail;

export interface SettingsEntity extends z.infer<typeof zSettingsEntity> { }
export interface SettingsResponse extends z.infer<typeof zSettingsResponse> { }
export interface RemoveAllowedEmailRequest extends z.infer<typeof zRemoveAllowedEmailRequest> { }