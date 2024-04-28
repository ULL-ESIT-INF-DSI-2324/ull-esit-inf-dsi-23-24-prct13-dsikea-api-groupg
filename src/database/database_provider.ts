import low from 'lowdb';
import FileSync from "lowdb/adapters/FileSync.js";
import { FurnitureEntry } from "../classes/furniture_entry.js";
import { ClientSupplier } from '../interfaces/client_supplier.js';
import { Database } from './database.js';
import { TransactionEntry } from '../classes/transaction_entry.js';


/**
 * Clase que proporciona una interfaz para interactuar con la base de datos.
 */
export class DatabaseProvider {
  /**
   * Adaptador para interactuar con el archivo de la base de datos.
   */
  public adapter = new FileSync<Database>('db.json'); 
  /**
   * Base de datos de baja utilización.
   */
  public db = low(this.adapter);
  
  /**
   * Constructor privado para implementar el patrón Singleton.
   */
  private constructor() {
    this.db.defaults({ furniture: [], suppliers: [], clients: [], transaction: [] }).write();
  }
  
  /**
   * Instancia única de la clase DatabaseProvider.
   */
  private static instance: DatabaseProvider;
  
  /**
   * Método para obtener la instancia única de la clase DatabaseProvider.
   * @returns La instancia única de la clase DatabaseProvider.
   */
  public static getInstance(): DatabaseProvider {
    if (!DatabaseProvider.instance) {   
      DatabaseProvider.instance = new DatabaseProvider();
    }
    return DatabaseProvider.instance;
  }
  
  /**
   * Método para obtener todos los muebles de la base de datos.
   * @returns Un array con todos los muebles.
   */
  getFurniture(): FurnitureEntry[] {
    return this.db.get('furniture').value();
  }
  
  /**
   * Método para añadir un mueble a la base de datos.
   * @param furniture - Mueble a añadir.
   */
  addFurniture(furniture: FurnitureEntry): void {
    this.db.get('furniture').push(furniture).write();
  }
  
  /**
   * Método para actualizar un mueble en la base de datos.
   * @param id - ID del mueble a actualizar.
   * @param currentStock - Nuevo stock del mueble.
   */
  updateFurniture(id: string, currentStock: number): void {
    this.db.get('furniture').find({ id: id }).assign({ currentStock: currentStock }).write();
  }
  
  /**
   * Método para eliminar un mueble de la base de datos.
   * @param id - ID del mueble a eliminar.
   */
  removeFurniture(id: string): void {
    this.db.get('furniture').remove({ id: id }).write();
  }
  
  /**
   * Método para obtener todos los proveedores de la base de datos.
   * @returns Un array con todos los proveedores.
   */
  getSuppliers(): ClientSupplier[] {
    return this.db.get('suppliers').value();
  }
  
  /**
   * Método para añadir un proveedor a la base de datos.
   * @param supplier - Proveedor a añadir.
   */
  addSupplier(supplier: ClientSupplier): void {
    this.db.get('suppliers').push(supplier).write();
  }
  
  /**
   * Método para eliminar un proveedor de la base de datos.
   * @param id - ID del proveedor a eliminar.
   */
  removeSupplier(id: string): void {
    this.db.get('suppliers').remove({ id: id }).write();
  }
  
  /**
   * Método para obtener todos los clientes de la base de datos.
   * @returns Un array con todos los clientes.
   */
  getClients(): ClientSupplier[] {
    return this.db.get('clients').value();
  }
  
  /**
   * Método para añadir un cliente a la base de datos.
   * @param client - Cliente a añadir.
   */
  addClient(client: ClientSupplier): void {
    this.db.get('clients').push(client).write();
  }
  
  /**
   * Método para eliminar un cliente de la base de datos.
   * @param id - ID del cliente a eliminar.
   */
  removeClient(id: string): void {
    this.db.get('clients').remove({ id: id }).write();
  }
  
  /**
   * Método para obtener todas las transacciones de la base de datos.
   * @returns Un array con todas las transacciones.
   */
  getTransactions(): TransactionEntry[] {
    return this.db.get('transaction').value();
  }
  
  /**
   * Método para añadir una transacción a la base de datos.
   * @param transaction - Transacción a añadir.
   */
  addTransaction(transaction: TransactionEntry): void {
    this.db.get('transaction').push(transaction).write();
  }
  
  /**
   * Método para eliminar una transacción de la base de datos.
   * @param id - ID de la transacción a eliminar.
   */
  removeTransaction(id: string): void {
    this.db.get('transaction').remove({ id: id }).write();
  }
}

