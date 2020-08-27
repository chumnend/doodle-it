import axios from 'axios';
import faker from 'faker';
import register from '../register';

jest.mock('axios');

describe('AUTH UNIT TEST - REGISTER', () => {
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
    axios.post.mockImplementationOnce(() => Promise.resolve(res));

    // start test
    await expect(register(testEmail, testUser, testPassword)).resolves.toEqual({
      id: res.data.id,
      username: res.data.username,
    });
    expect(axios.defaults.headers.common.Authorization).toEqual(
      `Bearer ${res.data.token}`,
    );
    expect(window.localStorage.getItem('jwtToken')).toEqual(res.data.token);
  });

  it('expects to unsuccessfully create a user', async () => {
    // setup test
    axios.post.mockImplementationOnce(() => Promise.reject(new Error()));

    // start test
    await expect(register(testEmail, testUser, testPassword)).rejects.toThrow();
  });
});
