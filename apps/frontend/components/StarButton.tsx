'use client';

import { useState } from 'react';
import { Recipe } from '../types/recipe';
import { toggleStar } from '../lib/api';

interface StarButtonProps {
  recipe: Recipe;
}

export function StarButton({ recipe: initialRecipe }: StarButtonProps) {
  const [isStarred, setIsStarred] = useState(initialRecipe.isStarred);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const updated = await toggleStar(initialRecipe.id);
      setIsStarred(updated.isStarred);
    } catch (error) {
      console.error('Failed to toggle star', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`btn btn-secondary text-2xl p-2 ${isStarred ? 'text-yellow-400' : 'text-gray-400'}`}
      aria-label={isStarred ? 'Unstar recipe' : 'Star recipe'}
    >
      {isStarred ? '★' : '☆'}
    </button>
  );
}