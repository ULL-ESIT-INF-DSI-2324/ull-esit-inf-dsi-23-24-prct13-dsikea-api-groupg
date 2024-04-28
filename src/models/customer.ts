import { Document, connect, model, Schema } from "mongoose";

connect("mongodb+srv://alu0101:123@dsipractica13.pqujcp0.mongodb.net/main")
  .then(() => {
    console.log("Connected to the customers collection");
  })
  .catch(() => {
    console.log("SomethingAAAA went wrong when conecting to the customers database");
  });

interface CustomerInterface extends Document {
  nif: string;
  name: string;
  contact: string;
  address: string;
}

export const customerSchema: Schema = new Schema<CustomerInterface>({
  nif: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
});

export default model<CustomerInterface>("Customer", customerSchema);
