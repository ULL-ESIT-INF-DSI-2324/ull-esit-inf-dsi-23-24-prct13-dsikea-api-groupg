import request from 'supertest';
import app from '../src/app.js';
import 'mocha';
import { expect as chaiExpect } from 'chai';

// pruebas para /transactions

describe('POST /transactions', () => {
	it('Should successfully create a new customer', async () => {
		await request(app).post('/customers').send({
			nif: "example",
			name: "testCustomer",
			contact: "testContactName",
			address: "testAddress"
		}).expect(200);
	});
	it('Should successfully create a new furniture', async () => {
		await request(app).post('/furniture').send({
			name: "testFurnitureFOR TRANSACTION",
			type: "testType",
			description: "testDescription",
			material: "madera",
			dimensions: "40x40x40",
			price: 50,
			currentStock: 10,
			color: "marrón"
		}).expect(200);
	});
	let furnitureId: string;
	let customerId: string;
	it('Should successfully get id of furniture', async () => {
		const res = await request(app).get('/furniture');
		const furniture = res.body.find((furniture: { name: string; }) => furniture.name === 'testFurnitureFOR TRANSACTION');
		furnitureId = furniture._id;
		chaiExpect(furniture).to.have.property('_id');
	});
	it('Should successfully get id of customers', async () => {
		const res = await request(app).get('/customers');
		const customer = res.body.find((customer: { name: string; }) => customer.name === 'testCustomer');
		customerId = customer._id;
		chaiExpect(customer).to.have.property('_id');
	});
	it('Should successfully create a new transaction with the furniture id and customer id', async () => {
		await request(app).post('/transactions').send({
			type: "Venta",
			furniture: [
				{
					_id: furnitureId,
					quantity: 1
				}
			],
			customer: customerId,
			amount: 100,
			date: "2021/06/24",
			time: "12:00:00"
		}).expect(200);
	});
});
describe('GET /transactions', () => {
	it('Should successfully get all transactions', async () => {
		await request(app).get('/transactions').expect(200);
	});
});