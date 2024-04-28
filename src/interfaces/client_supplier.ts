/**
 * Interfaz para un Cliente o Proveedor.
 */
export interface ClientSupplier {
	/**
	 * Identificador único del cliente o proveedor.
	 */
	id: string;

	/**
	 * Nombre del cliente o proveedor.
	 */
	name: string;

	/**
	 * Información de contacto del cliente o proveedor.
	 */
	contact: string;

	/**
	 * Dirección del cliente o proveedor.
	 */
	address: string;
}
