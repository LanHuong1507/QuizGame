import axios from 'axios';
import { CategoryData, QuestionData } from './types';

const BASE_URL = 'http://localhost:8080/api';
export const getCategories = async (): Promise<CategoryData[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; // Rethrow or handle the error as per your application's needs
    }
};

// Fetch questions by category ID
export const fetchQuestions = async (categoryId: number): Promise<QuestionData[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/questions/category/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };