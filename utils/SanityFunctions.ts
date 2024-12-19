export type Categories = {
    title: string;
    subcategories: string[];
}[]

export async function fetchSanityCategories() {
    try {
      const response = await fetch(`${process.env.SANITY_API_URL}/api/sanity/categories`, { next: { revalidate: 3600 } });
      if (!response.ok) throw new Error('Failed to fetch categories');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  