import axios from 'axios';
import faker from 'faker';
import getAll from '../getAll';

jest.mock('axios');

describe('BILLING UNIT TEST - LISTITEM', () => {
  let mockUserId = faker.random.uuid();

  it('expects to get items', async () => {
    // setup test
    let res = {
      data: [
        {
          id: faker.random.uuid(),
          title: faker.name.title(),
          content: faker.image.dataUri(),
          owner: mockUserId,
        },
      ],
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(res));

    // start test
    await expect(getAll(mockUserId)).resolves.toEqual(res.data);
  });

  it('expects axios to fail', async () => {
    // setup test
    axios.post.mockImplementationOnce(() => Promise.reject(new Error()));

    // start test
    await expect(getAll(mockUserId)).rejects.toThrow();
  });
});
