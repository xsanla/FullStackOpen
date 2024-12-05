import axios from 'axios';
import { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry} from './types';

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
    return axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const addNewDiary = (newDiary: NewDiaryEntry) => {
    return axios
    .post<DiaryEntry>(baseUrl, newDiary)
    .then(response => response.data)
}