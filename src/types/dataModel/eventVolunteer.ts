import { z } from 'zod';
import zVolunteer, {
  zCreateVolunteerRequest,
  zUnpopulatedVolunteerResponse,
  zUpdateVolunteerRequest,
  zVolunteerResponse,
} from './volunteer';
import zOrganization, { zOrganizationResponse } from './organization';
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

export const zCreateEventVolunteerRequestBase = zEventVolunteer.extend({
  organization: zObjectId.optional(),
  event: zObjectId,
  volunteer: z.union([zObjectId, zCreateVolunteerRequest]),
  verifier: z.string().optional(),
});
// If `isEdited` is false (when updating an existing volunteer during checkin), zCreateEventVolunteerRequest will just be zCreateEventVolunteerRequestBase.
// Otherwise, the volunteer field will be an ObjectId, and `updatedVolunteer` will exist
export const zCreateEventVolunteerRequest = z.discriminatedUnion('isEdited', [
  zCreateEventVolunteerRequestBase.extend({
    isEdited: z.literal(false),
  }),
  zCreateEventVolunteerRequestBase.extend({
    isEdited: z.literal(true),
    volunteer: zObjectId,
    updatedVolunteer: zUpdateVolunteerRequest,
  }),
]);

const zUpdateEventVolunteerRequestBase = z.object({
  role: zRole,
  organization: zObjectId,
});

export const zUpdateEventVolunteerRequest = z.union([
  zUpdateEventVolunteerRequestBase,
  zUpdateEventVolunteerRequestBase.omit({ organization: true }),
  zUpdateEventVolunteerRequestBase.omit({ role: true }),
]);

const zEventVolunteerResponse = zEventVolunteerEntity.extend({
  volunteer: zUnpopulatedVolunteerResponse,
  organization: zOrganizationResponse,
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
export type CreateEventVolunteerRequest = z.infer<
  typeof zCreateEventVolunteerRequest
>;
export type UpdateEventVolunteerRequest = z.infer<
  typeof zUpdateEventVolunteerRequest
>;

export default zEventVolunteer;
