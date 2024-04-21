import { z } from 'zod';
import zBase from './base';

const zUser = z.object({
    name: z.string(),
    email: z.string(),
    image: z.string(),
})

export const zUserEntity = zUser.extend(zBase.shape);
export const zUserResponse = zUserEntity;

export interface User extends z.infer<typeof zUser> { }
export interface UserEntity extends z.infer<typeof zUserEntity> { }
export interface UserResponse
    extends z.infer<typeof zUserResponse> { }

export default zUser;