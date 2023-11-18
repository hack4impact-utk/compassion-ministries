import { EventVolunteerEntity } from '@/types/dataModel/eventVolunteer';
import { Model, Schema, model, models } from 'mongoose';

const EventVolunteerSchema = new Schema(
  {
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
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

export interface EventVolunteerDocument
  extends Omit<EventVolunteerEntity, '_id'>,
    Document {}

export default (models.EventVolunteer as Model<EventVolunteerDocument>) ||
  model<EventVolunteerDocument>('EventVolunteer', EventVolunteerSchema);
