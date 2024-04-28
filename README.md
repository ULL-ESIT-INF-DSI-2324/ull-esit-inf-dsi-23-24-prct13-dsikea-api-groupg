# PRÁCTICA 7: DSIKEA
## DESARROLLO DE SISTEMAS INFORMÁTICOS
### Gabriel Ángel Canals Salleras - alu0101460468
### Marco Napierski - alu0101469317
---
## Objetivo de la práctica

En el **objetivo** del proyecto consiste en la creación de un **sistema de gestión** de Stock y transacciones para una **tienda de muebles**. El sistema debe ser capaz de gestionar el stock, establecer las transacciones de compras a proveedores y ventas a clientes, y generar informes de ventas y stock. También podrán aplicarse las devoluciones de productos y la gestión de los clientes.

## Tareas previas
Tras aceptar debidamente la tarea en GitHub Classroom, habilitamos **GitHub Pages** para la elaboración de este informe. Posteriormente, clonamos el repositorio en nuestro equipo local y creamos una rama `code` para el desarrollo de la práctica.

En este proyecto trabajamos con los módulos `inquirer.js` y `lowdb`. El primero es una biblioteca para **Node.js** que nos permite crear interfaces de línea de comandos interactivas. El segundo es una base de datos JSON que nos permite almacenar y consultar datos de forma sencilla.

Como estaremos utilizando el módulo ESM, debemos cambiar Istanbul por `c8` para la cobertura de código. Para ello, instalamos `c8` con el comando `npm install c8 --save-dev` y modificamos el script `test` en el archivo `package.json` para que ejecute `c8` en lugar de `nyc`.

## Planteamiento de desarrollo
El sistema planteado en nuestro proyecto plantea el uso de **cuatro tablas en la base de datos**: `muebles`, `clientes`, `proveedores` y `transacciones`. Cada una de estas tablas tiene una serie de campos que permiten almacenar la información necesaria para el correcto funcionamiento del sistema.

El sistema debe ser capaz de realizar las siguientes **operaciones**:
- Añadir un mueble al stock.
- Eliminar un mueble del stock.
- Al añadir un mueble que ya existe, se debe actualizar el stock.
- Añadir un cliente.
- Eliminar un cliente.
- Añadir un proveedor.
- Eliminar un proveedor.
- Realizar una compra a un proveedor.
- Realizar una venta a un cliente.
- Realizar una devolución de una serie de muebles.
- Crear, borrar y consultar transacciones.
- Ante una transacción, actualizar el stock.
- Consultar proveedores, clientes y muebles.

## Distribución de clases e interfaces
Para la implementación de este sistema, hemos decidido crear las siguientes **clases e interfaces**:

- **Base de datos**:
	- `interface Database`: Interfaz que define las tablas de la base de datos. A saber, `furniture`, `clients`, `suppliers` y `transactions`.
	- `class DatabaseProvider`: Clase que implementa la interfaz `Database` y que se encarga de la **gestión de la base de datos**. Utilizamos esta abstracción para poder cambiar la base de datos en el futuro sin tener que modificar el resto del código, respectando el principio de inversión de dependencias.
	- `abstract class DatabaseEntry`: Clase abstracta que define las entradas de la base de datos. A saber, `FurnitureEntry`, `ClientEntry`, `SupplierEntry` y `TransactionEntry`. Estas entradas **deberán implementar** los atributos `id` y `name`, así como los métodos `add`, `remove`, `search` y `get`.

- **Entradas de la base de datos**:
	- `class FurnitureEntry`: Representa las entradas de la tabla `furniture`. Implementa los métodos `add`, `remove`, `search` y `get` de la clase `DatabaseEntry` y la interfaz `Furniture`.
	- `class ClientEntry`: Representa las entradas de la tabla `clients`. Implementa los métodos `add`, `remove`, `search` y `get` de la clase `DatabaseEntry` y la interfaz `Client`.
	- `class SupplierEntry`: Representa las entradas de la tabla `suppliers`. Implementa los métodos `add`, `remove`, `search` y `get` de la clase `DatabaseEntry` y la interfaz `Supplier`.
	- `class TransactionEntry`: Representa las entradas de la tabla `transactions`. Implementa los métodos `add`, `remove`, `search` y `get` de la clase `DatabaseEntry` y la interfaz `Transaction`.

- **Gestión del sistema**:
	- `class Stock`: Clase que se encarga de la **gestión del stock**. Implementa los métodos necesarios para **creación de reportes y la gestión de las transacciones**. Cuenta con los métodos `addSale`, `addPurchase` y `addReturn` que permiten añadir una venta, una compra o una devolución, respectivamente, y actualizar el stock en consecuencia.
	- `class Manager`: Clase que se encarga de la **gestión de los menús**. Implementa los métodos necesarios para gestionar los distintos **menús** del programa, comunicarse con los distintos prompts de `inquirer.js` y gestionar las distintas opciones del menú.

