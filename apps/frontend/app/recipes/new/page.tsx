import { getAreas, getCategories } from '../../../lib/api';
import { RecipeForm } from '../../../components/RecipeForm';
import { PageHeader } from '../../../components/PageHeader';
import { handleSubmit } from './action';
export default async function NewRecipePage() {
  let categories = [];
  let areas = [];
  try {
    [categories, areas] = await Promise.all([
      getCategories(),
      getAreas(),
    ]);
  } catch (err) {
    console.error('Failed to fetch categories or areas', err);
    // optionally: show error UI or fallback to empty list
  }
  

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="New Recipe" />
        <RecipeForm  
          onSubmit={handleSubmit}
          categories={categories}
          areas={areas}
          submitLabel="Create Recipe" 
        />
    </div>
  );
} 