import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.listen(port, () => console.log(`Listening on port ${port}...`));