import express from "express";
import patientService from "../services/patientService";
import {newEntrySchema} from "../utils";

import {z} from "zod";
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getEntries());
});




router.post('/', (req, res) => {
    try{
        const newPatientEntry = newEntrySchema.parse(req.body);
        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({error: error.issues});
        } else {
            res.status(400).send({error: "unknown error"});
        }
    }

});


export default router;