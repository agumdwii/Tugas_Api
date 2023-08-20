const request = require("supertest");
const { expect } = require("chai");
const config = require('../../../data/config.json')

async function getToken(payload) {
    const response = await request(config.baseUrl)
        .post("/authentications")
        .send(payload);
    return response;
}

describe('Login Account', () => {
    it('should perform a successful login', async () => {
        const payload = {
            "email": "agum@ex.com",
            "password": "xxiiuoeyt123",
        };

        const response = await getToken(payload);
        

        // Memastikan respons memiliki status 200
        expect(response.status).to.equal(201);
    });
});
