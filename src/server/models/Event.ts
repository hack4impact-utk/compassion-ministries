import { EventEntity } from '@/types/dataModel/event';
import { roles } from '@/types/dataModel/roles';
import { Model, Schema, model, models } from 'mongoose';

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  eventLocation: {
    type: String,
    required: false,
  },
  startAt: {
    type: Date, // actually just using the time
    required: true,
  },
  endAt: {
    type: Date, // actually just using the time
    required: true,
  },
  date: {
    type: Date, // only using date
    required: false,
  },
  eventRoles: {
    type: [
      {
        type: String,
        required: true,
        enum: roles,
      },
    ],
  },
  emailBodies: {
    type: [
      {
        type: String,
        required: true,
      },
    ],
  },
  isRecurring: {
    type: Boolean,
    required: true,
  },
  parentEvent: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: false,
  },
});

export interface EventDocument extends Omit<EventEntity, '_id'>, Document {}

export default (models.Event as Model<EventDocument>) ||
  model<EventDocument>('Event', EventSchema);
