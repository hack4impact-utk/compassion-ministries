import { OrganizationEntity } from '@/types/dataModel/organization';
import { Model, Schema, model, models, Document } from 'mongoose';

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

export interface OrganizationDocument
  extends Omit<OrganizationEntity, '_id'>,
    Document {}

export default (models.Organization as Model<OrganizationDocument>) ||
  model<OrganizationDocument>('Organization', OrganizationSchema);
