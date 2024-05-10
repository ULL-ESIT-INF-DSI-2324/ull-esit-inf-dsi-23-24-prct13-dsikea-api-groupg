import request from 'supertest';
import app from '../src/app.js';
import 'mocha';
import { expect as chaiExpect } from 'chai';


//pruebas para /furniture

describe('POST /furniture', () => {
	it('Should successfully create a new furniture', async () => {
		await request(app).post('/furniture').send({
			name: "testFurniture",
			type: "testType",
			description: "testDescription",
			material: "madera",
			dimensions: "40x40x40",
			price: 50,
			currentStock: 10,
			color: "marrón"
		}).expect(200);
	});
});

describe('GET /furniture with querry', () => {
	it('Should successfully get a furniture by query', async () => {
		await request(app).get('/furniture?name=testFurniture').expect(200);
	});
});

describe('PATCH /furniture', () => {
	it('Should successfully update a furniture by query', async () => {
		await request(app).patch('/furniture/update?name=testFurniture').send({
			name: "testFurniture",
			type: "testType",
			description: "testDescription2",
			material: "madera",
			dimensions: "40x40x40",
			price: 50,
			currentStock: 10,
			color: "marrón"
		}).expect(200);
	});
	it('Should check if the furniture was updated', async () => {
		const res = await request(app).get('/furniture');
		const furniture = res.body.find((furniture: { name: string; }) => furniture.name === 'testFurniture');
		chaiExpect(furniture.description).to.equal('testDescription2');
	});
});


describe('DELETE /furniture', () => {
	it('Should successfully delete a furniture by query', async () => {
		await request(app).delete('/furniture/delete?name=testFurniture').expect(200);
	});
});

describe('POST /furniture', () => {
	it('Should successfully create a new furniture', async () => {
		await request(app).post('/furniture').send({
			name: "testFurniture",
			type: "testType",
			description: "testDescription",
			material: "madera",
			dimensions: "40x40x40",
			price: 50,
			currentStock: 10,
			color: "marrón"
		}).expect(200);
	});
	// get the furniture id of the created furniture
	let furnitureId: any;
	it ('Should get the id of the created furniture', async () => {
		const res = await request(app).get('/furniture');
		furnitureId = res.body.find((furniture: { name: string; }) => furniture.name === 'testFurniture')._id;
	});
	
	it('Should successfully delete a furniture by id', async () => {
		await request(app).delete(`/furniture/${furnitureId}`).expect(200);
	});
});

describe('GET /furniture', () => {
	it('Should successfully get all furniture', async () => {
		await request(app).get('/furniture').expect(200);
	});
	it('Should check if the furniture was deleted', async () => {
		const res = await request(app).get('/furniture');
		const furniture = res.body.find((furniture: { name: string; }) => furniture.name === 'testFurniture');
		chaiExpect(furniture).to.equal(undefined);
	});
});