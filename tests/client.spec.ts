import 'mocha';
import { expect } from 'chai';
import { DatabaseProvider } from '../src/database/database_provider.js';
import { ClientEntry } from '../src/classes/client_entry.js';

const db = DatabaseProvider.getInstance();

describe('Clients database', () => {

    const client: ClientEntry = new ClientEntry('1', 'name1', 'contact1', 'adress1');
    
    it('Pueden añadirse clientes a la base de datos', () => {
        const db_now = db.getClients();
        expect(db_now).to.not.include(client);
        db.addClient(client)
        const db_then = db.getClients();
        expect(db_then).to.include(client);
    });
    it('Pueden eliminarse clientes de la base de datos', () => {
        const db_now = db.getClients();
        expect(db_now).to.include(client);
        db.removeClient("1");
        const db_then = db.getClients();
        expect(db_then).to.not.include(client);
    });
});
describe('Clients class ', () => {
    it(' Probar el metodo get de clents entry', () => {
        const client: ClientEntry = new ClientEntry('1', 'name1', 'contact1', 'adress1');
        const db_now = db.getClients();
        const db_now2 = client.get();
        expect(db_now).to.deep.equal(db_now2);
    });
    it(' Probar el metodo get de clents entry', () => {
        const client: ClientEntry = new ClientEntry('2', 'name2', 'contact2', 'adress2');
        const db_now = db.getClients();
        const db_now2 = client.get();
        expect(db_now).to.deep.equal(db_now2);
    });
    it(' Probar el metodo get de clents entry', () => {
        const client: ClientEntry = new ClientEntry('3', 'name3', 'contact3', 'adress3');
        const db_now = db.getClients();
        const db_now2 = client.get();
        expect(db_now).to.deep.equal(db_now2);
    });
    it(' Probar el metodo get de clents entry', () => {
        const client: ClientEntry = new ClientEntry('4', 'name4', 'contact4', 'adress4');
        const db_now = db.getClients();
        const db_now2 = client.get();
        expect(db_now).to.deep.equal(db_now2);
    });
    
});