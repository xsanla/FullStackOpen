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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;

  entries: Entry[]
}


export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;