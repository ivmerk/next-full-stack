'use client';
import { useState } from 'react';
import { Recipe, CreateRecipeInput, Category, Area, UpdateRecipeInput } from '../types/recipe';
import { getRandomRecipe } from '../lib/api';

interface RecipeFormProps {
  initialData?: Partial<Recipe>;
  onSubmit: (data: CreateRecipeInput | UpdateRecipeInput) => Promise<void>;
  categories?: Category[];
  areas?: Area[];
  submitLabel: string;


}

export function RecipeForm({ initialData, onSubmit, categories, areas, submitLabel }: RecipeFormProps) {

  const [formData, setFormData] = useState<Partial<CreateRecipeInput>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    ingredients: initialData?.ingredients?.length ? initialData?.ingredients : [''],
    instructions: initialData?.instructions || '',
    category: initialData?.category || '',
    area: initialData?.area || '',
    prepTime: initialData?.prepTime,
    image: initialData?.image || '',
    cookTime: initialData?.cookTime,
    servings: initialData?.servings,
  });

const handleSubmit = async () => {
    await onSubmit(formData);
  };
  const handleRandomize = async () => {
    try {
      const randomRecipe = await getRandomRecipe();
      setFormData({
        name: randomRecipe.name,
        ingredients: randomRecipe.ingredients,
        instructions: randomRecipe.instructions,
        image: randomRecipe.image || '',
        category: randomRecipe.category,
        area: randomRecipe.area,
      });
    } catch (error) {
      console.error('Failed to fetch random recipe:', error);
    }
  };

  const addItem = (field: 'ingredients') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), ''],
    }));
  };

  const updateItem = (field: 'ingredients', index: number, value: string) => {
    setFormData(prev => {
      const items = [...(prev[field] || [])];
      items[index] = value;
      return { ...prev, [field]: items };
    });
  };

  const removeItem = (field: 'ingredients', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recipe Details</h2>
        {!initialData?.id && (
          <button
            type="button"
            onClick={handleRandomize}
            className="btn btn-secondary"
          >
          Get Random Recipe
          </button>
        )}
      </div>

      <div>
        <label htmlFor="name" className="label">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name || ''}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="input"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="label">Description</label>
        <textarea
          id="description"
          value={formData.description || ''}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="input"
          rows={3}
        />
      </div>

      <div>
        <label className="label">Ingredients</label>
        {formData.ingredients?.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={ingredient}
              onChange={e => updateItem('ingredients', index, e.target.value)}
              className="input"
            />
            <button
              type="button"
              onClick={() => removeItem('ingredients', index)}
              className="btn btn-secondary"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addItem('ingredients')}
          className="btn btn-secondary"
        >
          Add Ingredient
        </button>
      </div>

      <div>
        <label htmlFor="instructions" className="label">Instructions</label>
        <textarea
          id="instructions"
          value={formData.instructions || ''}
          onChange={e => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
          className="input"
          rows={6}
          required
        />
      </div>

      <div>
        <label htmlFor="image" className="label">Image URL</label>
        <input
          type="url"
          id="image"
          value={formData.image || ''}
          onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
          className="input"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="prepTime" className="label">Prep Time (minutes)</label>
          <input
            type="number"
            id="prepTime"
            value={formData.prepTime || ''}
            onChange={e => setFormData(prev => ({ ...prev, prepTime: Number(e.target.value) }))}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="cookTime" className="label">Cook Time (minutes)</label>
          <input
            type="number"
            id="cookTime"
            value={formData.cookTime || ''}
            onChange={e => setFormData(prev => ({ ...prev, cookTime: Number(e.target.value) }))}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="servings" className="label">Servings</label>
          <input
            type="number"
            id="servings"
            value={formData.servings || ''}
            onChange={e => setFormData(prev => ({ ...prev, servings: Number(e.target.value) }))}
            className="input"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="label">Category</label>
          <select id="category" value={formData.category} onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))} className="input">
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.strCategory} value={c.strCategory}>{c.strCategory}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="area" className="label">Area</label>
          <select id="area" value={formData.area} onChange={e => setFormData(prev => ({ ...prev, area: e.target.value }))} className="input">
            <option value="">Select Area</option>
            {areas.map(a => <option key={a.strArea} value={a.strArea}>{a.strArea}</option>)}
          </select>
        </div>
      </div>

  <button type='submit'  className="btn btn-primary w-full">
      {submitLabel}
    </button>
    </form>
  );
} 