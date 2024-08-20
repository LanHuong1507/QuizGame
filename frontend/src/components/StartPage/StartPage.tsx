import React, { useEffect, useState } from 'react';
import { getCategories } from '../../services/ApiService';
import { CategoryData } from '../../services/types';
import './StartPage.css';

interface StartPageProps {
  onStartGame: (categoryId: number, userName: string) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStartGame }) => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(event.target.value));
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleStartGame = () => {
    if (selectedCategory !== null && userName.trim() !== '') {
      onStartGame(selectedCategory, userName);
    }
  };

  return (
    <div className="start-page">
      <h1>Welcome to the Quiz Game!</h1>
      <p>Select a category and enter your name to start the game.</p>
      <div className="controls">
        <div className="user-name-input">
          <label htmlFor="user-name">Your Name:</label>
          <input
            id="user-name"
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="category-selection">
          <label htmlFor="category-select">Choose a category:</label>
          <select
            id="category-select"
            value={selectedCategory || ''}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="start-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default StartPage;
