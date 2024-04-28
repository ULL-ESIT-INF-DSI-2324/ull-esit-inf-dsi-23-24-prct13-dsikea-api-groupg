 import { Document, connect, model, Schema } from "mongoose";

connect("mongodb://127.0.0.1:27017/furnitures")
  .then(() => {
    console.log("Connected to the furnitures database");
  })
  .catch(() => {
    console.log(
      "Something went wrong when conecting to the furniture database",
    );
  });

interface Furniture extends Document {
	id: string;
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