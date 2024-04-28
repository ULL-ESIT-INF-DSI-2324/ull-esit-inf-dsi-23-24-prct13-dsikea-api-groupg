import { DatabaseProvider } from "../database/database_provider.js";
import { ClientEntry } from "./client_entry.js";
import { FurnitureEntry } from './furniture_entry.js';
import { SupplierEntry } from "./supplier_entry.js";
import { Stock } from "./stock.js";
import * as Prompts from "../utils/prompts.js";
import { TransactionEntry } from "./transaction_entry.js";

/**
 * Instancia de la base de datos.
 */
const db = DatabaseProvider.getInstance();

/**
 * Instancia de la clase Stock.
 */
const stock = Stock.getInstance();

/**
 * Clase que representa un gestor.
 */
export class Manager {
	/**
	 * Constructor privado para implementar el patrón Singleton.
	 */
	private constructor() {}

	/**
	 * Instancia única de la clase Manager.
	 */
	private static instance: Manager;

	/**
	 * Método para obtener la instancia única de la clase Manager.
	 * @returns La instancia única de la clase Manager.
	 */
	public static getInstance(): Manager {
		if (!Manager.instance) Manager.instance = new Manager();
		return Manager.instance;
	}
	
	/**
	 * Método para mostrar el menú principal y gestionar las acciones del usuario.
	 * @returns Una promesa que se resuelve cuando el usuario decide salir del menú principal.
	 */
	public async mainMenu(): Promise<void> {
		let keepGoing: boolean = true;
		while (keepGoing === true) {
			const answer: { option: string } = await Prompts.mainMenuPrompt();
			switch (answer.option) {
				case "Gestionar Transacciones":
					await this.manageTransactions();
          break;
				case "Buscar":
					await this.manageSearch();
					break;
				case "Gestionar Muebles":
					await this.manageFurniture();
					break;
				case "Gestionar Proveedores":
					await this.manageSuppliers();
					break;
				case "Gestionar Clientes":
					await this.manageClients();
					break;
				case "Añadir Compra":
					await stock.addPurchaseStock();
					break;
				case "Añadir Venta":
					await stock.addSaleStock();
					break;
				case "Añadir Devolución":
					await stock.addReturn();
					break;
				case "Salir":
				default:
					console.log("¡Hasta luego!");
					keepGoing = false;
					break;
			}
		}
	}
	
	/**
	 * Método para gestionar las acciones relacionadas con los muebles.
	 * @returns Una promesa que se resuelve cuando el usuario decide volver al menú principal.
	 */
	public async manageFurniture(): Promise<void> {
		const furnitureMenuAnswer: { option: string } = await Prompts.manageFurniturePrompt();
		switch (furnitureMenuAnswer.option) {
			case "Listar Muebles":
				console.log("Lista de Muebles:");
				console.table(db.getFurniture());
				break;
			case "Añadir Mueble":
				await FurnitureEntry.prototype.add()
				break;
			case "Eliminar Mueble":
				await FurnitureEntry.prototype.remove();
				break;
			case "Volver":
				return;
		}
	}
	
	/**
	 * Método para gestionar las acciones relacionadas con los proveedores.
	 * @returns Una promesa que se resuelve cuando el usuario decide volver al menú principal.
	 */
	public async manageSuppliers(): Promise<void> {
      const suppliersMenuAnswer: { option: string } = await Prompts.manageSuppliersPrompt();
      switch (suppliersMenuAnswer.option) {
			case "Listar Proveedores":
				console.log("Lista de proveedores:");
				console.table(db.getSuppliers());
				break;
			case "Añadir Proveedor":
				await SupplierEntry.prototype.add()
				break;
			case "Eliminar Proveedor":
				await SupplierEntry.prototype.remove();
				break;
			case "Volver":
				return;
		}
	}
	
	/**
	 * Método para gestionar las acciones relacionadas con los clientes.
	 * @returns Una promesa que se resuelve cuando el usuario decide volver al menú principal.
	 */
	public async manageClients(): Promise<void> {
    const clientsMenuAnswer: { option: string } = await Prompts.manageClientsPrompt();
    switch (clientsMenuAnswer.option) {
      case "Listar Clientes":
        console.log("Lista de clientes:");
        console.table(ClientEntry.prototype.get());
        break;
      case "Añadir Cliente":
        await ClientEntry.prototype.add();
        break;
      case "Eliminar Cliente":
        await ClientEntry.prototype.remove();
        break;
      case "Volver":
        return;
    }
	} 

  /**
   * Método para gestionar las acciones de búsqueda.
   * @returns Una promesa que se resuelve cuando el usuario decide volver al menú principal.
   */
  public async manageSearch(): Promise<void> {
    const answer: { option: string } = await Prompts.searchMenuPrompt();
    switch (answer.option) {
      case "Muebles":
        await FurnitureEntry.prototype.search();
        break;
      case "Proveedor":
        await SupplierEntry.prototype.search();
        break;
      case "Cliente":
        await ClientEntry.prototype.search();
        break;
			case "Transacciones":
				await TransactionEntry.prototype.search();
				break;
      case "Volver":
        return;
    }
	} 

  /**
   * Método para gestionar las acciones relacionadas con las transacciones.
   * @returns Una promesa que se resuelve cuando el usuario decide volver al menú principal.
   */
  public async manageTransactions(): Promise<void> {
    const answer: { option: string } = await Prompts.manageTransactionsPrompt();
    switch (answer.option) {
      case "Listar Transacciones":
        await stock.showTransactions();
        break;
      case "Listar Stock":
        await stock.showStock();
        break;
      case "Añadir Transacción":
        await stock.addTransaction();
        break;
      case "Eliminar Transacción":
        await stock.removeTransaction();
        break;
      case "Volver":
        return;
    }
  }
}
