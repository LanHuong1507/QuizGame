// src/services/types.ts
export interface CategoryData {
    id: number;
    name: string;
  }
  
  export interface QuestionData {
    id: number;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    point: number;
  }
  
  export type OptionKey = 'optionA' | 'optionB' | 'optionC' | 'optionD';
  