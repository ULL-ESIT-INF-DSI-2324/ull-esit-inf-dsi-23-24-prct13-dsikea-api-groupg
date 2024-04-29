/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import Transaction from "../models/transaction.js";
import Customer from "../models/customer.js";
import Furniture from "../models/furniture.js";
import Provider from "../models/provider.js";

export const transactionRouter = express.Router();

function checkCorrectQuery(query: any) {
	if (query.type === 'Venta' && query.nif === undefined ||
		query.type === 'Compra' && query.cif === undefined ||
		query.furnitureList === undefined) return 400;
	return 200;
}

async function calculateAmount(furnitureList: any) {
	let amount = 0;
	for (const furniture of furnitureList) {
		const requestedFurniture = await Furniture.findOne({ name: furniture.name });
		if (requestedFurniture) amount += requestedFurniture.price * furniture.quantity;
	}
	return amount;
}

// CREATE TRANSACTION
transactionRouter.post('/transactions', async (req, res) => {
	if (checkCorrectQuery(req.body) !== 200) {
		return res.status(checkCorrectQuery(req.body)).send({ error: "Incorrect query" });
	}
	const date = new Date().toISOString().split('T')[0];
	const time = new Date().toISOString().split('T')[1].split('.')[0];
	let Finaltranaction;

	if (req.body.type === 'Venta') {
		const { nif, furnitureList } = req.body;
		const customer = await Customer.findOne({ nif: nif });
		if (!customer) {
			return res.status(404).send({ error: "Customer not found" });
		}
		for (const furniture of furnitureList) {
			const requestedFurniture = await Furniture.findOne({ name: furniture.name });
			if (!requestedFurniture) {
				return res.status(404).send({ error: "Furniture not found" });
			}
			if (requestedFurniture.currentStock < furniture.quantity) {
				return res.status(400).send({ error: "Insufficient stock for requested furniture" });
			}
			await Furniture.findOneAndUpdate({ name: furniture.name }, { currentStock: requestedFurniture.currentStock - furniture.quantity });
		}

		const pairsIdAmount = furnitureList.map(async (furniture: { name: string, quantity: number }) => {
			const requestedFurniture = await Furniture.findOne({ name: furniture.name });
			return { _id: requestedFurniture!._id, quantity: furniture.quantity };
		});
		const transaction = new Transaction({
			type: req.body.type,
			customer: customer,
			furniture: await Promise.all(pairsIdAmount),
			amount: await calculateAmount(furnitureList),
			date: date,
			time: time
		});
		Finaltranaction = transaction;


	} else if (req.body.type === 'Compra') {
		const { cif, furnitureList } = req.body;
		const provider = await Provider.findOne({ cif: cif });
		if (!provider) {
			return res.status(404).send({ error: "Provider not found" });
		}
		for (const furniture of furnitureList) {
			const requestedFurniture = await Furniture.findOne({ name: furniture.name });
			if (requestedFurniture) {
				requestedFurniture.currentStock += furniture.quantity;
				await requestedFurniture.save();
			} else {
				if (!furniture.type || !furniture.material || !furniture.dimensions || !furniture.price || !furniture.color) {
					return res.status(404).send({ error: "Couldnt create furniture since there are paramenters missing or couldnt find furniture" });
				}
				const newFurniture = new Furniture({
					name: furniture.name,
					type: furniture.type,
					material: furniture.material,
					dimensions: furniture.dimensions,
					description: furniture.description || "No description available",
					price: furniture.price,
					currentStock: furniture.quantity,
					color: furniture.color
				});
				await newFurniture.save();
			}
		}

		const pairsIdAmount = furnitureList.map(async (furniture: { name: string, quantity: number }) => {
			const requestedFurniture = await Furniture.findOne({ name: furniture.name });
			return { _id: requestedFurniture!._id, quantity: furniture.quantity };
		});
		const transaction = new Transaction({
			type: req.body.type,
			provider: provider,
			furniture: await Promise.all(pairsIdAmount),
			amount: await calculateAmount(furnitureList),
			date: date,
			time: time
		});
		Finaltranaction = transaction;
	}

	Finaltranaction!.save().then(() => {
		return res.status(201).send({ message: "Transaction completed" });
	}).catch(() => {
		return res.status(400).send({ error: "Error creating transaction" });
	});
	return;
});


