import { EventEntity } from '@/types/dataModel/event';
import { roles } from '@/types/dataModel/roles';
import { Model, Schema, model, models } from 'mongoose';

const EventSchema = new Schema(
  {
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
    emails: {
      type: [
        {
          subject: {
            type: String,
            required: false,
          },
          body: {
            type: String,
            required: true,
          },
          sentDate: {
            type: Date,
            required: true,
          }
        },
      ],
      required: true,
      default: [],
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

EventSchema.post('find', function (docs: EventEntity[]) {
  docs.forEach((doc) => {
    doc._id = doc._id.toString();
  });
});

EventSchema.post('findOne', function (doc: EventEntity) {
  if (doc) {
    doc._id = doc._id.toString();
  }
});

EventSchema.post(/findById/, function (doc: EventEntity) {
  if (doc) {
    doc._id = doc._id.toString();
  }
});

export interface EventDocument extends Omit<EventEntity, '_id'>, Document { }

export default (models.Event as Model<EventDocument>) ||
  model<EventDocument>('Event', EventSchema);
