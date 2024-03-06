import { EventResponse } from '@/types/dataModel/event';
import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import { CreateVolunteerRequest } from '@/types/dataModel/volunteer';
import { CheckInFormData } from '@/types/forms/checkIn';

export function transformCheckInFormDataToCreateEventVolunteerRequest(
  formData: CheckInFormData,
  volunteer: string | CreateVolunteerRequest,
  event: EventResponse,
  verifier: string | undefined
): CreateEventVolunteerRequest {
  return {
    volunteer,
    event: event._id,
    role: formData.role,
    organization: formData.organization?._id,
    verifier: verifier,
  };
}
