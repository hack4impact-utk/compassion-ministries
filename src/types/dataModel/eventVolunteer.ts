import { z } from 'zod';
import zVolunteer, {
  zCreateVolunteerRequest,
  zUnpopulatedVolunteerResponse,
  zVolunteerResponse,
} from './volunteer';
import zOrganization from './organization';
import zBase, { zObjectId } from './base';
import { zRole } from './roles';
import zEvent, { zEventResponse } from './event';

const zEventVolunteer = z.object({
  role: zRole,
  organization: zOrganization.optional(),
  volunteer: zVolunteer,
  event: zEvent,
});

const zEventVolunteerEntity = zEventVolunteer.extend({
  ...zBase.shape,
  organization: zObjectId.optional(),
  volunteer: zObjectId,
  event: zObjectId,
});

export const zCreateEventVolunteerRequest = zEventVolunteer.extend({
  organization: zObjectId.optional(),
  volunteer: z.union([zObjectId, zCreateVolunteerRequest]),
  event: zObjectId,
  verifier: z.string().optional(),
});

const zEventVolunteerResponse = zEventVolunteerEntity.extend({
  volunteer: zUnpopulatedVolunteerResponse,
});

const zVolunteerEventResponse = zEventVolunteerEntity.extend({
  event: zEventResponse,
  organization: zOrganization.optional(),
});

export const zPopulatedEventVolunteerResponse = zEventVolunteerEntity.extend({
  volunteer: zVolunteerResponse,
});

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}
export interface EventVolunteerEntity
  extends z.infer<typeof zEventVolunteerEntity> {}
export interface EventVolunteerResponse
  extends z.infer<typeof zEventVolunteerResponse> {}
export interface VolunteerEventResponse
  extends z.infer<typeof zVolunteerEventResponse> {}
export interface PopulatedEventVolunteerResponse
  extends z.infer<typeof zPopulatedEventVolunteerResponse> {}
export interface CreateEventVolunteerRequest
  extends z.infer<typeof zCreateEventVolunteerRequest> {}

export default zEventVolunteer;
