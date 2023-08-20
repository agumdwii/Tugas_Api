const request = require("supertest");
const { expect } = require("chai");
const config = require('../../../data/config.json');
const { getToken } = require('./get.token'); // Pastikan path yang benar

async function addProducts(payload, token){
    const response = await request(config.baseUrl)
        .post("/products")
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
    return response;
}

describe('Products API', () => {
    it('Success add new product', async () => {
        const token = await getToken();
        const payload = {
            "category_id" : "118602a1-7432-4b82-9a2a-e42d60cf83ac",
            "code": "A314ASDDFIER3432",
            "name": "semangka potong",
            "price": "3500",
            "cost": "3000",
            "stock": "5"
         };

        const response = await addProducts(payload, token);
        expect(response.status).to.equal(201);
    });
    

    it('Failed add new product', async () => {
        const token = await getToken();
        const payload = {
            "category_id" : "432-4b82-9a2a-e42d60cf83ac",
            "code": "A314ASDDFIER3432",
            "name": "semangka potong",
            "price": "3500",
            "cost": "3000",
            "stock": "5"
         };

        const response = await addProducts(payload, token);
        expect(response.status).to.equal(400);
    });
});
