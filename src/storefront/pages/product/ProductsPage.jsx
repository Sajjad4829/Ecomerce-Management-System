import ProductCard from '../../components/product/ProductCard';

const MOCK_PRODUCTS = [
  { id: 'p_1', name: 'Milo Lounge Chair', price: 899.00, category: 'Seating', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600' },
  { id: 'p_2', name: 'Odin Dining Table', price: 1499.00, category: 'Tables', image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=600' },
  { id: 'p_3', name: 'Neva Sofa (Velvet)', price: 2100.00, category: 'Seating', image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=600' },
  { id: 'p_4', name: 'Lucent Table Lamp', price: 249.00, category: 'Lighting', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600' },
];

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen py-16 md:py-24 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#1A1A1A]">All Products</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">Discover our curated collection of premium furniture designed for the modern home.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {MOCK_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
