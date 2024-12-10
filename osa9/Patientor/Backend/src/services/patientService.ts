import patientEntries from '../../data/patients';
import { NonSensitivePatientEntry, NewPatientEntry, PatientEntry, Patient} from '../types';
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

const getPatientById = (id: string): Patient | undefined => {
    const patientFromData : Patient = patientEntries.find(patient => patient.id === id) as Patient;
    if(patientFromData.entries === undefined){
        patientFromData.entries = [];
    }
    return patientFromData;
};

export default {getEntries, addPatient, getPatientById};