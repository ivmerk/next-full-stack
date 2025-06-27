import { Recipe, CreateRecipeInput, UpdateRecipeInput } from '../types/recipe';

export interface PaginatedRecipes {
  recipes: Recipe[];
  total: number;
  page: number;
  limit: number;
}
class RecipeService {
  private recipes: Recipe[] = [];

  constructor() {
    this.seedRecipes().catch(console.error);
  }

  async getAllRecipes(page = 1, limit = 10, search?: string, category?: string, area?: string): Promise<PaginatedRecipes> {
    let filteredRecipes = this.recipes;

    if(search){
      const lowerCaseSearch = search.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(lowerCaseSearch) || (recipe.description || '').toLowerCase().includes(lowerCaseSearch));
    }
    if(category){
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
    }
    if(area){
      filteredRecipes = filteredRecipes.filter(recipe => recipe.area === area);
    }
    const total = filteredRecipes.length;
    const  pagedRecipes = filteredRecipes.slice((page - 1) * limit, page * limit);
    return { recipes: pagedRecipes, total, page, limit };
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    return this.recipes.find(recipe => recipe.id === id) || null;
  }

  async createRecipe(input: CreateRecipeInput): Promise<Recipe> {
    const now = new Date().toISOString();
    const recipe: Recipe = {
      ...input,
      ingredients: input.ingredients || [],
      id: Math.random().toString(36).substring(2, 9),
      isStarred: false,
      createdAt: now,
      updatedAt: now,
    };
    this.recipes.unshift(recipe);
    return recipe;
  }

  async updateRecipe(id: string, input: UpdateRecipeInput): Promise<Recipe | null> {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return null;

    const existingRecipe = this.recipes[index];
    const updatedRecipe: Recipe = {
      ...existingRecipe,
      ...input,
      ingredients: input.ingredients ?? existingRecipe.ingredients, 
      updatedAt: new Date().toISOString(),
    };
    this.recipes[index] = updatedRecipe;
    return updatedRecipe;
  }

  async deleteRecipe(id: string): Promise<boolean> {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return false;

    this.recipes.splice(index, 1);
    return true;
  }

  async seedRecipes(): Promise<void> {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json() as { meals: any[] };
      
      if (data.meals) {
        const recipes = data.meals.slice(0, 30).map((meal: any) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          description: meal.strInstructions?.substring(0, 200) || '',
          category: meal.strCategory,
          area: meal.strArea,
          tags: meal.strTags,
          ingredients: Object.entries(meal)
            .filter(([key, value]) => key.startsWith('strIngredient') && value)
            .map(([_, value]) => value as string),
          instructions: meal.strInstructions || '',
          isStarred: Math.random() > 0.8,
          image: meal.strMealThumb,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } ));
        
        this.recipes.push(...recipes);
      }
    } catch (error) {
      console.error('Failed to seed recipes on startup:', error);
    }
  }

  async toggleStar(id: string): Promise<Recipe | null> {
    const index = this.recipes.findIndex((recipe) => recipe.id === id);
    if (index === -1) return null;

    const recipe = this.recipes[index];
    recipe.isStarred = !recipe.isStarred;
    recipe.updatedAt = new Date().toISOString();
    
    return recipe;
  }

  async getStarredRecipes(): Promise<Recipe[]> {
    return this.recipes.filter((recipe) => recipe.isStarred);
  }
}

export const recipeService = new RecipeService(); 