import React, { useEffect, useState } from 'react';
import { getCategories, getLevels } from '../../services/ApiService';
import { CategoryData } from '../../services/types';
import './StartPage.css';

interface StartPageProps {
  onStartGame: (categoryId: number, level: string, userName: string) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStartGame }) => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoriesAndLevels = async () => {
      try {
        const [categoriesData, levelsData] = await Promise.all([getCategories(), getLevels()]);
        setCategories(categoriesData);
        setLevels(levelsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load categories and levels.');
      }
    };

    fetchCategoriesAndLevels();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(Number(event.target.value));
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(event.target.value);
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleStartGame = () => {
    if (selectedCategory === null) {
      setError('Please select a category.');
      return;
    }

    if (userName.trim() === '') {
      setError('Please enter your name.');
      return;
    }

    const level = selectedLevel || levels[Math.floor(Math.random() * levels.length)];
    onStartGame(selectedCategory, level, userName);
  };

  return (
    <div className="start-page">
      <h1>Welcome to the Quiz Game!</h1>
      <p>Select a category, level, and enter your name to start the game.</p>
      {error && <p className="error-message">{error}</p>}
      <div className="controls">
        <div className="row">
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
        </div>
        <div className="row">
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
          <div className="level-selection">
            <label htmlFor="level-select">Choose a level:</label>
            <select
              id="level-select"
              value={selectedLevel || ''}
              onChange={handleLevelChange}
            >
              <option value="" disabled>Select a level</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button className="start-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default StartPage;
