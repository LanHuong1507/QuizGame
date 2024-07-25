export interface QuestionData {
    id: number;
    questionText: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: OptionKey;
    point: number;

}
export type OptionKey = 'optionA' | 'optionB' | 'optionC' | 'optionD';
