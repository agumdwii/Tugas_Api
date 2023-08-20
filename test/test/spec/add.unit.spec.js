const request = require("supertest");
const { expect } = require("chai");
const config = require('../../../data/config.json');
const { getToken } = require('./get.token'); // Pastikan path yang benar

async function addUnit(payload, token){
    const response = await request(config.baseUrl)
        .post("/units")
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
    return response;
}

describe('Unit API', () => {
    it('Success add new unit', async () => {
        const token = await getToken();
        const payload = {
            "name": "Litre",
            "description": "capacity measurement"
        };

        const response = await addUnit(payload, token);
        expect(response.status).to.equal(201);
    });
    it('Failed add new unit', async () => {
        const token = await getToken();
        const payload = {
            "name": "",
            "description": "capacity measurement"
        };

        const response = await addUnit(payload, token);
        expect(response.status).to.equal(400);
    });

});
