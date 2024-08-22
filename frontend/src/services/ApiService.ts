import axios from 'axios';
import { CategoryData, QuestionData } from './types';

// Base URL for API endpoints
const BASE_URL = 'http://localhost:8080/api';

// Fetch categories
export const getCategories = async (): Promise<CategoryData[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Fetch questions by category ID and level
export const fetchQuestions = async (categoryId: number, level: string): Promise<QuestionData[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/questions/by-category-and-level`, {
            params: {
                categoryId: categoryId,
                level: level
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
};

// Save score for a user
export const saveScore = async (username: string, categoryId: number, score: number) => {
    try {
        const response = await axios.post(`${BASE_URL}/saveScore`, {
            username,
            categoryId,
            score
        });
        return response.data;
    } catch (error) {
        console.error('Error saving score:', error);
        throw error;
    }
};

// Fetch levels
export const getLevels = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/levels`);
        return response.data;
    } catch (error) {
        console.error('Error fetching levels:', error);
        throw error;
    }
};
