import express from 'express';
import { json, urlencoded } from 'body-parser';

import './utils/mongoConnect';
import clinicalRouter from './routes/clinical';
import errorHandle from './utils/errorHandling';
import cors from "cors";
import 'dotenv/config';

const app = express();
const PORT = 8080;

app.use(urlencoded({extended: true}));
app.use(json());

const corsOpts = {
    origin: '*',
    methods: [
      'GET',
      'POST',
      'DELETE'
    ],
    allowedHeaders: [
      'Content-Type',
    ],
};
  
app.use(cors(corsOpts));

// Base Route
app.get('/', (req, res) => {
    res.sendStatus(200);
});

// Patients Routes
app.use('/clinicals/patients', clinicalRouter);

// Error Handling
app.use(errorHandle);

app.listen(PORT, () => {
    console.log(`Server is up and running at port ${PORT}`);
});