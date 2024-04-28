import { Document, connect, model, Schema } from "mongoose";

connect("mongodb://127.0.0.1:27017/customers")
  .then(() => {
    console.log("Connected to the customers database");
  })
  .catch(() => {
    console.log(
      "Something went wrong when conecting to the customers database",
    );
  });

interface Customer extends Document {
  nif: string;
  name: string;
  contact: string;
  address: string;
}

export const customerSchema: Schema = new Schema<Customer>({
	nif: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
});

export default model<Customer>("Customer", customerSchema);