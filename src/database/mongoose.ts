import mongoose from 'mongoose';

const uri = "mongodb+srv://alu0101:123@dsipractica13.pqujcp0.mongodb.net/?retryWrites=true&w=majority&appName=DSIPractica13";
const clientOptions: mongoose.ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

run().catch(console.dir);
