import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';
import { roles } from '@/types/dataModel/roles';
import { Model, Schema, model, models } from 'mongoose';

const EventVolunteerSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      enum: roles,
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: false,
    },
    volunteer: {
      type: Schema.Types.ObjectId,
      ref: 'Volunteer',
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

EventVolunteerSchema.index({ event: 1, volunteer: 1 }, { unique: true });

export interface EventVolunteerDocument
  extends Omit<EventVolunteerEntity, '_id'>,
    Document {}

export default (models.EventVolunteer as Model<EventVolunteerDocument>) ||
  model<EventVolunteerDocument>(
    'EventVolunteer',
    EventVolunteerSchema,
    'eventVolunteers'
  );
