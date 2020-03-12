import axios from "axios";
import faker from "faker";
import getOne from "../getOne";

jest.mock("axios");

describe("BILLING UNIT TEST - getOne", () => {
    let mockUserId = faker.random.uuid();
    let mockItemId = faker.random.uuid();
    
    it("expects to get an item", async () => {
        // setup test
        let res = {
            data: {
                id: mockItemId,
                title: faker.name.title(),
                content: faker.image.dataUri(),
                owner: mockUserId,
            }
        };
        axios.get.mockImplementationOnce( () => Promise.resolve(res));
        
        // start test
        await expect(getOne(mockUserId, mockItemId)).resolves.toEqual(res.data);
    });

    it("expects axios to fail", async () => {
        // setup test
        axios.post.mockImplementationOnce(() => Promise.reject(new Error()));
        
        // start test
        await expect(getOne(mockUserId, mockItemId)).rejects.toThrow();
    });
});
