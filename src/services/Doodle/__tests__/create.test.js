import axios from 'axios';
import faker from 'faker';
import create from '../create';

jest.mock('axios');

describe('DOODLE UNIT TEST - CREATE', () => {
  let mockUserId = faker.random.uuid();
  let mockItem = {
    title: faker.name.title(),
    content: faker.image.dataUri(),
    width: faker.random.number(),
    height: faker.random.number(),
  };

  it('expects to create a new doodle', async () => {
    // setup test
    let res = {
      data: {
        id: faker.random.uuid(),
        title: mockItem.title,
        content: mockItem.content,
        owner: mockUserId,
      },
    };
    axios.post.mockImplementationOnce(() => Promise.resolve(res));

    // start test
    await expect(create(mockUserId, mockItem)).resolves.toEqual(res.data);
  });

  it('expects axios to fail', async () => {
    // setup test
    axios.post.mockImplementationOnce(() => Promise.reject(new Error()));

    // start test
    await expect(create(mockUserId, mockItem)).rejects.toThrow();
  });
});
