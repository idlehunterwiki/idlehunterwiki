import { CategoryTile } from "@/components/home/CategoryTile";
import { getFeaturedCategories } from "@/lib/categories";

export function HomeFeaturedCategories() {
  const categories = getFeaturedCategories();

  return (
    <section aria-labelledby="home-categories-heading">
      <h2 id="home-categories-heading" className="game-section-title mb-4">
        Categories
      </h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <CategoryTile key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
