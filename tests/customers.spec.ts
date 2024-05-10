import request from 'supertest';
import app from '../src/app.js';
import 'mocha';
import { expect as chaiExpect } from 'chai';

// pruebas para /customers

describe('POST /customers', () => {
	it('Should successfully create a new customer', async () => {
		await request(app).post('/customers').send({
			nif: "example",
			name: "testCustomer",
			contact: "testContactName",
			address: "testAddress"
		}).expect(200);
	});
});
describe('GET /customers', () => {
	it('Should successfully get all customers', async () => {
		await request(app).get('/customers').expect(200);
	});
});
describe('DELETE /customers', () => {
	it('Should successfully delete a customer by query', async () => {
		await request(app).delete('/customers/delete?nif=example').expect(200);
	});
});
describe('POST /customers', () => {
	it('Should successfully create a new customer', async () => {
		await request(app).post('/customers').send({
			nif: "example",
			name: "testCustomer",
			contact: "testContactName",
			address: "testAddress"
		}).expect(200);
	});
});
describe('PATCH /customers', () => {
	it('Should successfully update a customer by query', async () => {
		await request(app).patch('/customers/update?nif=example').send({
			nif: "example",
			name: "testCustomer",
			contact: "testContactName",
			address: "testAddress2"
		}).expect(200);
	});
	it('Should check if the customer was updated', async () => {
		const res = await request(app).get('/customers');
		const customer = res.body.find((customer: { name: string; }) => customer.name === 'testCustomer');
		chaiExpect(customer.address).to.equal('testAddress2');
	});
});
describe('DELETE /customers', () => {
	it('Should successfully delete a customer by query', async () => {
		await request(app).delete('/customers/delete?nif=example').expect(200);
	});
});

describe('PATCH /customers', () => {
	it('Should successfully create a new customer', async () => {
		await request(app).post('/customers').send({
			nif: "example",
			name: "testCustomer",
			contact: "testContactName",
			address: "testAddress"
		}).expect(200);
	});
	it('Should successfully update a customer by id', async () => {
		const res = await request(app).get('/customers');
		const customer = res.body.find((customer: { name: string; }) => customer.name === 'testCustomer');
		await request(app).patch(`/customers/${customer._id}`).send({
			nif: "example",
			name: "testCustomer",
			contact: "testContactName",
			address: "testAddress2"
		}).expect(200);
	});
	it('Should check if the customer was updated', async () => {
		const res = await request(app).get('/customers');
		const customer = res.body.find((customer: { name: string; }) => customer.name === 'testCustomer');
		chaiExpect(customer.address).to.equal('testAddress2');
	});
});



