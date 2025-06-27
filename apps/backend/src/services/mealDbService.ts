import axios from 'axios';
import { Recipe } from '../types/recipe';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface Category {
  strCategory: string;
}

export interface Area {
  strArea: string;
}

export interface CategoriesResponse {
  meals: Category[];
}

export interface AreasResponse {
  meals: Area[];
}

export interface RandomMealResponse {
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strInstructions: string;
    strCategory: string;
    strArea: string;
    strTags: string;
    strMealThumb: string;
    [key: string]: string | null;
  }>;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await axios.get<CategoriesResponse>(`${BASE_URL}/list.php?c=list`);
    return response.data.meals;
  } catch (error) {
    console.error('Error fetching categories from TheMealDB:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getAreas(): Promise<Area[]> {
  try {
    const response = await axios.get<AreasResponse>(`${BASE_URL}/list.php?a=list`);
    return response.data.meals;
  } catch (error) {
    console.error('Error fetching areas from TheMealDB:', error);
    throw new Error('Failed to fetch areas');
  }
}

export async function getRandomRecipe(): Promise<Recipe> {
  try {
    const response = await axios.get<RandomMealResponse>(`${BASE_URL}/random.php`);
    const meal = response.data.meals[0];
    
    // Extract ingredients (they come as strIngredient1, strIngredient2, etc.)
    const ingredients = Object.entries(meal)
      .filter(([key, value]) => key.startsWith('strIngredient') && value)
      .map(([_, value]) => value as string);
    return {
      id: meal.idMeal,
      name: meal.strMeal,
      description: meal.strInstructions?.substring(0, 200) || '',
      category: meal.strCategory,
      area: meal.strArea,
      tags: meal.strTags || undefined,
      ingredients,
      instructions: meal.strInstructions || '',
      image: meal.strMealThumb,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching random recipe from TheMealDB:', error);
    throw new Error('Failed to fetch random recipe');
  }
} 