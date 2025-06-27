import { Recipe, CreateRecipeInput, UpdateRecipeInput, Category, Area } from '../types/recipe';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getRecipes(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  area?: string;
}): Promise<{ recipes: Recipe[]; total: number; page: number; limit: number; }> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', params.page.toString());
  if (params?.limit) query.set('limit', params.limit.toString());
  if (params?.search) query.set('search', params.search);
  if (params?.category) query.set('category', params.category);
  if (params?.area) query.set('area', params.area);

  const res = await fetch(`${API_URL}/recipes?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  return res.json();
}

export async function getRecipe(id: string): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch recipe');
  return res.json();
}

export async function createRecipe(data: CreateRecipeInput): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create recipe');
  return res.json();
}

export async function updateRecipe(id: string, data: UpdateRecipeInput): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update recipe');
  return res.json();
}

export async function deleteRecipe(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete recipe');
}

export async function getRandomRecipe(): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes/random`);
  if (!res.ok) throw new Error('Failed to fetch random recipe');
  return res.json();
}

export async function getStarredRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${API_URL}/recipes/starred`);
  if (!res.ok) throw new Error('Failed to fetch starred recipes');
  return res.json();
}

export async function toggleStar(id: string): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes/${id}/toggle-star/`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to toggle star status');
  return res.json();
} 
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}


export async function getAreas(): Promise<Area[]> {
  const res = await fetch(`${API_URL}/areas`);
  if (!res.ok) throw new Error('Failed to fetch areas');
  return res.json();
}