import { Schema, model, Document, connect } from "mongoose";
import { customerSchema } from "./customer.js";
import { providerSchema } from "./provider.js";
import { furnitureSchema } from "./furniture.js";

connect("mongodb+srv://alu0101:123@dsipractica13.pqujcp0.mongodb.net/main")
  .then(() => {
    console.log("Connected to the transaction collection");
  })
  .catch(() => {
    console.log("SomethingAAAA went wrong when conecting to the transaction database");
  });


// Definición de la interfaz para el documento de transacción
interface Transaction extends Document {
  type: "Compra" | "Venta";
  furniture: {
    _id: typeof furnitureSchema;
    quantity: number;
  }[];
  customer?: typeof customerSchema;
  provider?: typeof providerSchema;
  amount: number;
  date: string;
  time: string;
}

// Definición del esquema de transacción
export const transactionSchema = new Schema<Transaction>({
  type: {
    type: String,
    enum: ["Compra", "Venta"],
    required: true,
  },
  furniture: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Furniture",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    }
  ],
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: new Date().toISOString().split("T")[0],
  },
  time: {
    type: String,
    required: true,
    default: new Date().toISOString().split("T")[1].split(".")[0],
  },
});

// Creación del modelo de transacción
export default model<Transaction>("Transaction", transactionSchema);