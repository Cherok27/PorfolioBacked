import * as bcrypt from 'bcrypt';
interface SeedUser {
  username: string;
  email: string;
  pasword: string;
  roles: string[];
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      username: 'testUser1',
      email: 'test1@yahoo.com',
      pasword: bcrypt.hashSync('Abc123', 10),
      roles: ['admin'],
    },
    {
      username: 'testUser2',
      email: 'test2@yahoo.com',
      pasword: bcrypt.hashSync('Abc321', 10),
      roles: ['user'],
    },
  ],
};
