/**
 * Clase abstracta que representa una entrada en la base de datos.
 */
export abstract class DatabaseEntry {
	/**
	 * ID de la entrada en la base de datos.
	 */
	id: string;
	/**
	 * Nombre de la entrada en la base de datos.
	 */
	name: string;

	/**
	 * Constructor de la clase DatabaseEntry.
	 * @param id - ID de la entrada en la base de datos.
	 * @param name - Nombre de la entrada en la base de datos.
	 */
	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}

	/**
	 * Método abstracto para añadir una entrada a la base de datos.
	 * Debe ser implementado por las clases que hereden de DatabaseEntry.
	 */
	abstract add(): void;

	/**
	 * Método abstracto para obtener una entrada de la base de datos.
	 * Debe ser implementado por las clases que hereden de DatabaseEntry.
	 */
	abstract get(): void;

	/**
	 * Método abstracto para eliminar una entrada de la base de datos.
	 * Debe ser implementado por las clases que hereden de DatabaseEntry.
	 */
	abstract remove(): void;

	/**
	 * Método abstracto para buscar una entrada en la base de datos.
	 * Debe ser implementado por las clases que hereden de DatabaseEntry.
	 */
	abstract search(): void;
}
