import inquirer from "inquirer";
import { DatabaseProvider } from "../database/database_provider.js";

/**
 * Instancia de la base de datos.
 */
const db = DatabaseProvider.getInstance();

/**
 * Muestra el prompt del menú principal y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function mainMenuPrompt(): Promise<{ option: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Selecciona una gestión:",
  choices: [
   "Añadir Compra",
   "Añadir Venta",
   "Añadir Devolución",
   "Gestionar Transacciones",
   "Buscar",
   "Gestionar Muebles",
   "Gestionar Proveedores",
   "Gestionar Clientes",
   "Salir",
  ],
 });
}

/**
 * Muestra el prompt del menú de gestión de muebles y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function manageFurniturePrompt(): Promise<{ option: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Selecciona una gestión de muebles:",
  choices: ["Listar Muebles", "Añadir Mueble", "Eliminar Mueble", "Volver"],
 });
}

/**
 * Muestra el prompt del menú de gestión de proveedores y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function manageSuppliersPrompt(): Promise<{ option: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Selecciona una gestión de proveedor:",
  choices: [
   "Listar Proveedores",
   "Añadir Proveedor",
   "Eliminar Proveedor",
   "Volver",
  ],
 });
}

/**
 * Muestra el prompt del menú de gestión de clientes y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function manageClientsPrompt(): Promise<{ option: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Selecciona una gestión de cliente:",
  choices: ["Listar Clientes", "Añadir Cliente", "Eliminar Cliente", "Volver"],
 });
}

/**
 * Muestra el prompt del menú de gestión de transacciones y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function manageTransactionsPrompt(): Promise<{ option: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Selecciona una gestión de transacciones:",
  choices: ["Listar Transacciones", "Eliminar Transacción", "Volver"],
 });
}

/**
 * Muestra el prompt del menú de búsqueda y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function searchMenuPrompt(): Promise<{ option: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Selecciona qué deseas buscar:",
  choices: ["Muebles", "Proveedor", "Cliente", "Transacciones", "Volver"],
 });
}

/**
 * Muestra un menú para seleccionar un proveedor y devuelve la opción seleccionada por el usuario.
 * @param {string[]} supplierChoices - Las opciones de proveedores disponibles.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function selectSupplier(
 supplierChoices: string[]
): Promise<{ option: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Selecciona el proveedor:",
  choices: supplierChoices.concat("Nuevo Proveedor", "Volver"),
 });
}

/**
 * Muestra un menú para elegir el tipo de mueble a comprar y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function chooseKindOfFurnitureToBuy(): Promise<{
 option: string;
}> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Deseas comprar:",
  choices: ["Mueble actualmente en stock", "Mueble nuevo", "Volver"],
 });
}

/**
 * Muestra un menú para seleccionar un mueble disponible y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ furniture: Array<string> }>} La opción seleccionada por el usuario.
 */
export async function selectAvaliableFurniture(): Promise<{
 furniture: Array<string>;
}> {
 return await inquirer.prompt({
  type: "checkbox",
  name: "furniture",
  message: "Selecciona el mueble:",
  choices: db.getFurniture().map((furniture) => furniture.name),
 });
}

/**
 * Solicita al usuario que introduzca la cantidad de un mueble específico.
 * @param {string} furniture - El mueble para el que se solicita la cantidad.
 * @returns {Promise<{ option: number }>} La cantidad introducida por el usuario.
 */
export async function insertQuantityOfFurniture(
 furniture: string
): Promise<{ option: number }> {
 return await inquirer.prompt({
  type: "number",
  name: "option",
  message: "Cantidad de " + furniture + ":",
 });
}

/**
 * Muestra un menú para seleccionar un cliente y devuelve la opción seleccionada por el usuario.
 * @param {string[]} clientChoices - Las opciones de clientes disponibles.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function selectClient(
 clientChoices: string[]
): Promise<{ option: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Selecciona el cliente:",
  choices: clientChoices.concat("Nuevo Cliente", "Volver"),
 });
}

/**
 * Muestra un menú para seleccionar los muebles a vender y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ furniture: Array<string> }>} La opción seleccionada por el usuario.
 */
export async function selectFurnitureToSell(): Promise<{
 furniture: Array<string>;
}> {
 return await inquirer.prompt({
  type: "checkbox",
  name: "furniture",
  message: "Selecciona los muebles vendidos:",
  choices: db.getFurniture().map((furniture) => furniture.name),
 });
}

