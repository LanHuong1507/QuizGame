import React from 'react';

interface AnswerButtonProps {
  optionText: string;
  onClick: () => void;
}

const AnswerButton: React.FC<AnswerButtonProps> = ({ optionText, onClick }) => {
  return (
    <button onClick={onClick}>
      {optionText}
    </button>
  );
};

export default AnswerButton;
