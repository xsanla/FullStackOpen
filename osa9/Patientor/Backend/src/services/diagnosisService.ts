import data from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = data;
const getEntries = ():DiagnoseEntry[] => {
    return diagnoses;
};

export default getEntries;