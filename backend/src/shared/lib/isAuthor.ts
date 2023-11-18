import { ForbiddenException } from '@nestjs/common/exceptions';
import { type User } from 'src/user/schemas/user.dto';
import { TApartmentWithUser } from '../../apartment/models/apartment';

export const isAuthor = (user: User | undefined, apartment: TApartmentWithUser) => {
    if (user?.id !== apartment.user.id) {
        throw new ForbiddenException();
    }

    return true;
};
