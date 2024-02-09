import { z } from 'zod';
import zVolunteer, { zVolunteerResponse } from './volunteer';
import zOrganization from './organization';
import zBase, { zObjectId } from './base';
import { zRole } from './roleVerifications';

const zEventVolunteer = z.object({
  role: zRole,
  organization: zOrganization.optional(),
  volunteer: zVolunteer,
  event: zObjectId, //TODO: Replace with zEvent
});

const zEventVolunteerEntity = zEventVolunteer.extend({
  ...zBase.shape,
  organization: zObjectId,
  volunteer: zObjectId,
  event: zObjectId,
});

const zCreateEventVolunteerRequest = zEventVolunteer.extend({
  organization: zObjectId,
  volunteer: zObjectId,
  event: zObjectId,
});

const zEventVolunteerResponse = zEventVolunteerEntity.extend({
  volunteer: zVolunteerResponse,
});

const zVolunteerEventResponse = zEventVolunteerEntity.extend({
  event: zObjectId, // TODO: Change type to zEventResponse once it exists
});

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}
export interface EventVolunteerEntity
  extends z.infer<typeof zEventVolunteerEntity> {}
export interface EventVolunteerResponse
  extends z.infer<typeof zEventVolunteerResponse> {}
export interface VolunteerEventResponse
  extends z.infer<typeof zVolunteerEventResponse> {}
export interface CreateEventVolunteerRequest
  extends z.infer<typeof zCreateEventVolunteerRequest> {}

export default zEventVolunteer;
