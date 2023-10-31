import { Organization } from '@/types/dataModel/organization';
import { Model, Schema, model, models } from 'mongoose';

const OrganizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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

export type OrganizationDocument = Organization & Document;

export default (models.Organization as Model<OrganizationDocument>) ||
  model<OrganizationDocument>('Organization', OrganizationSchema);
