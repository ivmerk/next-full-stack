'use client';

import { useState, useEffect } from 'react';
import { getStarredRecipes } from '../../../lib/api';
import { RC } from '../../../components/RC';
import { Recipe } from '../../../types/recipe';
import { PageHeader } from '../../../components/PageHeader';

export default function StarredRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await getStarredRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Failed to load starred recipes:', error);
      } 
    };

    loadRecipes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="Starred Recipes" />
      
      {!isLoading ? (
        <div className="text-center">Loading...</div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <RC key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No starred recipes yet</div>
      )}
    </div>
  );
} 