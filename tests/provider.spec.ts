import request from 'supertest';
import app from '../src/app.js';
import 'mocha';
import { expect as chaiExpect } from 'chai';

// pruebas para /providers

describe('POST /providers', () => {
	it('Should successfully create a new provider', async () => {
		await request(app).post('/providers').send({
			name: "testProvider",
			contact: "testContactName",
			address: "testAddress",
			cif: "example"
		}).expect(200);
	});
});

// delete provider by id
describe('DELETE /providers', () => {
	it('Should successfully delete a provider by id', async () => {
		const res = await request(app).get('/providers');
		const provider = res.body.find((provider: { name: string; }) => provider.name === 'testProvider');
		await request(app).delete(`/providers/${provider._id}`).expect(200);
	});
});
describe('GET /providers', () => {
	it('Should successfully get all providers', async () => {
		await request(app).get('/providers').expect(200);
	});
});
describe('POST /providers', () => {
	it('Should successfully create a new provider', async () => {
		await request(app).post('/providers').send({
			name: "testProvider2",
			contact: "testContactName",
			address: "testAddress",
			cif: "example"
		}).expect(200);
	});
});
describe('PATCH /providers', () => {
	it('Should successfully update a provider by query', async () => {
		await request(app).patch('/providers/update?name=testProvider2').send({
			name: "testProvider2",
			contact: "testContactName",
			address: "testAddress2",
			cif: "example"
		}).expect(200);
	});
	it('Should check if the provider was updated', async () => {
		const res = await request(app).get('/providers');
		const provider = res.body.find((provider: { name: string; }) => provider.name === 'testProvider2');
		chaiExpect(provider.address).to.equal('testAddress2');
	});
});
describe('DELETE /providers', () => {
	it('Should successfully delete a provider by query', async () => {
		await request(app).delete('/providers/delete?name=testProvider2').expect(200);
	});
});
describe('GET /providers', () => {
	it('Should successfully get all providers', async () => {
		await request(app).get('/providers').expect(200);
	});
});
describe('POST /providers', () => {
	it('Should successfully create a new provider', async () => {
		await request(app).post('/providers').send({
			name: "testProvider3",
			contact: "testContactName",
			address: "testAddress",
			cif: "example"
		}).expect(200);
	});
});
describe('DELETE /providers', () => {
	it('Should successfully delete a provider by query', async () => {
		await request(app).delete('/providers/delete?name=testProvider3').expect(200);
	});
});