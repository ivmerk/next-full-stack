import Link from 'next/link';
import { getRecipe, deleteRecipe } from '../../../lib/api';
import { notFound, redirect } from 'next/navigation';
import { PageHeader } from '../../../components/PageHeader';
import { StarButton } from '../../../components/StarButton';

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipeDetailsPage({ params }: RecipePageProps) {
  const recipe = await getRecipe(params.id);
  
  if (!recipe) {
    notFound();
  }

  async function handleDelete() {
    'use server';
    await deleteRecipe(params.id);

    redirect('/recipes');
  }

  return (
    <div className="container mx-auto p-4">
      <PageHeader title={recipe.name} extraButtons={
        <div className="flex gap-2">
          <StarButton recipe={recipe} />
          <Link href={`/recipes/${recipe.id}/edit`} className="btn btn-secondary">
            Edit
          </Link>
          <form action={handleDelete}><button type="submit" className="btn btn-error">Delete</button></form>
        </div>
      }  />

      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {recipe.prepTime && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Prep Time</h3>
            <p>{recipe.prepTime} minutes</p>
          </div>
        )}
        {recipe.cookTime && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Cook Time</h3>
            <p>{recipe.cookTime} minutes</p>
          </div>
        )}
        {recipe.servings && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold">Servings</h3>
            <p>{recipe.servings}</p>
          </div>
        )}
      </div>

      {recipe.description && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-600">{recipe.description}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            {(recipe.ingredients || []).map((ingredient, index) => (
              <li key={index} className="text-gray-600">{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <p className="whitespace-pre-line text-gray-600">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
} 