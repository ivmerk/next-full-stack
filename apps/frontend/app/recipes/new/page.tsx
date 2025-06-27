import { getAreas, getCategories } from '../../../lib/api';
import { RecipeForm } from '../../../components/RecipeForm';
import { PageHeader } from '../../../components/PageHeader';
import { handleSubmit } from './action';
export default async function NewRecipePage() {
    const [categories, areas] = await Promise.all([
      getCategories(),
      getAreas(),
    ]);
  

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