import { expect } from 'chai';
import 'mocha';
import { DatabaseProvider } from '../src/database/database_provider.js';
import { Stock } from '../src/classes/stock.js';
const db = DatabaseProvider.getInstance();

describe('clase stock', () => {
    it ('debería mostrar el stock actual', () => {
        const stock = db.getFurniture();
        expect(Stock.prototype.showStock()).to.equal(stock);
    });
    it ('debería mostrar las transacciones', () => {
        const transactions = db.getTransactions();
        expect(Stock.prototype.showTransactions()).to.equal(transactions);
    });

    it ('debería comprobar el stock de un mueble', () => {
        const furnitureString = "test2";
        const stockAmount = 10;
        expect(Stock.prototype.checkStock(furnitureString, stockAmount)).to.equal(true);
    });
    it ('debería comprobar el stock de un mueble', () => {
        const furnitureString = "test2";
        const stockAmount = 299;
        expect(Stock.prototype.checkStock(furnitureString, stockAmount)).to.equal(false);
    });
    it ('debería comprobar el stock de un mueble', () => {
        const furnitureString = "test2";
        const stockAmount = 300;
        expect(Stock.prototype.checkStock(furnitureString, stockAmount)).to.equal(false);
    });
});