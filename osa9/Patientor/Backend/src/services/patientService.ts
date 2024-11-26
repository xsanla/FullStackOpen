import patientEntries from '../../data/patients';
import { NonSensitivePatientEntry, NewPatientEntry, PatientEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getEntries = ():NonSensitivePatientEntry[] => {
    return patientEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patientEntries.push(newPatientEntry);
    return newPatientEntry;
};

export default {getEntries, addPatient};