export default function CategoryHeader({ category, productCount }) {
  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-b border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] tracking-tight">
            {category ? category.name : 'Category'}
          </h1>
          {category?.description && (
            <p className="text-gray-500 mt-2 max-w-2xl text-base">{category.description}</p>
          )}
        </div>
        <p className="text-sm text-gray-500 font-medium sm:mt-2">
          Showing {productCount} {productCount === 1 ? 'product' : 'products'}
        </p>
      </div>
    </div>
  );
}
