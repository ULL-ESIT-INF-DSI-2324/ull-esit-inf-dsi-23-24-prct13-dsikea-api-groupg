
import { expect } from 'chai';
import 'mocha';
import { DatabaseProvider } from '../src/database/database_provider.js';
import { FurnitureEntry } from '../src/classes/furniture_entry.js';

const db = DatabaseProvider.getInstance();

describe('Furniture database', () => {

    const furniture: FurnitureEntry = new FurnitureEntry('1', 'test1', 'test1', 'Madera', '50x50x50', 100, 'Silla', 10);
    const furniture2: FurnitureEntry = new FurnitureEntry('2', 'test2', 'test2', 'Madera', '50x50x50', 100, 'Silla', 10);
    const furniture3: FurnitureEntry = new FurnitureEntry('3', 'test3', 'test3', 'Madera', '50x50x50', 100, 'Silla', 10);

    it('Pueden instanciarse muebles correctamente', () => {
        expect(furniture).to.be.an.instanceof(FurnitureEntry);
    });
    it('Pueden obtenerse los muebles de la base de datos mediante el método get()', () => {
        const db_now = db.getFurniture();
        expect(db_now).to.be.an('array');
        const furnitures : FurnitureEntry[] = furniture.get();
        expect(db_now).to.deep.equal(furnitures);
    });
    it('Pueden añadirse muebles a la base de datos', () => {
        db.removeFurniture("1");
        const db_now = db.getFurniture();
        expect(db_now).to.not.include(furniture);
        db.addFurniture(furniture)
        const db_then = db.getFurniture();
        expect(db_then).to.include(furniture);
    });
    it('Pueden eliminarse muebles de la base de datos', () => {
        const db_now = db.getFurniture();
        expect(db_now).to.include(furniture);
        db.removeFurniture("1");
        const db_then = db.getFurniture();
        expect(db_then).to.not.include(furniture);
    });
    it('Pueden actualizarse muebles de la base de datos', () => {
        db.addFurniture(furniture)
        const db_now = db.getFurniture();
        expect(db_now).to.include(furniture);
        furniture.name = "test2";
        db.updateFurniture("1",100);
        const db_then = db.getFurniture();
        expect(db_then).to.include(furniture);
    });
    it('Pueden obtenerse los muebles de la base de datos mediante el método get()', () => {
        const db_now = db.getFurniture();
        expect(db_now).to.be.an('array');
        const furnitures : FurnitureEntry[] = furniture.get();
        expect(db_now).to.deep.equal(furnitures);
    });
    it('Pueden añadirse muebles a la base de datos', () => {
        db.removeFurniture("2");
        const db_now = db.getFurniture();
        expect(db_now).to.not.include(furniture2);
        db.addFurniture(furniture2)
        const db_then = db.getFurniture();
        expect(db_then).to.include(furniture2);
    });
    it('Pueden eliminarse muebles de la base de datos', () => {
        const db_now = db.getFurniture();
        expect(db_now).to.include(furniture2);
        db.removeFurniture("2");
        const db_then = db.getFurniture();
        expect(db_then).to.not.include(furniture2);
    });
    it('Pueden actualizarse muebles de la base de datos', () => {
        db.addFurniture(furniture2)
        const db_now = db.getFurniture();
        expect(db_now).to.include(furniture2);
        furniture2.name = "test3";
        db.updateFurniture("2",100);
        const db_then = db.getFurniture();
        expect(db_then).to.include(furniture2);
    });
    it('Pueden obtenerse los muebles de la base de datos mediante el método get()', () => {
        const db_now = db.getFurniture();
        expect(db_now).to.be.an('array');
        const furnitures : FurnitureEntry[] = furniture.get();
        expect(db_now).to.deep.equal(furnitures);
    });
    it('Pueden añadirse muebles a la base de datos', () => {
        db.removeFurniture("3");
        const db_now = db.getFurniture();
        expect(db_now).to.not.include(furniture3);
        db.addFurniture(furniture3)
        const db_then = db.getFurniture();
        expect(db_then).to.include(furniture3);
    });
    it('Pueden eliminarse muebles de la base de datos', () => {
        const db_now = db.getFurniture();
        expect(db_now).to.include(furniture3);
        db.removeFurniture("3");
        const db_then = db.getFurniture();
        expect(db_then).to.not.include(furniture3);
    });
    it('Pueden actualizarse muebles de la base de datos', () => {
        db.addFurniture(furniture3)
        const db_now = db.getFurniture();
        expect(db_now).to.include(furniture3);
        furniture3.name = "test4";
        db.updateFurniture("3",100);
        const db_then = db.getFurniture();
        expect(db_then).to.include(furniture3);
    });
    

});