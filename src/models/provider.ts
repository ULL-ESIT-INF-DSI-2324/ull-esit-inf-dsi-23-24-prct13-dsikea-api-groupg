import { Document, connect, model, Schema } from "mongoose";

connect("mongodb+srv://alu0101:123@dsipractica13.pqujcp0.mongodb.net/main")
  .then(() => {
    console.log("Connected to the provider collection");
  })
  .catch(() => {
    console.log("SomethingAAAA went wrong when conecting to the provider database");
  });

interface IProvider extends Document {
  name: string;
  contact: string;
  address: string;
  cif: string;
}

export const providerSchema: Schema = new Schema<IProvider>({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  cif: { type: String, required: true, unique: true },
});

export default model<IProvider>("Provider", providerSchema);