const request = require("supertest");
const { expect } = require("chai");
const config = require('../../../data/config.json');
const { getToken } = require('./get.token'); // Pastikan path yang benar

async function addCategories(payload, token){
    const response = await request(config.baseUrl)
        .post("/categories")
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
    return response;
}

describe('Categories API', () => {
    it('Success add new categories', async () => {
        const token = await getToken();
        const payload = {
            "name": "Buah Potong",
            "description": "buah potong segar, dipotong setiap ada pesanan"
        };

        const response = await addCategories(payload, token);
        expect(response.status).to.equal(201);
    });
    it('Failed add new categories', async () => {
        const token = await getToken();
        const payload = {
            "name": "",
            "description": "buah potong segar, dipotong setiap ada pesanan"
        };

        const response = await addCategories(payload, token);
        expect(response.status).to.equal(400);
    });

});
