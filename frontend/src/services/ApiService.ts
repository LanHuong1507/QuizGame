import { QuestionData } from '../services/types';
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/questions'; // Replace with your backend API URL

export const fetchQuestions = async (): Promise<QuestionData[]> => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data as QuestionData[];
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error; // Rethrow or handle the error as per your application's needs
    }
};