// GET ALL TRANSACTIONS
transactionRouter.get('/transactions', async (req, res) => {
	try {
		const transactions = await Transaction.find();
		if (transactions) {
			return res.send(transactions);
		}
		return res.status(404).send({ error: "Transactions not found" });
	} catch (error) {
		return res
			.status(500)
			.send({ error: "Error getting transactions" });
	}
}
);

// GET TRANSACTION BY CUSTOMER NIF
transactionRouter.get('/transactions/customer', async (req, res) => {
	try {
		const customer = await Customer.findOne({
			nif: req.query.nif
		});
		if (!customer) {
			return res.status(404).send({ error: "Customer not found" });
		}
		const transactions = await Transaction.find({
			customer: customer
		});
		if (transactions) {
			return res.send(transactions);
		}
		return res.status(404).send({ error: "Transactions not found" });
	} catch (error) {
		return res.status(500).send({ error: "Error getting transactions" });
	}
}
);

// GET TRANSACTION BY PROVIDER CIF
transactionRouter.get('/transactions/provider', async (req, res) => {
	try {
		const provider = await Provider.findOne({
			cif
				: req.query.cif
		});
		if (!provider) {
			return res.status(404).send({ error: "Provider not found" });
		}
		const transactions = await Transaction.find({
			provider: provider
		});
		if (transactions) {
			return res.send(transactions);
		}
		return res.status(404).send({ error: "Transactions not found" });
	} catch (error) {
		return res.status(500).send({ error: "Error getting transactions" });
	}
}
);

// GET ALL TRANSACTIONS BETWEEN TWO DATES
transactionRouter.get('/transactions/search', async (req, res) => {
	try {
		const transactions = await Transaction.find({
			date: {
				$gte: req.query.startDate,
				$lte: req.query.endDate
			}
		});
		if (transactions) {
			return res.send(transactions);
		}
		return res.status(404).send({ error: "Transactions not found" });
	} catch (error) {
		return res.status(500).send({ error: "Error getting transactions" });
	}
}
);

// GET TRANSACTION BY ID
transactionRouter.get('/transactions/:id', async (req, res) => {
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (transaction) {
			return res.send(transaction);
		}
		return res.status(404).send({ error: "Transaction not found" });
	} catch (error) {
		return res.status(500).send({ error: "Error getting transaction" });
	}
});



// DELETE TRANSACTION BY ID AND UPDATE STOCK
transactionRouter.delete('/transactions/:id', async (req, res) => {
	try {
		const transaction = await Transaction.findById(req.params.id);
		if (!transaction) {
			return res.status(404).send({ error: "Transaction not found" });
		}
		if (transaction.type === 'Venta') {
			for (const furniture of transaction.furniture) {
				console.log(furniture.get('_id'));
				/* const requestedFurniture = await Furniture.findById(furniture._id);
				if (requestedFurniture) {
					requestedFurniture.currentStock += furniture.quantity;
					await requestedFurniture.save();
				} */
			}
		} /* else if (transaction.type === 'Compra') {
			for (const furniture of transaction.furniture) {
				const requestedFurniture = await Furniture.findById(furniture._id);
				if (requestedFurniture) {
					requestedFurniture.currentStock -= furniture.quantity;
					await requestedFurniture.save();
				}
			}
		}
		await transaction.remove(); */
		return res.send(transaction);
	} catch (error) {
		return res.status(500).send({ error: "Error deleting transaction" });
	}
}
);

// UPDATE TRANSACTION BY ID
transactionRouter.patch('/transactions/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['date', 'provider', 'customer'];
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid updates!' });
	}
	try {
		const transaction = await Transaction.findOneAndUpdate({
			_id: req.params.id
		},
			req.body,
			{
				new: true,
				runValidators: true
			});

		if (transaction) {
			return res.send(transaction);
		}
		return res.status(404).send();
	} catch (error) {
		return res.status(500).send(error);
	}
});