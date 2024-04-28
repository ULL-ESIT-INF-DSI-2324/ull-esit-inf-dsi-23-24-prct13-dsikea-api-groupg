import express from "express";
import Provider from "../models/provider.js";

export const providerRouter = express.Router();

//CREAR PROVIDER
providerRouter.post("/providers", (req, res) => {
  const provider = new Provider(req.body);
  provider.save().then(() => {
    res.send(provider);
  });
});

// GET ALL PROVIDERS
providerRouter.get("/providers", async (req, res) => {
  try {
    const providers = await Provider.find();
    if (providers) {
      return res.send(providers);
    } else {
      return res.status(404).send({ error: "Provider not found" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

//DELETE PROVIDER BY CIF WITH QUERY
providerRouter.delete("/providers/delete", async (req, res) => {
  try {
    const provider = await Provider.findOneAndDelete(req.query);
    if (provider) {
      return res.send(provider);
    } else {
      return res.status(404).send({ error: "Provider not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Error deleting provider" });
  }
}
);

//DELETE PROVIDER BY ID
providerRouter.delete("/providers/:id", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);
    if (provider) {
      return res.send(provider);
    } else {
      return res.status(404).send({ error: "Provider not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Error deleting provider" });
  }
});

//UPDATE PROVIDER BY CIF WITH QUERY
providerRouter.patch("/providers/update", async (req, res) => {
  try {
    const provider = await Provider.findOneAndUpdate(req.query, req.body, {
      new: true,
    });
    if (provider) {
      return res.send(provider);
    } else {
      return res.status(404).send({ error: "Provider not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Error updating provider" });
  }
}
);

// UPDATE PROVIDER BY ID
providerRouter.patch("/providers/:id", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params
      .id, req
      .body, { new: true });
    if (provider) {
      return res.send(provider);
    }
    else {
      return res.status(404).send({ error: "Provider not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Error updating provider" });
  }
}
);

// SEARCH PROVIDERS WITH QUERY
providerRouter.get("/providers/search", async (req, res) => {
  try {
    const providers = await Provider.find(req.query);
    if (providers) {
      return res.send(providers);
    } else {
      return res.status(404).send({ error: "Providers not found" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

//GET PROVIDER BY CIF WITH QUERY
providerRouter.get("/providers/get", async (req, res) => {
  try {
    const provider = await Provider
      .findOne(req.query);
    if (provider) {
      return res.send(provider);
    }
    else {
      return res.status(404).send({ error: "Provider not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Error getting provider" });
  }
}
);

//GET PROVIDER BY ID
providerRouter.get("/providers/:id", async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (provider) {
      return res.send(provider);
    } else {
      return res.status(404).send({ error: "Provider not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Error getting provider" });
  }
}
);

//CHECK IF PROVIDER EXISTS BY ID
providerRouter.get("/providers/:id/exists", async (req, res) => {
  try {
    const provider = await Provider.exists({ _id: req.params.id });
    if (provider) {
      return res.send({ exists: true });
    } else {
      return res.send({ exists: false });
    }
  } catch (error) {
    return res.status(500).send({ error: "Error checking if provider exists" });
  }
}
);

