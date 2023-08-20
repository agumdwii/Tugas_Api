const request = require("supertest");
const { expect } = require("chai");
const config = require('../../../data/config.json');
const { getToken } = require('./get.token'); // Pastikan path yang benar

async function addCustomers(payload, token){
    const response = await request(config.baseUrl)
        .post("/customers")
        .send(payload)
        .set('Authorization', `Bearer ${token}`);
    return response;
}

describe('Customers API', () => {
    it('Success add new customers', async () => {
        const token = await getToken();
        const payload = {
            "name": "Tika",
            "phone": "0897011309",
            "address": "Bandung",
            "description": "customer sebelah"
         };

        const response = await addCustomers(payload, token);
        expect(response.status).to.equal(201);
    });
    it('Failed add new customers', async () => {
        const token = await getToken();
        const payload = {
            "name": "",
            "phone": "0897011309",
            "address": "Bandung",
            "description": "customer sebelah"
         };

        const response = await addCustomers(payload, token);
        expect(response.status).to.equal(400);
    });

});
