import axios from 'axios';
import faker from 'faker';
import update from '../update';

jest.mock('axios');

describe('BILLING UNIT TEST - update', () => {
  let mockUserId = faker.random.uuid();
  let mockItemId = faker.random.uuid();
  let mockItem = {
    title: faker.name.title(),
    content: faker.image.dataUri(),
    width: faker.random.number(),
    height: faker.random.number(),
  };

  it('expects to update an item', async () => {
    // setup test
    let res = {
      data: {
        id: mockItemId,
        title: mockItem.title,
        content: mockItem.content,
        owner: mockUserId,
      },
    };
    axios.put.mockImplementationOnce(() => Promise.resolve(res));

    // start test
    await expect(update(mockUserId, mockItemId, mockItem)).resolves.toEqual(
      res.data,
    );
  });

  it('expects axios to fail', async () => {
    // setup test
    axios.post.mockImplementationOnce(() => Promise.reject(new Error()));

    // start test
    await expect(update(mockUserId, mockItemId, mockItem)).rejects.toThrow();
  });
});
