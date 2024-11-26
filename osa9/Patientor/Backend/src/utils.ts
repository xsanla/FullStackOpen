import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (string: unknown): string => {
    if(!isString(string)) {
        throw new Error('Incorrect values in object fields, values should be string');
    }
    return string;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(val => val.toString()).includes(param);
};

const parseGender = ( gender: unknown): Gender => {
    if(!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};


export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if( !object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation)
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};