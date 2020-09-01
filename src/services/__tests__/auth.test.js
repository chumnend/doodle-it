import * as m from '../axios';
import faker from 'faker';
import * as Auth from '../auth';

m.callAPI = jest.fn();

describe('Auth Service Test', () => {
  describe('login', () => {
    let testUser = faker.internet.userName();
    let testPassword = faker.internet.password();

    it('expects to successfully login a user', async () => {
      // setup test
      let res = {
        data: {
          id: faker.random.uuid(),
          token: faker.random.uuid(),
          username: testUser,
        },
      };
      m.callAPI.mockImplementationOnce(() => Promise.resolve(res));

      // start test
      await expect(Auth.login(testUser, testPassword)).resolves.toEqual({
        id: res.data.id,
        username: res.data.username,
      });
      expect(m.getTokenHeader()).toEqual(`Bearer ${res.data.token}`);
      expect(window.localStorage.getItem('token')).toEqual(res.data.token);
    });

    it('expects to unsuccessfully login a user', async () => {
      // setup test
      m.callAPI.mockImplementationOnce(() => Promise.reject(new Error()));

      // start test
      await expect(Auth.login(testUser, testPassword)).rejects.toThrow();
    });
  });

  describe('register', () => {
    let testEmail = faker.internet.email();
    let testUser = faker.internet.userName();
    let testPassword = faker.internet.password();

    it('expects to successfully create a user', async () => {
      // setup test
      let res = {
        data: {
          id: faker.random.uuid(),
          token: faker.random.uuid(),
          username: testUser,
        },
      };
      m.callAPI.mockImplementationOnce(() => Promise.resolve(res));

      // start test
      await expect(
        Auth.register(testEmail, testUser, testPassword),
      ).resolves.toEqual({
        id: res.data.id,
        username: res.data.username,
      });
      expect(m.getTokenHeader()).toEqual(`Bearer ${res.data.token}`);
      expect(window.localStorage.getItem('token')).toEqual(res.data.token);
    });

    it('expects to unsuccessfully create a user', async () => {
      // setup test
      m.callAPI.mockImplementationOnce(() => Promise.reject(new Error()));

      // start test
      await expect(
        Auth.register(testEmail, testUser, testPassword),
      ).rejects.toThrow();
    });
  });

  describe('logout', () => {
    let testToken = faker.random.uuid();

    it('expects to clear login data', async () => {
      // setup test
      m.setTokenHeader(testToken);
      window.localStorage.setItem('token', testToken);

      // start test
      Auth.logout();
      expect(m.getTokenHeader()).toEqual(undefined);
      expect(window.localStorage.getItem('token')).toEqual(null);
    });
  });
});
