export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  area: string;
  tags?: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  isStarred?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateRecipeInput = Omit<Recipe, 'id' | 'createdAt' | 'updatedAt' | 'isStarred'>;

export type UpdateRecipeInput = Partial<CreateRecipeInput>; 