import request from 'supertest';
import app from '../src/app.js';
import 'mocha';

describe('POST /users', () => {
	it('Should successfully create a new user', async () => {
		await request(app).post('/customers').send({
			name: "Eduardo Segredo",
			contact: "esegredo",
			address: "esegredo@example.com",
			nif: "12345678A"
		}).expect(200);
	});
});