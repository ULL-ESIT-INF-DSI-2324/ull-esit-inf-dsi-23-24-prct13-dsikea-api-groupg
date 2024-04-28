import { DatabaseEntry } from '../database/database_entry.js';
import { DatabaseProvider } from '../database/database_provider.js';
import { ClientSupplier } from '../interfaces/client_supplier.js';
import * as Prompts from "../utils/prompts.js";

/**
 * Instancia de la base de datos.
 */
const db = DatabaseProvider.getInstance();

/**
 * Clase que representa una entrada de proveedor en la base de datos.
 * Implementa la interfaz ClientSupplier.
 */
export class SupplierEntry extends DatabaseEntry implements ClientSupplier {
  /**
   * Contacto del proveedor.
   */
  contact: string;
  /**
   * Dirección del proveedor.
   */
  address: string;

  /**
   * Constructor de la clase SupplierEntry.
   * @param id - ID del proveedor.
   * @param name - Nombre del proveedor.
   * @param contact - Contacto del proveedor.
   * @param address - Dirección del proveedor.
   */
	public constructor(id: string, name: string, contact: string, address: string) {
		super(id, name);
		this.contact = contact;
		this.address = address;
	}

  /**
   * Método para añadir un nuevo proveedor a la base de datos.
   * @returns Una promesa que se resuelve con el nuevo proveedor añadido.
   */
	public async add(): Promise<ClientSupplier> {
		const supplierDetails: {
			contact: string;
			name: string;
			address: string;
		} = await Prompts.getClientSupplierAttributes();
		const array = new Uint32Array(36);
    crypto.getRandomValues(array);
    const id = array.join("");
		const newSupplier: ClientSupplier = {
			id: id.substring(2, 9),
			...supplierDetails
		};
		db.addSupplier(newSupplier);
		console.log("Nuevo proveedor añadido!");
		return newSupplier;
	}

  /**
   * Método para obtener todos los proveedores de la base de datos.
   * @returns Un array con todos los proveedores.
   */
	public get(): ClientSupplier[] {
		return db.getSuppliers();
	}

  /**
   * Método para eliminar un proveedor de la base de datos.
   * @returns Una promesa que se resuelve cuando el proveedor ha sido eliminado.
   */
	public async remove(): Promise<void> {
		const SupplierList: ClientSupplier[] = db.getSuppliers();
		const SupplierChoices: { name: string, value: string}[] = 
			SupplierList.map((Supplier: ClientSupplier) => ({
				name: Supplier.name,
				value: Supplier.id
			}));
		const selectedSupplier: {SupplierId: string} = await Prompts.selectSupplierToRemove(SupplierChoices);
		db.removeSupplier(selectedSupplier.SupplierId);
		console.log('Proveedor eliminado con éxito!');
	}

  /**
   * Método para buscar un proveedor en la base de datos.
   * @returns Una promesa que se resuelve cuando la búsqueda ha terminado.
   */
	public async search(): Promise<void> {
		const answer: {option: string} = await Prompts.selectClientSupplierAttributePrompt();
		if (answer.option === "Volver") return;
		const query: {value: string} = await Prompts.queryPrompt();
		let ocurrences: ClientSupplier[];
		switch (answer.option) {
			case "Nombre":
				ocurrences = db.getSuppliers().filter((supplier: ClientSupplier) => supplier.name.includes(query.value));
				break;
			case "Contacto":
				ocurrences = db.getSuppliers().filter((supplier: ClientSupplier) => supplier.contact.includes(query.value));
				break;
			case "Dirección":
				ocurrences = db.getSuppliers().filter((supplier: ClientSupplier) => supplier.address.includes(query.value));
				break;
		}
		if (ocurrences!) console.table(ocurrences);
		else console.log('No se encontraron coincidencias');
	}
}
