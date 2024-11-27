import { newEntrySchema } from "./utils";
import z from "zod";
export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export type NewPatientEntry = z.infer<typeof newEntrySchema>;
export interface PatientEntry extends NewPatientEntry {
    id: string;
}
export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;