/**
 * Solicita al usuario que introduzca la información para la búsqueda.
 * @returns {Promise<{ value: string }>} La información introducida por el usuario.
 */
export async function queryPrompt(): Promise<{ value: string }> {
 return await inquirer.prompt({
  type: "input",
  name: "value",
  message: `Introduce la información para la búsqueda:`,
 });
}

/**
 * Muestra un menú para seleccionar el atributo por el que buscar un cliente o proveedor y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function selectClientSupplierAttributePrompt(): Promise<{
 option: string;
}> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Búsqueda de Cliente por:",
  choices: ["Nombre", "Contacto", "Dirección", "Volver"],
 });
}

/**
 * Muestra un menú para seleccionar un cliente a eliminar y devuelve la opción seleccionada por el usuario.
 * @param {Object[]} clientChoices - Las opciones de clientes disponibles.
 * @returns {Promise<{ ClientsId: string }>} El ID del cliente seleccionado por el usuario.
 */
export async function selectClientToRemove(
 clientChoices: { name: string; value: string }[]
): Promise<{ ClientsId: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "ClientsId",
  message: "Selecciona el cliente que deseas eliminar:",
  choices: clientChoices,
 });
}

/**
 * Muestra un menú para seleccionar un proveedor a eliminar y devuelve la opción seleccionada por el usuario.
 * @param {Object[]} supplierChoices - Las opciones de proveedores disponibles.
 * @returns {Promise<{ SupplierId: string }>} El ID del proveedor seleccionado por el usuario.
 */
export async function selectSupplierToRemove(
 supplierChoices: { name: string; value: string }[]
): Promise<{ SupplierId: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "SupplierId",
  message: "Selecciona el proveedor que deseas eliminar:",
  choices: supplierChoices,
 });
}

/**
 * Solicita al usuario que introduzca los atributos de un cliente o proveedor.
 * @returns {Promise<{ contact: string, name: string, address: string }>} Los atributos introducidos por el usuario.
 */
export async function getClientSupplierAttributes(): Promise<{
 contact: string;
 name: string;
 address: string;
}> {
 return await inquirer.prompt([
  {
   type: "input",
   name: "name",
   message: "Introduce el nombre:",
  },
  {
   type: "input",
   name: "contact",
   message: "Introduce la información de contacto:",
  },
  {
   type: "input",
   name: "address",
   message: "Introduce la dirección:",
  },
 ]);
}

/**
 * Solicita al usuario que introduzca los atributos de un mueble.
 * @returns {Promise<{ name: string, type: string, description: string, material: string, dimensions: string, price: number }>} Los atributos introducidos por el usuario.
 */
export async function getFurnitureAttributes(): Promise<{
 name: string;
 type: string;
 description: string;
 material: string;
 dimensions: string;
 price: number;
}> {
 return await inquirer.prompt([
  {
   type: "input",
   name: "name",
   message: "Nombre del mueble:",
  },
  {
   type: "input",
   name: "type",
   message: "Tipo del mueble:",
  },
  {
   type: "input",
   name: "description",
   message: "Descripción del mueble:",
  },
  {
   type: "input",
   name: "material",
   message: "Material del mueble:",
  },
  {
   type: "input",
   name: "dimensions",
   message: "Dimensiones del mueble:",
  },
  {
   type: "number",
   name: "price",
   message: "Precio del mueble:",
  },
 ]);
}

/**
 * Muestra un menú para seleccionar un mueble a eliminar y devuelve la opción seleccionada por el usuario.
 * @param {Object[]} furnitureChoices - Las opciones de muebles disponibles.
 * @returns {Promise<{ furnitureId: string }>} El ID del mueble seleccionado por el usuario.
 */
export async function selectFurnitureToRemove(
 furnitureChoices: { name: string; value: string }[]
): Promise<{ furnitureId: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "furnitureId",
  message: "Selecciona el mueble que deseas eliminar:",
  choices: furnitureChoices,
 });
}

/**
 * Muestra un menú para seleccionar el atributo por el que buscar un mueble y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} El atributo seleccionado por el usuario.
 */
export async function searchFurnitureByPrompt(): Promise<{ option: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Búsqueda de Mueble por:",
  choices: ["Nombre", "Tipo", "Descripción", "Volver"],
 });
}

/**
 * Muestra un menú para seleccionar el atributo por el que buscar una transacción y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} El atributo seleccionado por el usuario.
 */
