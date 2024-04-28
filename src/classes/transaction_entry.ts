import { DatabaseEntry } from "../database/database_entry.js";
import { Transaction } from '../interfaces/transaction.js';
import { DatabaseProvider } from "../database/database_provider.js";
import * as Prompts from "../utils/prompts.js";


function ddmmyyyyToMmddyyyy(date: string): string {
  const [day, month, year] = date.split("/");
  return `${month}/${day}/${year}`;
}

/**
 * Instancia de la base de datos.
 */
const db = DatabaseProvider.getInstance();

/**
 * Clase que representa una entrada de transacción en la base de datos.
 * Implementa la interfaz Transaction.
 */
export class TransactionEntry extends DatabaseEntry implements Transaction {
  /**
   * Fecha de la transacción.
   */
  date: string;
  /**
   * Cliente o proveedor involucrado en la transacción.
   */
  clientSupplier: string;
  /**
   * Muebles involucrados en la transacción.
   */
  furniture: string[];
  /**
   * Total de la transacción.
   */
  total: number;
  /**
   * Tipo de transacción.
   */
  type: string;

  /**
   * Constructor de la clase TransactionEntry.
   * @param id - ID de la transacción.
   * @param date - Fecha de la transacción.
   * @param type - Tipo de transacción.
   * @param clientSupplier - Cliente o proveedor involucrado en la transacción.
   * @param furniture - Muebles involucrados en la transacción.
   * @param total - Total de la transacción.
   */
  constructor(id: string, date: string, type: string, clientSupplier: string, furniture: string[], total: number) {
    super(id, type);
    this.date = date;
    this.clientSupplier = clientSupplier;
    this.furniture = furniture;
    this.total = total;
    this.type = type;
  }

  /**
   * Método para añadir una nueva transacción a la base de datos.
   * @param date - Fecha de la transacción.
   * @param type - Tipo de transacción.
   * @param clientSupplier - Cliente o proveedor involucrado en la transacción.
   * @param furniture - Muebles involucrados en la transacción.
   * @param total - Total de la transacción.
   * @returns Una promesa que se resuelve cuando la transacción ha sido añadida.
   */
  async add(date?: string, type?: string, clientSupplier?: string, furniture?: string[], total?: number): Promise<void> {		
    if (date && type && clientSupplier && furniture && total) {
      const array = new Uint32Array(36);
      crypto.getRandomValues(array);
      const id = array.join("");
      const newTransaction: TransactionEntry = new TransactionEntry (
        id.substring(2, 9), date,
        type, clientSupplier, furniture, total
      );
      db.addTransaction(newTransaction);
      console.log("Nueva transacción añadida al sistema.");
      return;
    }
    const attributes = await Prompts.getTransactionAttributesPrompt();
    const maybe_client = db.getClients().find((client) => client.name === attributes.clientSupplier);
    const maybe_supplier = db.getSuppliers().find((supplier) => supplier.name === attributes.clientSupplier);
    if (attributes.type == "Compra" && maybe_supplier) clientSupplier = maybe_supplier.name;
    else if (attributes.type == "Venta" && maybe_client) clientSupplier = maybe_client.name;
    const array = new Uint32Array(36);
    crypto.getRandomValues(array);
    const id = array.join("");
    const newTransaction: TransactionEntry = new TransactionEntry (
      id.substring(2, 9), attributes.date,
      attributes.type, clientSupplier!, 
      attributes.furniture, attributes.total 
    );
    db.addTransaction(newTransaction);
    console.log("Nueva transacción añadida al sistema.");
  }

  /**
   * Método para obtener todas las transacciones de la base de datos.
   * @returns Un array con todas las transacciones.
   */
  get(): Transaction[] {
    return db.getTransactions();
  }

  /**
   * Método para eliminar una transacción de la base de datos.
   * @returns Una promesa que se resuelve cuando la transacción ha sido eliminada.
   */
  async remove(): Promise<void> {
    const TransactionsList: Transaction[] = db.getTransactions();
    const transactionsChoices: { value: string }[] = TransactionsList.map((Transactions: Transaction) => ({
      value: Transactions.id
    }));
    const selected: {TransactionsId: string} = await Prompts.selectTransactionToRemove(transactionsChoices);
    if (selected.TransactionsId === "Volver") return;
    db.removeTransaction(selected.TransactionsId);
    console.log('Transacción eliminada del sistema.');
  }

  /**
   * Método para buscar una transacción en la base de datos.
   * @returns Una promesa que se resuelve cuando la búsqueda ha terminado.
   */
  async search(): Promise<void> {
    const answer: {option: string} = await Prompts.searchTransactionsByPrompt();
    if (answer.option === "Volver") return;
    let query, query2: { value: string } | undefined;
    if (answer.option === "Fecha") {
      query = await Prompts.insertStartDatePrompt();
      query2 = await Prompts.insertEndDatePrompt();
    } else if (answer.option === "Tipo") {
      query = await Prompts.selectKindOfTransactionPrompt();
      if (query.value === "Facturación llevada a cabo por ventas a clientes") query.value = "Venta";
      else query.value = "Compra";
    } else query = await Prompts.queryPrompt();
    let date1: string, date2: string;
    if (answer.option === "Fecha") {
      date1 = ddmmyyyyToMmddyyyy(query.value);
      date2 = ddmmyyyyToMmddyyyy(query2!.value);
    }
    let ocurrences: Transaction[] | undefined;
    switch (answer.option) {
      case "Fecha":
        ocurrences = db.getTransactions()
            .filter((t) => Date.parse(ddmmyyyyToMmddyyyy(t.date)) >= Date.parse(date1) 
                                && Date.parse(ddmmyyyyToMmddyyyy(t.date)) <= Date.parse(date2));
        break;
      case "Tipo":
        ocurrences = db.getTransactions().filter((transaction) => transaction.name.includes(query.value));
        break;
      case "Proveedor/Cliente":
        ocurrences = db.getTransactions().filter((transaction) => transaction.clientSupplier.includes(query.value));
        break;
    }
    if (ocurrences) console.table(ocurrences);
    else console.log("No se encontraron coincidencias");
  }
}
