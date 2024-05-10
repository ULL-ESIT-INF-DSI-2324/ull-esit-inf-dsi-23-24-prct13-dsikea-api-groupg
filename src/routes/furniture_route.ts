import express from "express";
import Furniture from "../models/furniture.js";

export const furnitureRouter = express.Router();

//CREAR furniture
furnitureRouter.post("/furniture", (req, res) => {
	const furniture = new Furniture(req.body);
	furniture.save().then(() => {
		res.send(furniture);
	});
});

// GET ALL furniture
furnitureRouter.get("/furniture", async (req, res) => {
	try {
		const furniture = await Furniture.find();
		if (furniture) {
			return res.send(furniture);
		} else {
			return res.status(404).send({ error: "furniture not found" });
		}
	} catch (error) {
		return res.status(500).send(error);
	}
});

//DELETE furniture BY name WITH QUERY
furnitureRouter.delete("/furniture/delete", async (req, res) => {
	try {
		const furniture = await Furniture.findOneAndDelete(req.query);
		if (furniture) {
			return res.send(furniture);
		} else {
			return res.status(404).send({ error: "furniture not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error deleting furniture" });
	}
}
);

//DELETE furniture BY ID
furnitureRouter.delete("/furniture/:id", async (req, res) => {
	try {
		const furniture = await Furniture.findByIdAndDelete(req.params.id);
		if (furniture) {
			return res.send(furniture);
		} else {
			return res.status(404).send({ error: "furniture not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error deleting furniture" });
	}
});

//UPDATE furniture BY NIF WITH QUERY
furnitureRouter.patch("/furniture/update", async (req, res) => {
	try {
		const furniture = await Furniture.findOneAndUpdate(req.query, req.body, {
			new: true,
		});
		if (furniture) {
			return res.send(furniture);
		} else {
			return res.status(404).send({ error: "furniture not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error updating furniture" });
	}
}
);

// UPDATE furniture BY ID
furnitureRouter.patch("/furniture/:id", async (req, res) => {
	try {
		const furniture = await Furniture.findByIdAndUpdate(req.params
			.id, req
			.body, { new: true });
		if (furniture) {
			return res.send(furniture);
		}
		else {
			return res.status(404).send({ error: "furniture not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error updating furniture" });
	}
}
);

// SEARCH furniture WITH QUERY
furnitureRouter.get("/furniture/search", async (req, res) => {
	try {
		const furniture = await Furniture.find(req.query);
		if (furniture) {
			return res.send(furniture);
		} else {
			return res.status(404).send({ error: "furniture not found" });
		}
	} catch (error) {
		return res.status(500).send(error);
	}
});

//GET furniture BY NIF WITH QUERY
furnitureRouter.get("/furniture/get", async (req, res) => {
	try {
		const furniture = await Furniture
			.findOne(req.query);
		if (furniture) {
			return res.send(furniture);
		}
		else {
			return res.status(404).send({ error: "furniture not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error getting furniture" });
	}
}
);
	
//GET furniture BY ID
furnitureRouter.get("/furniture/:id", async (req, res) => {
	try {
		const furniture = await Furniture.findById(req.params.id);
		if (furniture) {
			return res.send(furniture);
		} else {
			return res.status(404).send({ error: "furniture not found" });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error getting furniture" });
	}
}
);

//CHECK IF furniture EXISTS BY ID
furnitureRouter.get("/furniture/:id/exists", async (req, res) => {
	try {
		const furniture = await Furniture.exists({ _id: req.params.id });
		if (furniture) {
			return res.send({ exists: true });
		} else {
			return res.send({ exists: false });
		}
	} catch (error) {
		return res.status(500).send({ error: "Error checking if furniture exists" });
	}
}
);

