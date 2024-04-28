import { Document, connect, model, Schema } from "mongoose";

connect("mongodb+srv://alu0101:123@dsipractica13.pqujcp0.mongodb.net/main")
  .then(() => {
    console.log("Connected to the furniture collection");
  })
  .catch(() => {
    console.log("SomethingAAAA went wrong when conecting to the furniture database");
  });

interface Furniture extends Document {
  name: string;
  type: string;
  description: string;
  material: string;
  dimensions: string;
  price: number;
  currentStock: number;
  color: string;
}

export const furnitureSchema: Schema = new Schema<Furniture>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  dimensions: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currentStock: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
});

export default model<Furniture>("Furniture", furnitureSchema);