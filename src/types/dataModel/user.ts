import { z } from 'zod';
import zBase, { zObjectId } from './base';

const zUser = z.object({
  name: z.string(),
  email: z.string(),
  image: z.string(),
  isAdmin: z.boolean(),
});

export const zUserEntity = zUser.extend(zBase.shape);
export const zUserResponse = zUserEntity;

export const zAddAdminRequest = z.array(zObjectId);

export const zUpdateAllowedUsersRequest = z.object({
  userEmails: z.array(z.string()),
  adminIds: z.array(zObjectId),
})

export interface User extends z.infer<typeof zUser> { }
export interface UserEntity extends z.infer<typeof zUserEntity> { }
export interface UserResponse extends z.infer<typeof zUserResponse> { }
export interface AddAdminRequest extends z.infer<typeof zAddAdminRequest> { }

export interface UpdateAllowedUsersRequest extends z.infer<typeof zUpdateAllowedUsersRequest> { }

export default zUser;