- **Interfaz de usuario**:
	- `prompts.ts`: Archivo que **contiene todos los prompts** necesarios para la interacción con el usuario. Cada prompt se encuentra en una función distinta, que devuelve un objeto con la estructura necesaria para `inquirer.js`. Se ha planteado meter todos los prompts en un archivo separado para facilitar la gestión de los mismos y para poder reutilizarlos en distintas partes del programa.

## Implementación de la gestión de stock

### Añadir un mueble al stock
Para añadir un mueble al stock, se debe seleccionar la opción `Añadir mueble` del menú principal. A continuación, se solicitará el **nombre del mueble, tipo, descripción y su precio**. Tras introducir estos datos, el mueble se **añadirá al stock**.

### Eliminar un mueble del stock
Para eliminar un mueble del stock, se debe seleccionar la opción `Eliminar mueble` del menú principal. A continuación, se **deberá seleccionar el mueble a eliminar** de una lista de muebles. Tras seleccionar el mueble, se eliminará del stock.

### Al añadir un mueble que ya existe, se debe actualizar el stock
Al introducir los mismos datos de un mueble que ya existe, **se actualizará el stock**. Esto se realiza comparando todos los campos del mueble, y si coinciden, se actualizará el stock.

### Añadir una venta a un cliente
Para añadir una venta a un cliente, se debe seleccionar la opción `Añadir venta` del menú principal. A continuación, se desplegará un menú para** seleccionar el cliente** al que se le realizará la venta, pudiendo crearse **uno nuevo**. Tras seleccionar el cliente, se desplegará un menú para seleccionar el mueble que se venderá. Pueden seleccionarse **varios**. Tras seleccionar el mueble, se solicitará la cantidad de muebles a vender. Este paso se realizará **para todos los muebles** seleccionados. Tras introducir la cantidad, se realizará la venta y se **actualizará** el stock.

### Realizar una devolución de una serie de muebles
Para realizar una devolución de una serie de muebles, se debe seleccionar la opción `Añadir devolución` del menú principal. A continuación, se desplegará un menú para **seleccionar la devolución entre las distintas transacciones de compra y venta**. El stock se actualizará en consecuencia.

### Añadir una compra a un proveedor
Para añadir una compra a un proveedor, se debe seleccionar la opción `Añadir compra` del menú principal. A continuación, se desplegará un menú para seleccionar el proveedor al que se le realizará la compra, pudiendo crearse **uno nuevo**. Tras seleccionar el proveedor, se desplegará un menú para seleccionar el mueble que se comprará. Pueden seleccionarse **varios**. Tras seleccionar el mueble, se solicitará la cantidad de muebles a comprar. Este paso se realizará **para todos los muebles** seleccionados. Tras introducir la cantidad, se realizará la compra y se **actualizará** el stock.

## Realización de tests

Hemos utilizado una metodología de desarrollo dirigida por pruebas (**TDD**) para la realización de esta práctica. Hemos creado una serie de tests para comprobar el correcto funcionamiento de las distintas clases y métodos del sistema. Hemos utilizado la biblioteca `mocha` para la realización de los tests y `chai` para las aserciones.

Las pruebas se han realizado para comprobar el correcto funcionamiento de los métodos de las distintas clases, así como para comprobar el correcto funcionamiento de los métodos de la base de datos. También se han realizado pruebas para comprobar el correcto funcionamiento de los métodos de la gestión del stock.

La **principal dificultad** que hemos encontrado en la realización de los tests ha sido la **realización de tests para cubrir el uso de** `inquirer.js`. Hemos utilizado la biblioteca `sinon` para simular la entrada de datos del usuario y poder realizar tests para comprobar el correcto funcionamiento de los distintos prompts.

## Cobertura de código

Hemos utilizado la biblioteca `c8` para comprobar la **cobertura de código** de nuestro sistema. Hemos comprobado que la cobertura de código es del 100% para todas las clases y métodos del sistema. Una vez puesto el repositorio en público, podrá observarse el cubrimiento en `coveralls` y `sonarcloud`.

## Conclusión
La realización de esta práctica nos ha permitido aprender a utilizar las bibliotecas `inquirer.js` y `lowdb` para la creación de un sistema de gestión de stock y transacciones. Hemos aprendido a utilizar estas bibliotecas para la creación de un sistema de gestión de stock y transacciones, y hemos aprendido a realizar tests y comprobar la cobertura de código de nuestro sistema.