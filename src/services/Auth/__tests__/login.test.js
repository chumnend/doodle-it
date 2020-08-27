import axios from 'axios';
import faker from 'faker';
import login from '../login';

jest.mock('axios');

describe('AUTH UNIT TEST - LOGIN', () => {
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
    axios.post.mockImplementationOnce(() => Promise.resolve(res));

    // start test
    await expect(login(testUser, testPassword)).resolves.toEqual({
      id: res.data.id,
      username: res.data.username,
    });
    expect(axios.defaults.headers.common.Authorization).toEqual(
      `Bearer ${res.data.token}`,
    );
    expect(window.localStorage.getItem('jwtToken')).toEqual(res.data.token);
  });

  it('expects to unsuccessfully login a user', async () => {
    // setup test
    axios.post.mockImplementationOnce(() => Promise.reject(new Error()));

    // start test
    await expect(login(testUser, testPassword)).rejects.toThrow();
  });
});
