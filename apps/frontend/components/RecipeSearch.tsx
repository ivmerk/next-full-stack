'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCategories, getAreas } from '../lib/api';
import { Category, Area } from '../types/recipe';


export function RecipeSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [area, setArea] = useState(searchParams.get('area') || '');

  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesResponse, areasResponse] = await Promise.all([getCategories(), getAreas()]);
        setCategories(categoriesResponse);
        setAreas(areasResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

 useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset page on filter change
  
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    if (area) {
      params.set('area', area);
    } else {
      params.delete('area');
    }
    router.push(`/recipes?${params.toString()}`);
  }, [category, area, router]); 

  const handleSearch = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    router.push(`/recipes?${params.toString()}`);
  };

  const handleReset = () => {
    setSearchQuery('');
    setCategory('');
    setArea('');
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow space-y-4">
      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input flex-1"
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary"
        >
          Search
        </button>
        </form>
      <div className="flex gap-4 flex-wrap">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
          disabled={isLoading}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.strCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="input"
          disabled={isLoading}
        >
          <option value="">All Areas</option>
          {areas.map((area) => (
            <option key={area.strArea} value={area.strArea}>
              {area.strArea}
            </option>
          ))}
        </select>

        <button
          type='button'
          onClick={handleReset}
          className="btn btn-secondary"
        >
          Reset
        </button>
      </div>
    </div>
  );
} 