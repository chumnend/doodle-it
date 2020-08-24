import axios from 'axios';
import faker from 'faker';
import logout from '../logout';

jest.mock('axios');

describe('AUTH UNIT TEST - LOGOUT', function () {
  let testToken = faker.random.uuid();

  it('expects to clear login data', async () => {
    // setup test
    axios.defaults.headers.common['Authorization'] = `Bearer ${testToken}`;
    window.localStorage.setItem('token', testToken);

    // start test
    logout();
    expect(axios.defaults.headers.common.Authorization).toEqual(undefined);
    expect(window.localStorage.getItem('jwtToken')).toEqual(null);
  });
});
