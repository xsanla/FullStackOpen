import express from 'express';
import calculateExercises from './exerciseCalculator';
import {isNotNumber} from "./utils";
import {calculateBmi} from "./bmiCalculator";
const app = express();
app.use(express.json());



app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    if (req.query.height === undefined || req.query.weight === undefined){
        res.status(400).send({error: "malformatted parameters"});
        return;
    }
    if (isNotNumber(Number(req.query.height)) || isNotNumber(Number(req.query.weight))){
        res.status(400).send({error: "malformatted parameters"});
        return;
    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    const bmi = calculateBmi(height, weight);
    res.send({height:height, weight:weight, bmi:bmi});
});

app.post('/exercises', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body:any = req.body
    console.log(body.daily_exercises)
    if(body === undefined || body.daily_exercises === undefined || body.target === undefined){
        res.status(400).send({error: "parameters missing"});
        return;
    }
    if(Array.isArray(body.daily_exercises) && !isNotNumber(body.target)){
        if(body.daily_exercises.every((val: any) => !isNotNumber(val))){
            res.send(calculateExercises(body.daily_exercises, body.target));
            return;
        } else {
            res.status(400).send({error: "malformatted parameters"});
            return;
        }
    } else {
        res.status(400).send({error: "malformatted parameters"});
        return;
    }
});
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});