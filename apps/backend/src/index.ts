import express, { Request, Response } from 'express';
import cors from 'cors';
import { recipeService } from './services/recipeService';
import { CreateRecipeInput, UpdateRecipeInput } from './types/recipe';
import { getCategories, getAreas, getRandomRecipe } from './services/mealDbService';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get random recipe 
app.get('/api/recipes/random', async (_req: Request, res: Response) => {
  try {
    const recipes = await getRandomRecipe();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Get starred recipes
app.get('/api/recipes/starred', async (_req: Request, res: Response) => {
  try {
    const recipes = await recipeService.getStarredRecipes();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching starred recipes:', error);
    res.status(500).json({ error: 'Failed to fetch starred recipes' });
  }
});

app.get('/api/recipes/:id', async (req: Request, res: Response) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});
// Get all recipes with pagination and filtering
app.get('/api/recipes', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;
    const category = req.query.category as string | undefined;
    const area = req.query.area as string | undefined;
    const recipes = await recipeService.getAllRecipes(page, limit, search, category, area);
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.post('/api/recipes', async (req: Request, res: Response) => {
  try {
    const input = req.body as CreateRecipeInput;
    const recipe = await recipeService.createRecipe(input);
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

app.put('/api/recipes/:id', async (req: Request, res: Response) => {
  try {
    const input = req.body as UpdateRecipeInput;
    const recipe = await recipeService.updateRecipe(req.params.id, input);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

app.delete('/api/recipes/:id', async (req: Request, res: Response) => {
  try {
    const success = await recipeService.deleteRecipe(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// Get recipe categories
app.get('/api/categories', async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get recipe areas
app.get('/api/areas', async (req: Request, res: Response) => {
  try {
    const areas = await getAreas();
    res.json(areas);
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({ error: 'Failed to fetch areas' });
  }
});



// Toggle star status
app.post('/api/recipes/:id/toggle-star', async (req: Request, res: Response) => {
  try {
    const recipe = await recipeService.toggleStar(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error toggling star status:', error);
    res.status(500).json({ error: 'Failed to toggle star status' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 