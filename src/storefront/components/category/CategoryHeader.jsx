export default function CategoryHeader({ category, productCount }) {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tight">
          {category ? category.name : 'Category'}
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Showing {productCount} {productCount === 1 ? 'product' : 'products'}
        </p>
      </div>
    </div>
  );
}
