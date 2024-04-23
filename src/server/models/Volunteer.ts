import { roles } from '@/types/dataModel/roles';
import {
  VolunteerEntity,
  backgroundCheckStatuses,
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
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    previousRole: {
      type: String,
      required: false,
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
      _id: false,
    },
    roleVerifications: {
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
          _id: false,
        },
      ],
      required: false,
    },
    softDelete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export interface VolunteerDocument
  extends Omit<VolunteerEntity, '_id'>,
    Document {}

export default (models.Volunteer as Model<VolunteerDocument>) ||
  model<VolunteerDocument>('Volunteer', VolunteerSchema);
