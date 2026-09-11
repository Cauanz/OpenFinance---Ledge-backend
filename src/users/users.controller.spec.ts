import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

const expectedUser: User = {
  id: '2',
  username: 'cauanzela',
  email: 'valid.email@gmail.com',
  password: '$2b$10$sagPg9vIx54msAsXDG7zUu9L2FYYb6oX9.s25rKH7qs6be3bkNkYi',
  recurrences: [],
  transactions: [],
  createdAt: '2026-08-31T21:46:53.000Z',
  updatedAt: '2026-08-31T21:46:53.000Z',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = {
      getProfile: async () => expectedUser,
    } as unknown as UsersService;
    usersController = new UsersController(usersService);
  });

  describe('register', () => {
    it('should get the user profile and return it', async () => {
      expect(usersController.getProfile())
  });
});