import { OrganizationEntity } from '@/types/dataModel/organization';
import { Model, Schema, model, models, Document } from 'mongoose';

const OrganizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

OrganizationSchema.post('find', function (docs: OrganizationEntity[]) {
  docs.forEach((doc) => {
    doc._id = doc._id.toString();
  });
});

OrganizationSchema.post('findOne', function (doc: OrganizationEntity) {
  if (doc) {
    doc._id = doc._id.toString();
  }
});

OrganizationSchema.post(/findById/, function (doc: OrganizationEntity) {
  if (doc) {
    doc._id = doc._id.toString();
  }
});

export interface OrganizationDocument
  extends Omit<OrganizationEntity, '_id'>,
    Document {}

export default (models.Organization as Model<OrganizationDocument>) ||
  model<OrganizationDocument>('Organization', OrganizationSchema);
