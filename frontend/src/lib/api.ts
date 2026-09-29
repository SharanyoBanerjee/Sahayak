import { Commodity, Material, RecommendResponse, FoodFormState } from './types';

const API_BASE = '/api';

export async function checkHealth(): Promise<{ status: string }> {
  try {
    const res = await fetch(`${API_BASE}/health/`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('API health check error:', err);
    return { status: 'offline' };
  }
}

export async function fetchCommodities(): Promise<Commodity[]> {
  try {
    const res = await fetch(`${API_BASE}/commodities/`);
    if (!res.ok) throw new Error('Failed to fetch commodities');
    return await res.json();
  } catch (err) {
    console.warn('Using offline fallback commodities:', err);
    return [];
  }
}

export async function fetchMaterials(): Promise<Material[]> {
  try {
    const res = await fetch(`${API_BASE}/materials/`);
    if (!res.ok) throw new Error('Failed to fetch materials');
    return await res.json();
  } catch (err) {
    console.warn('Using offline fallback materials:', err);
    return [];
  }
}

export async function getRecommendations(formState: FoodFormState): Promise<RecommendResponse> {
  const res = await fetch(`${API_BASE}/recommend/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formState),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || errorBody.message || 'Failed to calculate packaging recommendations');
  }

  return await res.json();
}
