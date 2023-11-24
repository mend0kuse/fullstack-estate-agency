import { EnumToUnion } from '@/shared/lib/typescript/EnumToUnion';
import { makeAutoObservable } from 'mobx';
import { Nullable } from '@/shared/lib/typescript/Nullable';
import { TApartment } from '@/entities/apartment';

export type TUser = {
    id: number;
    email: string;
    role: TUserRole;
    apartment: TApartment[];
    profile: TProfile;
};

export type TProfile = {
    name: string;
    age: string;
    avatar: string;
};

export type UserInput = { password: string; email: string };
export type ProfileInput = { age?: string; name?: string; avatar?: File | null };

export const USER_ROLE = {
    USER: 'user',
    MANAGER: 'manager',
} as const;

export type TUserRole = EnumToUnion<typeof USER_ROLE>;

export class User {
    data: Nullable<TUser> = null;

    constructor() {
        makeAutoObservable(this);
    }

    setData(data: TUser | null) {
        this.data = data;
    }

    get isManager() {
        return this.data?.role === 'manager';
    }

    get avatar() {
        return this.data?.profile.avatar;
    }

    get role() {
        return this.data?.role;
    }

    get email() {
        return this.data?.email;
    }

    get name() {
        return this.data?.profile.name;
    }

    get id() {
        return this.data?.id;
    }
}

export const user = new User();
