import request from 'supertest';
import app from '../src/app.js';
import 'mocha';
import { expect as chaiExpect } from 'chai';

// pruebas para /transactions

before(async () => {
	await request(app).post('/customers').send({
		nif: "example123",
		name: "testCustomer123",
		contact: "testContactName123",
		address: "testAddress123"
	}).expect(200);

	await request(app).post('/providers').send({
		name: "exampleTransaction",
		contact: "testContactName",
		address: "testAddress",
		cif: "123"
	}).expect(200);

	await request(app).post('/furniture').send({
		name: "testFurnitureFOR TRANSACTION",
		type: "a",
		description: "d",
		material: "madera",
		dimensions: "3",
		price: 2,
		currentStock: 5,
		color: "verde"
	}).expect(200);
});

after(async () => {
	const res = await request(app).get('/furniture');
	const furniture = res.body.find((furniture: { name: string; }) => furniture.name === 'testFurnitureFOR TRANSACTION');
	await request(app).delete(`/furniture/${furniture._id}`).expect(200);
	const res2 = await request(app).get('/customers');
	const customer = res2.body.find((customer: { name: string; }) => customer.name === 'testCustomer123');
	await request(app).delete(`/customers/${customer._id}`).expect(200);
	const res3 = await request(app).get('/providers');
	const provider = res3.body.find((provider: { name: string; }) => provider.name === 'exampleTransaction');
	await request(app).delete(`/providers/${provider._id}`).expect(200);
});

let TransactionDummy1: string;
let TransactionDummy2: string;

describe('POST /transactions', async () => {
	let customerNif: string;
	let providerCif: string;
	it('Should successfully get id of customers', async () => {
		const res = await request(app).get('/customers');
		const customer = await res.body.find((customer: { name: string; }) => customer.name === 'testCustomer123');
		Promise.resolve(customer);
		customerNif = customer.nif;
		chaiExpect(customerNif).to.be.a('string');
	});

	it('Should successfully get id of providers', async () => {
		const res = await request(app).get('/providers');
		const provider = await res.body.find((provider: { name: string; }) => provider.name === 'exampleTransaction');
		Promise.resolve(provider);
		providerCif = provider.cif;
		chaiExpect(providerCif).to.be.a('string');
	});

	it('Should successfully create a new sell', async () => {
		await request(app).post('/transactions').send({
			"type": "Venta",
			"nif": customerNif,
			"furnitureList": [
					{
							"name": "testFurnitureFOR TRANSACTION",
							"quantity": 3
					},
			]
	}).expect(201);
	});

	it('After the sell, the stock of the furniture should be 2', async () => {
		const res = await request(app).get('/furniture');
		const furniture = await res.body.find((furniture: { name: string; }) => furniture.name === 'testFurnitureFOR TRANSACTION');
		Promise.resolve(furniture);
		chaiExpect(furniture.currentStock).to.equal(2);
	});

	it('Should successfully create a new buy', async () => {
		await request(app).post('/transactions').send({
			"type": "Compra",
			"cif": providerCif,
			"furnitureList": [
					{
							"name": "testFurnitureFOR TRANSACTION",
							"quantity": 3
					},
			]
	}).expect(201);
	});

	it('After the buy, the stock of the furniture should be 5', async () => {
		const res = await request(app).get('/furniture');
		const furniture = await res.body.find((furniture: { name: string; }) => furniture.name === 'testFurnitureFOR TRANSACTION');
		Promise.resolve(furniture);
		chaiExpect(furniture.currentStock).to.equal(5);
	});
});
describe('GET /transactions', () => {
	it('Should successfully get all transactions', async () => {
		await request(app).get('/transactions').expect(200);
	});

	it('Should get transactions by customer nif', async () => {
		const res = await request(app).get('/transactions/customer?nif=example123');
		const transaction = res.body[0];
		chaiExpect(transaction.type).to.equal('Venta');
		TransactionDummy1 = transaction._id;
	});

	it('Should get transactions by provider cif', async () => {
		const res = await request(app).get('/transactions/provider?cif=123');
		const transaction = res.body[0];
		chaiExpect(transaction.type).to.equal('Compra');
		TransactionDummy2 = transaction._id;
	});

	it('Should get transactions by id', async () => {
		await request(app).get(`/transactions/${TransactionDummy1}`).expect(200);
		await request(app).get(`/transactions/${TransactionDummy2}`).expect(200);
	});
});

describe('PATCH /transactions', () => {

	let furnitureId: string;
	it('Should get the id of the furniture', async () => {
		const res = await request(app).get('/furniture');
		const furniture = res.body.find((furniture: { name: string; }) => furniture.name === 'testFurnitureFOR TRANSACTION')._id;
		Promise.resolve(furniture);
		furnitureId = furniture;
	});

	it('Should successfully update a transaction by id', async () => {
		await request(app).patch(`/transactions/${TransactionDummy2}`).send({
			"furniture": [
					{
							"_id": furnitureId,
							"quantity": "1"
					}
			]
	}).expect(200);
	});

	it('After the update of the buy, the stock of the furniture should be 3', async () => {
		const res = await request(app).get('/furniture');
		const furniture = await res.body.find((furniture: { name: string; }) => furniture.name === 'testFurnitureFOR TRANSACTION');
		Promise.resolve(furniture);
		chaiExpect(furniture.currentStock).to.equal(3);
	});

	it('Should successfully update a transaction by id', async () => {
		await request(app).patch(`/transactions/${TransactionDummy1}`).send({
			"furniture": [
					{
							"_id": furnitureId,
							"quantity": "1"
					}
			]
	}).expect(200);
	});

	it('After the update of the sell, the stock of the furniture should be 5', async () => {
		const res = await request(app).get('/furniture');
		const furniture = await res.body.find((furniture: { name: string; }) => furniture.name === 'testFurnitureFOR TRANSACTION');
		Promise.resolve(furniture);
		chaiExpect(furniture.currentStock).to.equal(5);
	});
});

describe('DELETE /transactions', () => {
	it('Should successfully delete a transaction by id', async () => {
		await request(app).delete(`/transactions/${TransactionDummy1}`).expect(200);		
		await request(app).get(`/furniture/${TransactionDummy1}`).expect(404);
	});

	it('After the delete, the stock of the furniture should be 6', async () => {
		const res = await request(app).get('/furniture');
		const furniture = await res.body.find((furniture: { name: string; }) => furniture.name === 'testFurnitureFOR TRANSACTION');
		Promise.resolve(furniture);
		chaiExpect(furniture.currentStock).to.equal(6);
	});

	it('Should successfully delete a transaction by id', async () => {
		await request(app).delete(`/transactions/${TransactionDummy2}`).expect(200);
	});

	it('After the delete, the stock of the furniture should be 5', async () => {
		const res = await request(app).get('/furniture');
		const furniture = await res.body.find((furniture: { name: string; }) => furniture.name === 'testFurnitureFOR TRANSACTION');
		Promise.resolve(furniture);
		chaiExpect(furniture.currentStock).to.equal(5);
	});
}); 