export async function searchTransactionsByPrompt(): Promise<{
 option: string;
}> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "Búsqueda de Transacciones por:",
  choices: ["Fecha", "Tipo", "Proveedor/Cliente", "Volver"],
 });
}

/**
 * Muestra un menú para seleccionar una transacción a eliminar y devuelve la opción seleccionada por el usuario.
 * @param {Object[]} transactionChoices - Las opciones de transacciones disponibles.
 * @returns {Promise<{ TransactionsId: string }>} El ID de la transacción seleccionada por el usuario.
 */
export async function selectTransactionToRemove(
 transactionChoices: { value: string }[]
): Promise<{ TransactionsId: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "TransactionsId",
  message: "Selecciona la transacción que deseas eliminar:",
  choices: transactionChoices.concat({ value: "Volver" }),
 });
}

/**
 * Solicita al usuario que introduzca la fecha de inicio para la búsqueda.
 * @returns {Promise<{ value: string }>} La fecha de inicio introducida por el usuario.
 */
export async function insertStartDatePrompt(): Promise<{ value: string }> {
 return await inquirer.prompt({
  type: "input",
  name: "value",
  message: `Introduce la fecha de inicio para la búsqueda:`,
 });
}

/**
 * Solicita al usuario que introduzca la fecha de fin para la búsqueda.
 * @returns {Promise<{ value: string }>} La fecha de fin introducida por el usuario.
 */
export async function insertEndDatePrompt(): Promise<{ value: string }> {
 return await inquirer.prompt({
  type: "input",
  name: "value",
  message: `Introduce la fecha de fin para la búsqueda:`,
 });
}

/**
 * Muestra un menú para seleccionar el tipo de transacción y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ value: string }>} El tipo de transacción seleccionado por el usuario.
 */
export async function selectKindOfTransactionPrompt(): Promise<{
 value: string;
}> {
 return await inquirer.prompt({
  type: "list",
  name: "value",
  message: `Selecciona el tipo de transacción:`,
  choices: [
   "Facturación llevada a cabo por ventas a clientes",
   "Gastos realizados por compras a proveedores",
  ],
 });
}

/**
 * Solicita al usuario que introduzca los atributos de una transacción.
 * @returns {Promise<{ date: string, type: string, clientSupplier: string, furniture: string[], total: number }>} Los atributos introducidos por el usuario.
 */
export async function getTransactionAttributesPrompt(): Promise<{
 date: string;
 type: string;
 clientSupplier: string;
 furniture: string[];
 total: number;
}> {
 const TypesList = ["Venta", "Compra", "Devolución"];
 return await inquirer.prompt([
  {
   type: "input",
   name: "date",
   message: "Fecha de la transacción:",
  },
  {
   type: "list",
   name: "type",
   message: "Tipo de transacción:",
   choices: TypesList,
  },
  {
   type: "input",
   name: "clientSupplier",
   message: "Proveedor/Cliente:",
  },
  {
   type: "input",
   name: "furniture",
   message: "Muebles transferidos:",
  },
  {
   type: "number",
   name: "total",
   message: "Importe total:",
  },
 ]);
}

/**
 * Muestra un menú para seleccionar cómo ordenar los resultados y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ option: string }>} La opción seleccionada por el usuario.
 */
export async function howToOrderPrompt(): Promise<{ option: string }> {
 return await inquirer.prompt({
  type: "list",
  name: "option",
  message: "¿Cómo deseas ordenar los resultados?",
  choices: ["Ascendente", "Descendente"],
 });
}

/**
 * Muestra un menú para seleccionar una transacción a devolver y devuelve la opción seleccionada por el usuario.
 * @returns {Promise<{ value: string }>} El ID de la transacción seleccionada por el usuario.
 */
export async function selectReturnedTransactionPrompt(): Promise<{
 value: string;
}> {
 const transactionChoices = db
  .getTransactions()
  .filter(
   (transaction) => transaction.type == "Venta" || transaction.type == "Compra"
  );
 return await inquirer.prompt({
  type: "list",
  name: "value",
  message: "Selecciona la transacción que deseas devolver:",
  choices: transactionChoices.map(
   (transaction) =>
    (transaction.type == "Venta" ? "Venta a " : "Compra a ") +
    transaction.clientSupplier +
    " por " +
    transaction.total +
    "€" +
    " el " +
    transaction.date +
    ". ID: " +
    transaction.id
  ),
 });
}
