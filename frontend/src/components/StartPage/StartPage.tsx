// src/components/StartPage/StartPage.tsx
import React, { useEffect, useState } from 'react';
import { getCategories } from '../../services/ApiService';
import { CategoryData } from '../../services/types';
import './StartPage.css';

interface StartPageProps {
  onStartGame: (categoryId: number) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStartGame }) => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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

  const handleStartGame = () => {
    if (selectedCategory !== null) {
      onStartGame(selectedCategory); // Call the passed prop function
    }
  };

  return (
    <div className="start-page">
      <h1>Welcome to the Quiz Game!</h1>
      <p>Select a category and click the button below to start the game.</p>
      <div className="category-selection">
        <label htmlFor="category-select">Choose a category:</label>
        <select
          id="category-select"
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button className="start-button" onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default StartPage;
