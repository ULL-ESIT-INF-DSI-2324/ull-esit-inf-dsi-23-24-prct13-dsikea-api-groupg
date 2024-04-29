import express from 'express';
import bodyParser from 'body-parser';
import { customerRouter } from './routes/customer_route.js';
import { providerRouter } from './routes/provider_route.js';
import { defaultRouter } from './routes/default_route.js';
import { furnitureRouter } from './routes/furniture_route.js';
import { transactionRouter } from './routes/transaction_route.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.raw());

app.use(customerRouter);
app.use(providerRouter);
app.use(furnitureRouter);
app.use(transactionRouter);

app.use(defaultRouter);

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

export default app;