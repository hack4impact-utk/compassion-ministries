import { UserEntity } from '@/types/dataModel/user';
import { Model, Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

UserSchema.post('find', function (docs: UserEntity[]) {
    docs.forEach((doc) => {
        doc._id = doc._id.toString();
    });
});

UserSchema.post('findOne', function (doc: UserEntity) {
    if (doc) {
        doc._id = doc._id.toString();
    }
});

UserSchema.post(/findById/, function (doc: UserEntity) {
    if (doc) {
        doc._id = doc._id.toString();
    }
});

export interface UserDocument
    extends Omit<UserEntity, '_id'>,
    Document { }

export default (models.User as Model<UserDocument>) ||
    model<UserDocument>('User', UserSchema);
