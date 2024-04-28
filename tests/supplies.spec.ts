
import { expect } from 'chai';
import 'mocha';
import { DatabaseProvider } from '../src/database/database_provider.js';
import { SupplierEntry } from '../src/classes/supplier_entry.js';

const db = DatabaseProvider.getInstance();

describe('Supplier database', () => {

    const supplier: SupplierEntry = new SupplierEntry('1', 'name1', 'contact1', 'adress1');
    const supplier2: SupplierEntry = new SupplierEntry('2', 'name2', 'contact2', 'adress2');
    const supplier3: SupplierEntry = new SupplierEntry('3', 'name3', 'contact3', 'adress3');
    
    it('when using the manager when i select add it should add to the database', () => {
        const db_now = db.getSuppliers();
        expect(db_now).to.not.include(supplier);
        db.addSupplier(supplier)
        const db_then = db.getSuppliers();
        expect(db_then).to.include(supplier);
    });
    it('when using the manager when i select remove it should remove from the database', () => {
        const db_now = db.getSuppliers();
        expect(db_now).to.include(supplier);
        db.removeSupplier("1");
        const db_then = db.getSuppliers();
        expect(db_then).to.not.include(supplier);
    });
    it ('debería comprobar el metodo get de cliententry', () => {
        const db_now = db.getSuppliers();
        const suppliers = SupplierEntry.prototype.get();
        expect(db_now).to.equal(suppliers);
    });
    it('when using the manager when i select add it should add to the database', () => {
        const db_now = db.getSuppliers();
        expect(db_now).to.not.include(supplier2);
        db.addSupplier(supplier2)
        const db_then = db.getSuppliers();
        expect(db_then).to.include(supplier2);
    });
    it('when using the manager when i select remove it should remove from the database', () => {
        const db_now = db.getSuppliers();
        expect(db_now).to.include(supplier2);
        db.removeSupplier("2");
        const db_then = db.getSuppliers();
        expect(db_then).to.not.include(supplier2);
    });
    it ('debería comprobar el metodo get de cliententry', () => {
        const db_now = db.getSuppliers();
        const suppliers = SupplierEntry.prototype.get();
        expect(db_now).to.equal(suppliers);
    });
    it('when using the manager when i select add it should add to the database', () => {
        const db_now = db.getSuppliers();
        expect(db_now).to.not.include(supplier3);
        db.addSupplier(supplier3)
        const db_then = db.getSuppliers();
        expect(db_then).to.include(supplier3);
    });
    it('when using the manager when i select remove it should remove from the database', () => {
        const db_now = db.getSuppliers();
        expect(db_now).to.include(supplier3);
        db.removeSupplier("3");
        const db_then = db.getSuppliers();
        expect(db_then).to.not.include(supplier3);
    });
    it ('debería comprobar el metodo get de cliententry', () => {
        const db_now = db.getSuppliers();
        const suppliers = SupplierEntry.prototype.get();
        expect(db_now).to.equal(suppliers);
    });

});