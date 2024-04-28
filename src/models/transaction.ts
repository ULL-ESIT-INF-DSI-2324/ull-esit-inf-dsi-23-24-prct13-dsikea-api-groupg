import { Schema, model, Document } from "mongoose";
import { customerSchema } from "./customer.js";
import { providerSchema } from "./provider.js";
import { furnitureSchema } from "./furniture.js";

// Definición de la interfaz para el documento de transacción
interface Transaction extends Document {
  type: "Compra" | "Venta" | "Devolución";
  furniture: (typeof furnitureSchema)[];
  customer?: typeof customerSchema;
  provider?: typeof providerSchema;
}

// Definición del esquema de transacción
export const transactionSchema = new Schema<Transaction>({
  type: {
    type: String,
    enum: ["Compra", "Venta", "Devolución"],
    required: true,
  },
  furniture: [
    {
      type: Schema.Types.ObjectId,
      ref: "Furniture",
    },
  ],
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
  },
  provider: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
  },
});

// Creación del modelo de transacción
export default model<Transaction>("Transaction", transactionSchema);