import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_WISHLIST = [
  { id: '1', product: 'Minimalist Dining Table', variant: 'Oak / 6-Seater', price: '$2,400.00', available: true, added: '2026-08-01' },
  { id: '2', product: 'Geometric Wool Rug', variant: 'Large (8x10)', price: '$850.00', available: false, added: '2026-07-28' },
];

export default function CustomerWishlist() {
  return (
    <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-black/5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
          <FiHeart className="text-gray-400" /> Wishlist
        </h3>
        <span className="text-xs text-gray-500 font-medium">2 Items</span>
      </div>

      <div className="divide-y divide-black/5">
        {MOCK_WISHLIST.map(item => (
          <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <FiShoppingCart className="text-gray-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1A1A1A]">
                  <Link to={`/admin/catalog/products/${item.id}`} className="hover:underline">{item.product}</Link>
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">{item.variant}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-sm font-medium text-[#1A1A1A]">{item.price}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Added</p>
              <p className="text-sm text-gray-600 font-medium">{item.added}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
