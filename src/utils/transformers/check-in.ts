import { EventResponse } from '@/types/dataModel/event';
import { CreateEventVolunteerRequest } from '@/types/dataModel/eventVolunteer';
import { VolunteerResponse } from '@/types/dataModel/volunteer';
import { CheckInFormData } from '@/types/forms/checkIn';

export function transformCheckInFormDataToCreateEventVolunteerRequest(
  formData: CheckInFormData,
  volunteer: VolunteerResponse,
  event: EventResponse
): CreateEventVolunteerRequest {
  return {
    volunteer: volunteer._id,
    event: event._id,
    role: formData.role,
    organization: formData.organization?._id,
  };
}
