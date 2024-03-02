import { RecurringEventEntity } from '@/types/dataModel/recurringEvent';
import { Model, Schema, model, models } from 'mongoose';

const RecurringEventSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    recurrence: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export interface RecurringEventDocument
  extends Omit<RecurringEventEntity, '_id'>,
    Document {}

export default (models.RecurringEvent as Model<RecurringEventDocument>) ||
  model<RecurringEventDocument>(
    'RecurringEvent',
    RecurringEventSchema,
    'recurringEvents'
  );
