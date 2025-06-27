
import Link from 'next/link';
import { getRecipes } from '../../lib/api';
import { RC } from '../../components/RC';
import { RecipeSearch } from '../../components/RecipeSearch';
import { Pagination } from '../../components/Pagination';

interface RecipesPageProps {
  searchParams: {
    page?: string;
    search?: string;
    category?: string;
    area?: string;
  };
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  const area = searchParams.area || '';
  const limit = 9;
  
  const { recipes, total } = await getRecipes({ page, limit, search, category, area });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <div className="flex gap-2">
          <Link href="/recipes/starred" className="btn btn-secondary">
            Starred Recipes
          </Link>
          <Link href="/recipes/new" className="btn btn-primary">
            Add New Recipe
          </Link>
        </div>
      </div>

      <RecipeSearch/>

      {recipes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RC key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <Pagination total={total} limit={limit} page={page} />
        </>
      ) : (
        <div className="text-center text-gray-600">No recipes found</div>
      )}
    </div>
  );
} 