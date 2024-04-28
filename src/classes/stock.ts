import { DatabaseProvider } from "../database/database_provider.js";
import { Furniture } from "../interfaces/furniture.js";
import { FurnitureEntry } from "./furniture_entry.js";
import { TransactionEntry } from "./transaction_entry.js";
import * as Prompts from "../utils/prompts.js";
import { SupplierEntry } from "./supplier_entry.js";
import { ClientEntry } from "./client_entry.js";

/**
 * Instancia de la base de datos.
 */
const db = DatabaseProvider.getInstance();

/**
 * Clase que representa un stock.
 */
export class Stock {
  /**
   * Constructor privado para implementar el patrón Singleton.
   */
  private constructor() {}

  /**
   * Instancia única de la clase Stock.
   */
  private static instance: Stock;

  /**
   * Método para obtener la instancia única de la clase Stock.
   * @returns La instancia única de la clase Stock.
   */
  public static getInstance(): Stock {
    if (!Stock.instance) Stock.instance = new Stock();
    return Stock.instance;
  }
  
  /**
   * Método para mostrar el stock actual.
   */
  public showStock(): FurnitureEntry[] {
    const stock = db.getFurniture();
    console.log("Stock actual:");
    console.table(stock);
    return stock;
  }
  
  /**
   * Método para mostrar las transacciones.
   */
  public showTransactions(): TransactionEntry[] {
    const transactions = db.getTransactions();
    console.log("Transacciones:");
    console.table(transactions);
    return transactions;
  }

  /**
   * Método para comprobar el stock de un mueble.
   * @param furnitureString - Nombre del mueble.
   * @param stockAmount - Cantidad de stock a comprobar.
   * @returns Verdadero si hay suficiente stock, falso en caso contrario.
   */
  public checkStock(furnitureString: string, stockAmount: number): boolean {
    const furniture: Furniture = db.getFurniture().find((f) => f.name === furnitureString)!
    return furniture.currentStock >= stockAmount;
  }

  /**
   * Método para añadir una transacción.
   * @returns Una promesa que se resuelve cuando la transacción ha sido añadida.
   */
  public async addTransaction(): Promise<void> {
    await TransactionEntry.prototype.add();
  }
  
  /**
   * Método para eliminar una transacción.
   * @returns Una promesa que se resuelve cuando la transacción ha sido eliminada.
   */
  public async removeTransaction(): Promise<void> {
    await TransactionEntry.prototype.remove();
  }

  /**
   * Método para añadir stock de compra.
   * @returns Una promesa que se resuelve cuando el stock de compra ha sido añadido.
   */
  public async addPurchaseStock(): Promise<void> {
    const supplierChoices: string[] = db.getSuppliers().map((supplier) => supplier.name);
		let answer: { option: string } = await Prompts.selectSupplier(supplierChoices);
		if (answer.option === "Volver") return;
		let supplier = db.getSuppliers().find((supplier) => supplier.name === answer.option);
		if (answer.option === "Nuevo Proveedor") supplier = await SupplierEntry.prototype.add();

		answer = await Prompts.chooseKindOfFurnitureToBuy();
		let furniture: string[];
		let total_price: number = 0;
		if (answer.option === "Volver") return;
		if (answer.option === "Mueble actualmente en stock")
			furniture = (await Prompts.selectAvaliableFurniture()).furniture;
		else furniture = [(await FurnitureEntry.prototype.add()).name]
    if (furniture.length === 0) return;
		for (let i = 0; i < furniture.length; i++) {
			const amount: { option: number } = await Prompts.insertQuantityOfFurniture(furniture[i]);
			total_price += db.getFurniture().find((f) => f.name === furniture[i])!.price * (amount.option - 1);
			db.getFurniture().forEach((f) => {
				if (furniture[i].includes(f.name)) 
					db.updateFurniture(f.id, f.currentStock + amount.option - 1);
			});
			furniture[i] = amount.option + " x " + furniture[i];
		}
		const date = new Date().toLocaleDateString();
		TransactionEntry.prototype.add(date, "Compra", supplier?.name, furniture, total_price);
  }

  /**
   * Método para añadir stock de venta.
   * @returns Una promesa que se resuelve cuando el stock de venta ha sido añadido.
   */
  public async addSaleStock(): Promise<void> {
		const clientChoices = db.getClients().map((client) => client.name);
		const answer: { option: string } = await Prompts.selectClient(clientChoices);
		let client = db.getClients().find((client) => client.name === answer.option);
		if (answer.option === "Volver") return;
		if (answer.option === "Nuevo Cliente") client = await ClientEntry.prototype.add();

		let total_price: number = 0;
		const furniture: string[] = (await Prompts.selectFurnitureToSell()).furniture;
    if (furniture.length === 0) return;
		for (let i = 0; i < furniture.length; i++) {
			const amount = await Prompts.insertQuantityOfFurniture(furniture[i]);
			if (!this.checkStock(furniture[i], amount.option)) {
				console.log("No hay suficiente stock");
				return;
			}
			total_price += db.getFurniture().find((f) => f.name === furniture[i])!.price * amount.option;
			db.getFurniture().forEach((f) => {
				if (furniture[i].includes(f.name)) 
					db.updateFurniture(f.id, f.currentStock - amount.option);
			});
			furniture[i] = amount.option + " x " + furniture[i];
		}
		const date = new Date().toLocaleDateString();
		TransactionEntry.prototype.add(date, "Venta", client?.name, furniture, total_price);
  }

  /**
   * Método para añadir una devolución.
   * @returns Una promesa que se resuelve cuando la devolución ha sido añadida.
   */
  public async addReturn(): Promise<void> {
    // Si no hay transacciones en la base de datos, se informa al usuario y termina.
    if (db.getTransactions().length === 0) {
      console.log("No hay transacciones en la base de datos.");
      return;
    }
    // Se solicita al usuario que seleccione la transacción que desea devolver.
    const selected: {value: string} = await Prompts.selectReturnedTransactionPrompt();
    const id: string = selected.value.substring(selected.value.length - 7);
    // Se busca la transacción en la base de datos.
    const transaction: TransactionEntry = db.getTransactions().find((t) => t.id === id)!;
    let clientSupplier: string = "";
    // Si la transacción no existe, se termina el método.
    if (!transaction) return;
    // Se extraen los muebles de la transacción.
    const furniture: string[] = transaction.furniture;
    // Se extraen el nombre y la cantidad de cada mueble.
    const nameAndAmount: { name: string, amount: number }[]= furniture.map(f => {
      const [amount, name] = f.split(" x ");
      return { name, amount: parseInt(amount) };
    });
    // Si la transacción es una compra, se busca el proveedor en la base de datos.
    if (transaction.type === "Compra") {
      clientSupplier = db.getSuppliers().find((s) => s.name === transaction.clientSupplier)!.name;
    } 
    // Si la transacción es una venta, se busca el cliente en la base de datos.
    else if (transaction?.type === "Venta") {
      clientSupplier = db.getClients().find((c) => c.name === transaction.clientSupplier)!.name;
    }
    // Para cada mueble, se actualiza su cantidad en la base de datos.
    nameAndAmount.forEach((f) => {
      db.getFurniture().forEach((furniture) => {
        if (f.name === furniture.name) {
          const newAmount: number = furniture.currentStock + (transaction.type === "Compra" ? -f.amount : f.amount)
          db.updateFurniture(furniture.id, newAmount);
        }
      });
    });
    // Se añade la devolución a la base de datos.
    const date: string = new Date().toLocaleDateString();
    TransactionEntry.prototype.add(date, "Devolución", clientSupplier, transaction.furniture, transaction.total);
  }
}
