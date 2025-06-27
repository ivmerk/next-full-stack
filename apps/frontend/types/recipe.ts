export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  category?: string;
  area?: string;
  tags?: string;
  isStarred?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateRecipeInput = Omit<Recipe, 'id'| 'createdAt' | 'updatedAt' | 'isStarred'>;

export type UpdateRecipeInput = Partial<CreateRecipeInput>; 

export interface Category {
  strCategory: string;
}

export interface Area {
  strArea: string;
}
