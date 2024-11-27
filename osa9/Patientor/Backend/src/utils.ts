import { NewPatientEntry, Gender } from "./types";
import {z} from "zod";


export const newEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return newEntrySchema.parse(object);
};