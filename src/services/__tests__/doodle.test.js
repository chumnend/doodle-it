import * as m from '../axios';
import faker from 'faker';
import * as Doodle from '../doodle';

m.callAPI = jest.fn();

describe('Doodle Service Test', () => {
  describe('create', () => {
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
      m.callAPI.mockImplementationOnce(() => Promise.resolve(res));

      // start test
      await expect(Doodle.create(mockUserId, mockItem)).resolves.toEqual(
        res.data,
      );
    });

    it('expects axios to fail', async () => {
      // setup test
      m.callAPI.mockImplementationOnce(() => Promise.reject(new Error()));

      // start test
      await expect(Doodle.create(mockUserId, mockItem)).rejects.toThrow();
    });
  });

  describe('getAll', () => {
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
      m.callAPI.mockImplementationOnce(() => Promise.resolve(res));

      // start test
      await expect(Doodle.getAll(mockUserId)).resolves.toEqual(res.data);
    });

    it('expects axios to fail', async () => {
      // setup test
      m.callAPI.mockImplementationOnce(() => Promise.reject(new Error()));

      // start test
      await expect(Doodle.getAll(mockUserId)).rejects.toThrow();
    });
  });

  describe('getOne', () => {
    let mockUserId = faker.random.uuid();
    let mockItemId = faker.random.uuid();

    it('expects to get an item', async () => {
      // setup test
      let res = {
        data: {
          id: mockItemId,
          title: faker.name.title(),
          content: faker.image.dataUri(),
          owner: mockUserId,
        },
      };
      m.callAPI.mockImplementationOnce(() => Promise.resolve(res));

      // start test
      await expect(Doodle.getOne(mockUserId, mockItemId)).resolves.toEqual(
        res.data,
      );
    });

    it('expects axios to fail', async () => {
      // setup test
      m.callAPI.mockImplementationOnce(() => Promise.reject(new Error()));

      // start test
      await expect(Doodle.getOne(mockUserId, mockItemId)).rejects.toThrow();
    });
  });

  describe('update', () => {
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
      m.callAPI.mockImplementationOnce(() => Promise.resolve(res));

      // start test
      await expect(
        Doodle.update(mockUserId, mockItemId, mockItem),
      ).resolves.toEqual(res.data);
    });

    it('expects axios to fail', async () => {
      // setup test
      m.callAPI.mockImplementationOnce(() => Promise.reject(new Error()));

      // start test
      await expect(
        Doodle.update(mockUserId, mockItemId, mockItem),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    let mockUserId = faker.random.uuid();
    let mockItemId = faker.random.uuid();

    it('expects to delete an item', async () => {
      // setup test
      let res = {
        data: {
          id: mockItemId,
          title: faker.name.title(),
          content: faker.image.dataUri(),
          owner: mockUserId,
        },
      };
      m.callAPI.mockImplementationOnce(() => Promise.resolve(res));

      // start test
      await expect(Doodle.remove(mockUserId, mockItemId)).resolves.toEqual(
        res.data,
      );
    });

    it('expects axios to fail', async () => {
      // setup test
      m.callAPI.mockImplementationOnce(() => Promise.reject(new Error()));

      // start test
      await expect(Doodle.remove(mockUserId, mockItemId)).rejects.toThrow();
    });
  });
});
