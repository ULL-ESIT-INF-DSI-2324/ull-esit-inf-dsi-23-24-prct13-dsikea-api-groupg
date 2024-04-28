import { expect } from 'chai';
import 'mocha';
import { Manager } from '../src/classes/manager.js';
import { DatabaseProvider } from '../src/database/database_provider.js';
const manager = Manager.getInstance();
const db = DatabaseProvider.getInstance();

describe('Instances database', () => {

    
    it('should be able to get the instance of the manager', () => {
        expect(manager).to.be.an.instanceof(Manager);
    });
    it('should be able to get the instance of the database provider', () => {
        expect(db).to.be.an.instanceof(DatabaseProvider);
    });

});