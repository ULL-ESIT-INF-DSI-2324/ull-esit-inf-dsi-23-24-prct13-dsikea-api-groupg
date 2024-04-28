import { Manager } from "./classes/manager.js";

/**
 * Función principal que inicia la aplicación.
 * Muestra un mensaje de bienvenida y abre el menú principal.
 */
async function startApp() {
  console.log("Bienvenido a la aplicación de gestión de muebles, proveedores y clientes.");
  const manager = Manager.getInstance();
  await manager.mainMenu();
}

// Inicio de la aplicación
startApp(); 

