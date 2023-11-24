import { beforeEach, describe, expect, it } from 'vitest';
import { User, USER_ROLE } from '@/entities/user/model';

const mockUser = {
    id: 1,
    email: 'asd@mail.ru',
    profile: { name: 'Daria', age: '20', avatar: '' },
    role: USER_ROLE.MANAGER,
    apartment: [],
};

describe('Тестирование класса User', () => {
    const user = new User();

    describe('Тестирование с переданным user', () => {
        beforeEach(() => {
            user.setData(mockUser);
        });

        it('Геттер isManager должен возвращать true при роли manager', () => {
            expect(user.isManager).toBe(true);
        });

        it('Геттер role должен возвращать переданный role', () => {
            expect(user.role).toBe(mockUser.role);
        });

        it('Геттер name должен возвращать profile.name', () => {
            expect(user.name).toBe(mockUser.profile.name);
        });
    });

    describe('Тестирование с переданным null', () => {
        beforeEach(() => {
            user.setData(null);
        });

        it('Геттер isManager должен возвращать false', () => {
            expect(user.isManager).toBe(false);
        });

        it('Геттер role должен возвращать undefined', () => {
            expect(user.role).toBe(undefined);
        });

        it('Геттер name должен возвращать undefined', () => {
            expect(user.name).toBe(undefined);
        });
    });
});
