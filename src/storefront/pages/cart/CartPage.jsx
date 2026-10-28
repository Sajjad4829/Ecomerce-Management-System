import { formatCurrency } from '../../utils/formatCurrency';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart, FiChevronDown } from 'react-icons/fi';
import { useCommerce } from '../../context/CommerceContext';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';

export default function CartPage() {
  const { cartItems, cartSubtotal, cartTotalItems, updateQuantity, removeFromCart } = useCommerce();
  const { activeTheme } = useStorefrontTheme();

  return (
    <div className={`min-h-[70vh] pb-16 pt-6 ${activeTheme.tokens.background}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-[13px] text-gray-500 mb-6 flex gap-2">
          <Link to="/" className="hover:text-[#ED1C24]">Home</Link>
          <span>&gt;</span>
          <span className="text-[#ED1C24]">Cart</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <div className="bg-[#f5f5f5] px-4 py-3 text-[15px] text-gray-700 mb-4">
              You have ({cartTotalItems}) items in your cart
            </div>

            <div className="flex flex-col gap-4">
              {cartItems.map(item => {
                const { product, selectedVariants, variantImage, quantity, unitPrice } = item;
                const imageUrl = variantImage || product?.gallery?.[0] || product?.image || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400';
                
                return (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-4 border border-gray-200 relative bg-white">
                    {/* Image */}
                    <div className="w-full sm:w-40 h-40 shrink-0 bg-gray-50">
                      <img src={imageUrl} alt={product?.name} className="w-full h-full object-contain" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col relative">
                      <Link to={`/product/${product?.slug || product?.id}`} className="text-[15px] font-bold text-[#1A1A1A] hover:text-[#ED1C24] transition-colors leading-tight mb-2 pr-10">
                        {product?.name || 'Premium Product'}
                      </Link>
                      
                      {(() => {
                        const variantParts = [];
                        if (product?.material) variantParts.push(`Material: ${product.material}`);
                        if (selectedVariants && Object.keys(selectedVariants).length > 0) {
                          Object.entries(selectedVariants).forEach(([type, option]) => {
                            variantParts.push(`${type.charAt(0).toUpperCase() + type.slice(1)}: ${option?.name}`);
                          });
                        }
                        
                        return variantParts.length > 0 ? (
                          <p className="text-[13px] text-gray-500 mb-3 leading-relaxed">
                            {variantParts.join(' | ')}
                          </p>
                        ) : null;
                      })()}

                      <p className="text-[15px] font-bold text-[#1A1A1A] mb-4">
                        Total: {formatCurrency(unitPrice * quantity)}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-200 h-9 w-28 bg-white">
                          <button 
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            disabled={quantity <= 1}
                            className="text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-colors w-9 h-full flex justify-center items-center"
                          >
                            <FiMinus size={12} />
                          </button>
                          <span className="flex-1 text-[13px] font-medium text-gray-800 text-center">{quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            disabled={quantity >= (product?.stock || 99)}
                            className="text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-colors w-9 h-full flex justify-center items-center"
                          >
                            <FiPlus size={12} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Delete Button (Far Right) */}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center bg-red-50 text-[#ED1C24] border border-red-100 hover:bg-[#ED1C24] hover:text-white transition-colors"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (Order Summary) */}
          <div className="lg:col-span-4">
            <div className="border border-gray-100 bg-white">
              <div className="bg-[#f7f7f7] px-4 py-3 border-b border-gray-100">
                <h3 className="text-[15px] font-medium text-gray-700">Order Summary</h3>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center text-[14px] text-gray-600 mb-4">
                  <span>Sub Total</span>
                  <span>{formatCurrency(cartSubtotal)}</span>
                </div>
                
                <div className="border-t border-dashed border-gray-200 pt-5 mb-5">
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Enter Coupon code" 
                      className="flex-1 h-[38px] border border-gray-200 px-3 text-[13px] outline-none focus:border-gray-300"
                    />
                    <button className="h-[38px] px-6 bg-[#999999] text-white text-[13px] font-medium hover:bg-[#888888] transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[14px] text-gray-800 font-bold mb-6">
                  <span>Total</span>
                  <span>{formatCurrency(cartSubtotal)}</span>
                </div>

                <div className="bg-[#f7f7f7] p-4 mb-6 border border-gray-100">
                  <p className="text-[14px] text-gray-600 mb-4">Select Location To EST. Delivery Time</p>
                  <div className="space-y-3">
                    <div className="relative">
                      <select className="w-full h-[38px] bg-white border border-gray-200 px-3 text-[13px] text-gray-500 appearance-none outline-none focus:border-gray-300">
                        <option>Select District</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-3 text-gray-400" size={14} />
                    </div>
                    <div className="relative">
                      <select className="w-full h-[38px] bg-white border border-gray-200 px-3 text-[13px] text-gray-500 appearance-none outline-none focus:border-gray-300">
                        <option>Select Area</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-3 text-gray-400" size={14} />
                    </div>
                    <div className="relative">
                      <select className="w-full h-[38px] bg-white border border-gray-200 px-3 text-[13px] text-gray-500 appearance-none outline-none focus:border-gray-300">
                        <option>Select Dealer</option>
                      </select>
                      <FiChevronDown className="absolute right-3 top-3 text-gray-400" size={14} />
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="w-full h-10 border border-gray-300 text-gray-600 text-[13px] font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mb-4">
                  Checkout <FiShoppingCart size={15} />
                </Link>
                
                <div className="text-center text-[12px] text-gray-400 mb-3">Or</div>
                
                <div className="text-center">
                  <Link to="/shop" className="text-[13px] text-[#ED1C24] font-medium hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
