import React from 'react';

interface QuestionProps {
  questionText: string;
}

const Question: React.FC<QuestionProps> = ({ questionText }) => {
  return (
    <div>
      <h2>{questionText}</h2>
    </div>
  );
};

export default Question;
