import { FurnitureEntry } from '../classes/furniture_entry.js';
import { TransactionEntry } from '../classes/transaction_entry.js';
import { ClientSupplier } from '../interfaces/client_supplier.js';

/**
 * Interfaz para la base de datos.
 */
export interface Database {
	/**
	 * Array de entradas de muebles.
	 */
	furniture: FurnitureEntry[];

	/**
	 * Array de proveedores.
	 */
	suppliers: ClientSupplier[];

	/**
	 * Array de clientes.
	 */
	clients: ClientSupplier[];

	/**
	 * Array de entradas de transacciones.
	 */
	transaction: TransactionEntry[];
}

