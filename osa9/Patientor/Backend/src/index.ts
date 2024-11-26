import express from "express";
import cors from "cors";
import diagnosisRouter from './routes/diagnosesRoute';
import patientRouter from './routes/patientRoute';
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.get('/api/ping', (_req, res) => {
    res.status(200).send("pong");
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

