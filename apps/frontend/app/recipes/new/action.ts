import { CreateRecipeInput } from '../../../types/recipe';
import { redirect } from 'next/navigation';
import { createRecipe } from '../../../lib/api';
export async function handleSubmit( data:CreateRecipeInput) {
    'use server';
    
    const recipe = await createRecipe(data);
    redirect(`/recipes/${recipe.id}`);
  }