// types.ts

// Define an enum for option keys if necessary
export type OptionKey = 'optionA' | 'optionB' | 'optionC' | 'optionD';

// Define the structure for a question
export interface QuestionData {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  point: number;
  level: string; // Level of question difficulty or type
}

// Define the structure for category data
export interface CategoryData {
  id: number;
  name: string;
  level: string; // Optional: Include level if categories are distinguished by level
}

// Define the structure for answer status
export interface AnswerStatus {
  selectedAnswer: string | null;
  isCorrect: boolean | null;
}

// Define the structure for saving score request
export interface SaveScoreRequest {
  userName: string;
  categoryId: number;
  level: string; // Level added to track the difficulty of the quiz
  score: number;
}
