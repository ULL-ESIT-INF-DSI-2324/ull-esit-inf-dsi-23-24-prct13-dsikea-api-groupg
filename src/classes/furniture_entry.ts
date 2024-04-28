import { DatabaseEntry } from "../database/database_entry.js";
import { DatabaseProvider } from "../database/database_provider.js";
import { Furniture } from "../interfaces/furniture.js";
import * as Prompts from "../utils/prompts.js";

/**
 * Instancia de la base de datos.
 */
const db = DatabaseProvider.getInstance();

/**
 * Clase que representa una entrada de mueble en la base de datos.
 * Implementa la interfaz Furniture.
 */
export class FurnitureEntry extends DatabaseEntry implements Furniture {
	/**
	 * Descripción del mueble.
	 */
	description: string;
	/**
	 * Material del mueble.
	 */
	material: string;
	/**
	 * Tipo de mueble.
	 */
	type: string;
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
	currentStock: number = 0;

	/**
	 * Constructor de la clase FurnitureEntry.
	 * @param id - ID del mueble.
	 * @param name - Nombre del mueble.
	 * @param description - Descripción del mueble.
	 * @param material - Material del mueble.
	 * @param dimensions - Dimensiones del mueble.
	 * @param price - Precio del mueble.
	 * @param type - Tipo de mueble.
	 * @param currentStrock - Stock actual del mueble.
	 */
	public constructor(id: string, name: string, description: string, material: string, dimensions: string, price: number, type: string, currentStrock: number) {
		super(id, name);
		this.description = description;
		this.material = material;
		this.dimensions = dimensions;
		this.price = price;
		this.type = type;
		this.currentStock = currentStrock;
	}

	/**
	 * Método para añadir un nuevo mueble a la base de datos.
	 * @param promt1 - Opcional. Detalles del mueble a añadir.
	 * @returns Una promesa que se resuelve con el nuevo mueble añadido.
	 */
	public async add(): Promise<FurnitureEntry> {
		const furnitureDetails : { name: string, type: string, 
			description: string, material: string, 
			dimensions: string, price: number} = await Prompts.getFurnitureAttributes();

		const currentFurniture = (await db.getFurniture()).filter((furniture: Furniture) =>
		Object.keys(furnitureDetails).every((key: keyof Furniture) =>
			key !== "id" && key !== "currentStock" ? furniture[key] === furnitureDetails[key] : true
		));							
		if (currentFurniture.length > 0) {
			db.updateFurniture(currentFurniture[0].id, currentFurniture[0].currentStock + 1 );
			return currentFurniture[0];
		}
    const array = new Uint32Array(36);
    crypto.getRandomValues(array);
    const id = array.join("");
		const newFurniture: FurnitureEntry = new FurnitureEntry(
			id.substring(2, 9),
			furnitureDetails.name,
			furnitureDetails.description,
			furnitureDetails.material,
			furnitureDetails.dimensions,
			furnitureDetails.price,
			furnitureDetails.type,
			1
		);
		db.addFurniture(newFurniture);
		console.log('Mueble añadido con éxito!');
		return newFurniture;
	}

	/**
	 * Método para obtener todos los muebles de la base de datos.
	 * @returns Un array con todos los muebles.
	 */
	public get(): FurnitureEntry[] {
		return db.getFurniture();
	}

	/**
	 * Método para eliminar un mueble de la base de datos.
	 * @returns Una promesa que se resuelve cuando el mueble ha sido eliminado.
	 */
	public async remove(id?: string): Promise<void> {
		const furnitureList: FurnitureEntry[] = db.getFurniture();
		let selected: { furnitureId: string };
		if (!id) {
			const furnitureChoices: {	name: string, value: string }[] = 
			furnitureList.map((furniture: Furniture) => ({
				name: furniture.name,
				value: furniture.id
			}));
			selected = await Prompts.selectFurnitureToRemove(furnitureChoices);
		} else {
			selected = { furnitureId: id };
		}
		const furniture: FurnitureEntry[] = furnitureList.filter((furniture: Furniture) => furniture.id === selected.furnitureId);
		if (furniture.length > 0 && furniture[0].currentStock > 1) {
			db.updateFurniture(selected.furnitureId, furniture[0].currentStock - 1);
			return;
		}
		db.removeFurniture(selected.furnitureId);
		console.log('Mueble eliminado con éxito!');
	}

	/**
	 * Método para buscar un mueble en la base de datos.
	 * @returns Una promesa que se resuelve cuando la búsqueda ha terminado.
	 */
	public async search(): Promise<void> {
		const answer: {option: string} = await Prompts.searchFurnitureByPrompt();
		if (answer.option === "Volver") return;
		const query: {value: string} = await Prompts.queryPrompt();
		let ocurrences: FurnitureEntry[];
		switch (answer.option) {
			case "Nombre":
				ocurrences = db.getFurniture().filter((furniture: Furniture) => furniture.name.includes(query.value));
				break;
			case "Tipo":
				ocurrences = db.getFurniture().filter((furniture: Furniture) => furniture.type === query.value);
				break;
			case "Descripción":
				ocurrences = db.getFurniture().filter((furniture: Furniture) => furniture.description.includes(query.value));
				break;
		}
		if (!ocurrences!) {
			console.log('No se encontraron coincidencias');
			return;
		}
		const howToOrder = await Prompts.howToOrderPrompt();
		if (howToOrder.option === "Ascendente") {
			ocurrences.sort((a: Furniture, b: Furniture) => a.name.localeCompare(b.name) || a.price - b.price);
		} else {
			ocurrences.sort((a: Furniture, b: Furniture) => b.name.localeCompare(a.name) || b.price - a.price);
		}
		console.table(ocurrences);
	}
}
