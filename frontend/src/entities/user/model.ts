import { EnumToUnion } from '@/shared/lib/typescript/EnumToUnion';
import { makeAutoObservable } from 'mobx';
import { Nullable } from '@/shared/lib/typescript/Nullable';

export type TUser = {
    id: number;
    email: string;
    role: TUserRole;
};

export type UserInput = { password: string; email: string };

export const USER_ROLE = {
    USER: 'user',
    MANAGER: 'manager',
} as const;

export type TUserRole = EnumToUnion<typeof USER_ROLE>;

class User {
    data: Nullable<TUser> = null;

    constructor() {
        makeAutoObservable(this);
    }

    logout() {
        this.data = null;
    }

    setData(data: TUser) {
        this.data = data;
    }
}

export const user = new User();
