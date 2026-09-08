import { beforeEach, describe } from 'node:test';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
    usersController = new UsersController(usersService);
  });

  describe('register', () => {
    it('Should get user profile and return it', async () => {});

    //TODO - CONTINUAR ESCREVENDO ESSES TESTES

    const result: User = {
      id: 2,
      username: 'cauanzela',
      email: 'valid.email@gmail.com',
      password: '$2b$10$sagPg9vIx54msAsXDG7zUu9L2FYYb6oX9.s25rKH7qs6be3bkNkYi',
      createdAt: '2026-08-31T21:46:53.000Z',
      updatedAt: '2026-08-31T21:46:53.000Z',
    };

    expect(await usersController.getProfile()).toBe(result);
  });
});
