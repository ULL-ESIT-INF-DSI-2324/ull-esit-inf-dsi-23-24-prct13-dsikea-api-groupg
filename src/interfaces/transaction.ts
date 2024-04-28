/**
 * Interfaz para una Transacción.
 */
export interface Transaction {
	/**
	 * Identificador único de la transacción.
	 */
	id: string;

	/**
	 * Tipo de transacción.
	 */
	type: string;

	/**
	 * Fecha de la transacción.
	 */
	date: string;

	/**
	 * Nombre asociado a la transacción.
	 */
	name: string;

	/**
	 * Cliente o proveedor asociado a la transacción.
	 */
	clientSupplier: string;

	/**
	 * Array de muebles asociados a la transacción.
	 */
	furniture: string[];

	/**
	 * Total de la transacción.
	 */
	total: number;
}
