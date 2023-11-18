import { z } from 'zod';
import zVolunteer, { zRole, zVolunteerResponse } from './volunteer';
import zOrganization from './organization';
import zBase, { zObjectId } from './base';

const zEventVolunteer = z.object({
  role: zRole,
  organization: zOrganization.optional(),
  volunteer: zVolunteer,
  event: zObjectId, //TODO: Replace with zEvent
});

const zEventVolunteerEntity = zEventVolunteer.extend({
  ...zBase.shape,
  role: zObjectId,
  organization: zObjectId,
  volunteer: zObjectId,
  event: zObjectId,
});

const zCreateEventVolunteerRequest = zEventVolunteer;

const zEventVolunteerResponse = zEventVolunteerEntity.extend({
  volunteer: zVolunteerResponse,
});

//TODO: uncomment this (once zEventResponse exists)
/*
const zVolunteerEventResponse = zEventVolunteerEntity.extend({
    event: zEventResponse
});
*/

export interface EventVolunteer extends z.infer<typeof zEventVolunteer> {}
export interface EventVolunteerEntity
  extends z.infer<typeof zEventVolunteerEntity> {}
export interface EventVolunteerResponse
  extends z.infer<typeof zEventVolunteerResponse> {}
export interface CreateEventVolunteerRequest
  extends z.infer<typeof zCreateEventVolunteerRequest> {}

export default zEventVolunteer;
