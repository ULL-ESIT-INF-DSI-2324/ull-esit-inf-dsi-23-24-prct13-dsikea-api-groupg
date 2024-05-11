# Práctica 13: API REST con Node/Express para gestionar una tienda de muebles
## DESARROLLO DE SISTEMAS INFORMÁTICOS
### Gabriel Ángel Canals Salleras - alu0101460468
### Marco Napierski - alu0101469317
---
## Objetivo de la práctica

En el **objetivo** del proyecto consiste en la creación de un **sistema de gestión** de Stock y transacciones para una **tienda de muebles**. El sistema debe ser capaz de gestionar el stock, establecer las transacciones de compras a proveedores y ventas a customeres, y generar informes de ventas y stock. También podrán aplicarse las devoluciones de productos y la gestión de los customeres.

En este caso, el sistema consistirá en una API REST que permitirá la gestión de los distintos elementos del sistema. La API REST permitirá la creación, modificación y eliminación de los distintos elementos del sistema, así como la realización de las distintas transacciones.

## Tareas previas
Tras aceptar debidamente la tarea en GitHub Classroom, habilitamos **GitHub Pages** para la elaboración de este informe. Posteriormente, clonamos el repositorio en nuestro equipo local y creamos una rama `code` para el desarrollo de la práctica.

En este proyecto trabajamos con `MongoDB`, `MongoDB Atlas`, `Node.js`, `Express.js`, `Mongoose` y `Render`. Este último es un motor de plantillas que nos permite desplegar la API REST en un servidor web.

## Planteamiento de desarrollo
El sistema planteado en nuestro proyecto plantea el uso de **cuatro bases de datos** distintas: `furniture`, `customers`, `providers` y `transactions`. Cada una de estas bases de datos contendrá una serie de entradas que representarán los distintos elementos del sistema.

Operaciones que se pueden realizar en el sistema:
- CRUD de muebles.
- CRUD de customeres.
- CRUD de proveedores.
- CRUD de transacciones.

## Creación de Rutas
Para la creación de las rutas de la API REST, hemos creado una serie de rutas que permiten la realización de las distintas operaciones del sistema. Las rutas creadas son las siguientes:
- `/furniture`: Ruta que permite la realización de operaciones CRUD sobre los muebles.
- `/customers`: Ruta que permite la realización de operaciones CRUD sobre los customeres.
- `/providers`: Ruta que permite la realización de operaciones CRUD sobre los proveedores.
- `/transactions`: Ruta que permite la realización de operaciones CRUD sobre las transacciones.

## Creación de los modelos
Para la creación de los modelos de la base de datos, hemos creado una serie de modelos que representan los distintos elementos del sistema. Los modelos creados son los siguientes:
- `Furniture`: Modelo que representa un mueble. Contiene los campos `name`, `type`, `description`, `price`, `material`, `color`, `dimensions` y `stock`.
- `Customer`: Modelo que representa un customere. Contiene los campos `name`, `nif`, `contact` y `address`.
- `Provider`: Modelo que representa un proveedor. Contiene los campos `name`, `cif`, `contact` y `address`.
- `Transaction`: Modelo que representa una transacción. Contiene los campos `type`, `date`, `furniture`, `amount`, `time` y `customer` o `provider`.


## Implementación de la gestión de stock. Operaciones CRUD

### Añadir un mueble al stock

```typescript
furnitureRouter.post("/furniture", (req, res) => {
	const furniture = new Furniture(req.body);
	furniture.save().then(() => {
		res.send(furniture);
	});
});
```

Existen disparadores para comprobar si el mueble introducido es correcto. Si no lo es, se lanzará un error. Estos disparadores se encuentran en el modelo `Furniture`.

### Eliminar un mueble del stock
Se elimina un mueble del stock mediante su `id`. La entrada se elimina de la base de datos y se devuelve un mensaje de confirmación.

### Obteniendo un mueble del stock por su `id`
Podremos obtener un mueble del stock mediante su `id`. Se devolverá el mueble correspondiente.

### Obteniendo todos los muebles del stock
Podremos obtener todos los muebles del stock. Se devolverán todos los muebles de la base de datos.

### Obteniendo un mueble del stock por consulta
Podremos obtener un mueble del stock mediante una consulta. Se devolverán los muebles que cumplan con la consulta.

### Actualizando un mueble del stock
Podremos actualizar un mueble del stock mediante su `id` o por consulta. Se devolverá el mueble actualizado.

### Proveedores y clientes
Estas entidades se gestionan de manera casi idéntica debido a su similitud. Se pueden añadir, eliminar por `id`, eliminar por `cif` o `nif`, obtener por `id`, obtener por `cif` o `nif`, obtener todos y actualizar por `id`, `cif` o `nif`.

### Añadir una venta
Para añadir una venta se debe proporcionar el `nif` del cliente y un array con los nombres de los muebles vendidos y la cantidad de cada uno. Se comprobará si hay suficiente stock para realizar la venta y se actualizará el stock en consecuencia. Además, calculará el precio total de la venta y el momento en el que se ha realizado. Todo esto se almacenará en la base de datos en forma de transacción.

### Añadir una compra
Para añadir una compra se debe proporcionar el `cif` del proveedor y un array con los nombres de los muebles comprados y la cantidad de cada uno. Se actualizará el stock en consecuencia y se almacenará en la base de datos en forma de transacción. En caso de comprar un mueble que no está en stock, se creará un nuevo mueble.

### Realizar una devolución de una serie de muebles
La eliminación de una transacción implica la devolución de los muebles vendidos o comprados. Se actualizará el stock en consecuencia.

### Actualización de transacciones
Se pueden actualizar las transacciones mediante su `id`. Se pueden actualizar los campos `type`, `date`, `furniture`, `amount`, `time`, `customer` o `provider`. En caso de que se actualice el campo `furniture`, se actualizará el stock en consecuencia.

### Consulta de transacciones
Podrán obtenerse todas las transacciones, una transacción por `id`, por `nid` o por `cif`, u obtener todas las transacciones entre dos fechas.

## Realización de tests
Hemos utilizado una metodología de desarrollo dirigida por pruebas (**TDD**) para la realización de esta práctica. Hemos creado una serie de tests para comprobar el correcto funcionamiento de las distintas clases y métodos del sistema. Hemos utilizado la biblioteca `mocha` para la realización de los tests y `supertest` para la realización de tests de integración.

## Despliegue en Render
Hemos desplegado la API REST en Render para poder acceder a ella desde cualquier lugar.

## Conclusión
La realización de esta práctica nos ha permitido aprender a crear una API REST con Node/Express y Mongoose. Hemos aprendido a crear rutas, modelos y controladores para la gestión de una base de datos. También hemos aprendido a realizar tests de integración para comprobar el correcto funcionamiento de la API REST.