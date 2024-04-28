import { DatabaseEntry } from "../database/database_entry.js";
import { DatabaseProvider } from "../database/database_provider.js";
import { ClientSupplier } from "../interfaces/client_supplier.js";
import * as Prompts from "../utils/prompts.js";

/**
 * Instancia de la base de datos.
 */
const db = DatabaseProvider.getInstance();

/**
 * Clase que representa una entrada de cliente en la base de datos.
 * Implementa la interfaz ClientSupplier.
 */
export class ClientEntry extends DatabaseEntry implements ClientSupplier {
	/**
	 * Contacto del cliente.
	 */
	contact: string;
	/**
	 * Dirección del cliente.
	 */
	address: string;

	/**
	 * Constructor de la clase ClientEntry.
	 * @param id - ID del cliente.
	 * @param name - Nombre del cliente.
	 * @param contact - Contacto del cliente.
	 * @param address - Dirección del cliente.
	 */
	public constructor(id: string, name: string, contact: string, address: string) {
		super(id, name);
		this.contact = contact;
		this.address = address;
	}

	/**
	 * Método para añadir un nuevo cliente a la base de datos.
	 * @returns Una promesa que se resuelve con el nuevo cliente añadido.
	 */
	public async add(): Promise<ClientSupplier> {
		const ClientsDetails: { 
			contact: string, 
			name: string, 
			address: string } = await Prompts.getClientSupplierAttributes();
		const array = new Uint32Array(36);
		crypto.getRandomValues(array);
		const id = array.join("");
		const newClient: ClientSupplier = {
			id: id.substring(2, 9),
			...ClientsDetails
		};
		db.addClient(newClient);
		console.log("Cliente añadido con éxito al sistema.");
		return newClient;
	}

	/**
	 * Método para obtener todos los clientes de la base de datos.
	 * @returns Un array con todos los clientes.
	 */
	public get(): ClientSupplier[] {
		return db.getClients()
	}

	/**
	 * Método para eliminar un cliente de la base de datos.
	 * @returns Una promesa que se resuelve cuando el cliente ha sido eliminado.
	 */
	public async remove(): Promise<void> {
		const ClientsList = db.getClients();
		const ClientsChoices = ClientsList.map((Clients: ClientSupplier) => ({
			name: Clients.name,
			value: Clients.id
		}));
		const selectedClients: { ClientsId: string } = await Prompts.selectClientToRemove(ClientsChoices);
		db.removeClient(selectedClients.ClientsId);
		console.log('Cliente eliminado con éxito!');
	}

	/**
	 * Método para buscar un cliente en la base de datos.
	 * @returns Una promesa que se resuelve cuando la búsqueda ha terminado.
	 */
	public async search(): Promise<void> {
		const attribute: { option: string } = await Prompts.selectClientSupplierAttributePrompt();
		if (attribute.option === "Volver") return;
		const query: { value: string } = await Prompts.queryPrompt();
		let ocurrences;
		switch (attribute.option) {
			case "Nombre":
				ocurrences = db.getClients().filter((client: ClientSupplier) => client.name.includes(query.value));
				break;
			case "Contacto":
				ocurrences = db.getClients().find((client: ClientSupplier) => client.contact.includes(query.value));
				break;
			case "Dirección":
				ocurrences = db.getClients().find((client: ClientSupplier) => client.address.includes(query.value));
				break;
		}
		if (ocurrences) console.table(ocurrences);
		else console.log("No se encontraron coincidencias");
	}
}
