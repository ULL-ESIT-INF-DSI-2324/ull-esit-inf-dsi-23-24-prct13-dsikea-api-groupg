/**
 * Interfaz para un Mueble.
 */
export interface Furniture {
	/**
	 * Identificador único del mueble.
	 */
	id: string;

	/**
	 * Nombre del mueble.
	 */
	name: string;

	/**
	 * Tipo de mueble.
	 */
	type: string;

	/**
	 * Descripción del mueble.
	 */
	description: string;

	/**
	 * Material del mueble.
	 */
	material: string;

	/**
	 * Dimensiones del mueble.
	 */
	dimensions: string;

	/**
	 * Precio del mueble.
	 */
	price: number;

	/**
	 * Stock actual del mueble.
	 */
	currentStock: number;
}
