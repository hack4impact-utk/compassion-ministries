import {
  Volunteer,
  backgroundCheckStatuses,
  roles,
} from '@/types/dataModel/volunteer';
import { Model, Schema, model, models } from 'mongoose';

const VolunteerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    previousRole: {
      type: String,
      required: true,
      enum: roles,
    },
    previousOrganization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: false,
    },
    backgroundCheck: {
      type: {
        status: {
          type: String,
          required: true,
          enum: backgroundCheckStatuses,
        },
        lastUpdated: {
          type: Date,
          required: true,
        },
      },
      required: false,
    },
    roleVerification: {
      type: [
        {
          verifier: {
            type: String,
            required: true,
          },
          lastUpdated: {
            type: Date,
            required: true,
          },
          role: {
            type: String,
            required: true,
            enum: roles,
          },
        },
      ],
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export type VolunteerDocument = Volunteer & Document;

export default (models.Volunteer as Model<VolunteerDocument>) ||
  model<VolunteerDocument>('Volunteer', VolunteerSchema);
