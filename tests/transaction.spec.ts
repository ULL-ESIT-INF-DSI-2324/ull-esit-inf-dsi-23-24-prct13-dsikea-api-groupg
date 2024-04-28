import 'mocha';
import { expect } from 'chai';
import { DatabaseProvider } from '../src/database/database_provider.js';
import { TransactionEntry } from '../src/classes/transaction_entry.js';

const db = DatabaseProvider.getInstance();

describe('Transaction database', () => {
    const transaction: TransactionEntry = new TransactionEntry("1", "12/3/2000", "Compra", "suplier1", ["test1", "test2"], 5);
    
    it('when using the manager when i select add it should add to the database', () => {
        const db_now = db.getTransactions();
        expect(db_now).to.not.include(transaction);
        db.addTransaction(transaction)
        const db_then = db.getTransactions();
        expect(db_then).to.include(transaction);
    });
    it('when using the manager when i select remove it should remove from the database', () => {
        const db_now = db.getTransactions();
        expect(db_now).to.include(transaction);
        db.removeTransaction("1");
        const db_then = db.getTransactions();
        expect(db_then).to.not.include(transaction);
    });

});