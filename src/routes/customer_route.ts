import express from "express";
import Customer from "../models/customer.js";

export const customerRouter = express.Router();

//CREAR CUSTOMER
customerRouter.post("/customers", (req, res) => {
	const customer = new Customer(req.body);
	customer.save().then(() => {
		res.send(customer);
	});
});

// GET ALL CUSTOMERS
customerRouter.get("/customers", async (req, res) => {
	try {
		const customers = await Customer.find();
		if (customers) {
			return res.send(customers);
		} else {
			return res.status(404).send({ error: "Customers not found" });
		}
	} catch (error) {
		return res.status(500).send(error);
	}
});

//DELETE CUSTOMER BY NIF WITH QUERY
customerRouter.delete("/customers/delete", async (req, res) => {
	try {
		const customer = await Customer.findOneAndDelete(req.query);
		if (customer) {
			return res.send(customer);
		} else {
			return res.status(404).send({ error: "Customer not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error deleting customer" });
	}
}
);

//DELETE CUSTOMER BY ID
customerRouter.delete("/customers/:id", async (req, res) => {
	try {
		const customer = await Customer.findByIdAndDelete(req.params.id);
		if (customer) {
			return res.send(customer);
		} else {
			return res.status(404).send({ error: "Customer not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error deleting customer" });
	}
});

//UPDATE CUSTOMER BY NIF WITH QUERY
customerRouter.patch("/customers/update", async (req, res) => {
	try {
		const customer = await Customer.findOneAndUpdate(req.query, req.body, {
			new: true,
		});
		if (customer) {
			return res.send(customer);
		} else {
			return res.status(404).send({ error: "Customer not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error updating customer" });
	}
}
);

// UPDATE CUSTOMER BY ID
customerRouter.patch("/customers/:id", async (req, res) => {
	try {
		const customer = await Customer.findByIdAndUpdate(req.params
			.id, req
			.body, { new: true });
		if (customer) {
			return res.send(customer);
		}
		else {
			return res.status(404).send({ error: "Customer not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error updating customer" });
	}
}
);

// SEARCH CUSTOMERS WITH QUERY
customerRouter.get("/customers/search", async (req, res) => {
	try {
		const customers = await Customer.find(req.query);
		if (customers) {
			return res.send(customers);
		} else {
			return res.status(404).send({ error: "Customers not found" });
		}
	} catch (error) {
		return res.status(500).send(error);
	}
});

//GET CUSTOMER BY NIF WITH QUERY
customerRouter.get("/customers/get", async (req, res) => {
	try {
		const customer = await Customer
			.findOne(req.query);
		if (customer) {
			return res.send(customer);
		}
		else {
			return res.status(404).send({ error: "Customer not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error getting customer" });
	}
}
);
	
//GET CUSTOMER BY ID
customerRouter.get("/customers/:id", async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id);
		if (customer) {
			return res.send(customer);
		} else {
			return res.status(404).send({ error: "Customer not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error getting customer" });
	}
}
);

//CHECK IF CUSTOMER EXISTS BY ID
customerRouter.get("/customers/:id/exists", async (req, res) => {
	try {
		const customer = await Customer.exists({ _id: req.params.id });
		if (customer) {
			return res.send({ exists: true });
		} else {
			return res.send({ exists: false });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error checking if customer exists" });
	}
}
);

