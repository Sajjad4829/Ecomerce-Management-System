import { useCommerce } from '../../context/CommerceContext';
import WishlistButton from '../wishlist/WishlistButton';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useReviews } from '../../../admin/context/ReviewContext';
import { useStorefrontTheme } from '../../context/StorefrontThemeContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCommerce();
  const { getProductRating } = useReviews();
  const { activeTheme, productPageLayout = 'top' } = useStorefrontTheme();
  const navigate = useNavigate();
  const price = product.price;
  const ratingData = getProductRating(product.id);
  
  // Calculate EMI mock logic
  const emi = Math.round(price / 12); 
  const formattedPrice = new Intl.NumberFormat('en-US').format(price);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (product.variants && product.variants.length > 0) {
      navigate(`/product/${product.slug}`);
    } else {
      addToCart(product, null, 1);
    }
  };

  const imageSrc = product.image || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=400';

  const renderMobileLayout = (forceMobile = false) => (
    <div className={`bg-white border border-gray-200 p-0 hover:shadow-md transition-shadow h-full flex-col relative ${forceMobile ? 'flex' : 'flex md:hidden'}`}>
      <Link to={`/product/${product.slug}`} className={`w-full aspect-square shrink-0 overflow-hidden group`}>
        <img src={imageSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </Link>
      
      <div className="flex flex-col items-center justify-start p-4 text-center flex-1">
        <Link to={`/product/${product.slug}`}>
          <h4 className="text-[17px] sm:text-[18px] text-[#1c2b39] mb-3 leading-tight hover:underline line-clamp-2">{product.name}</h4>
        </Link>
        
        <div className="flex flex-col items-center gap-1 w-full">
          <span className="text-[#334155] text-[12px] sm:text-[13px]">Starts from</span>
          <span className="text-[#1c2b39] text-[15px]">{formattedPrice} BDT</span>
          <span className="bg-[#ed1c24] text-white text-[12px] px-2 py-1 mt-0.5 whitespace-nowrap">
            EMI {emi} BDT
          </span>
        </div>
      </div>
    </div>
  );

  if (productPageLayout === 'full') {
    return (
      <>
        <div className="hidden md:flex bg-white border-b border-stone-100 overflow-hidden pb-5 hover:shadow-md transition-shadow h-full flex-col">
          <Link to={`/product/${product.slug}`} className="block w-full aspect-[4/3] sm:aspect-square md:aspect-[4/3] lg:aspect-square bg-stone-50 shrink-0 relative overflow-hidden group">
            <img src={imageSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </Link>
          <div className="flex flex-col items-center justify-center pt-5 px-4 text-center flex-1">
            <Link to={`/product/${product.slug}`}>
              <h4 className="font-bold text-[16px] sm:text-[18px] text-[#0f172a] leading-tight hover:underline line-clamp-1">{product.name}</h4>
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2">
              <span className="text-stone-500 text-[13px] sm:text-[14px]">Starts from</span>
              <span className="font-medium text-slate-700 text-[14px] sm:text-[15px]">{formattedPrice} BDT</span>
              <span className="bg-[#e11d48] text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded whitespace-nowrap">EMI {emi} BDT</span>
            </div>
          </div>
        </div>
        {renderMobileLayout()}
      </>
    );
  }

  if (productPageLayout === 'left-thumbs-bottom') {
    return (
      <>
        <div className="hidden md:flex bg-white border border-stone-100 p-0 h-full items-stretch hover:shadow-md transition-shadow relative overflow-hidden">
          <Link to={`/product/${product.slug}`} className="w-[45%] overflow-hidden shrink-0 group">
            <img src={imageSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </Link>
          <div className="w-[55%] flex flex-col justify-center py-4 pr-0 pl-[15px]">
            <Link to={`/product/${product.slug}`}>
              <h4 className="font-bold text-[16px] xl:text-[18px] text-[#0f172a] leading-tight mb-2 hover:underline line-clamp-2">{product.name}</h4>
            </Link>
            <div className="flex flex-wrap items-center gap-1.5 w-full">
               <span className="text-stone-500 text-[11px] whitespace-nowrap">Starts from</span>
               <span className="font-semibold text-[#0f172a] text-[13px] whitespace-nowrap">{formattedPrice} BDT</span>
               <span className="bg-[#e11d48] text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap shrink-0">EMI {emi} BDT</span>
            </div>
          </div>
        </div>
        {renderMobileLayout()}
      </>
    );
  }

  if (productPageLayout === 'left' || productPageLayout === 'right') {
    const isRight = productPageLayout === 'right';
    return (
      <>
        <div className={`hidden md:flex bg-white border border-stone-100 p-0 ${isRight ? 'flex-row-reverse' : 'flex-row'} h-full items-stretch hover:shadow-md transition-shadow relative overflow-hidden`}>
          <Link to={`/product/${product.slug}`} className="w-1/2 overflow-hidden shrink-0 group">
            <img src={imageSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </Link>
          <div className={`w-1/2 flex flex-col justify-center py-4 ${isRight ? 'pr-[15px] pl-0' : 'pl-[15px] pr-0'}`}>
            <Link to={`/product/${product.slug}`}>
              <h4 className="font-bold text-[16px] text-stone-900 leading-tight hover:underline line-clamp-2">{product.name}</h4>
            </Link>
            {ratingData.count > 0 && (
              <div className="flex items-center text-yellow-500 text-[10px] mt-1.5 gap-0.5">
                <span>★ {ratingData.average}</span>
                <span className="text-stone-500 ml-0.5 text-[11px]">({ratingData.count})</span>
              </div>
            )}
            <div className="text-[#c53030] font-bold text-[16px] mt-2">৳ {formattedPrice}</div>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <button onClick={handleQuickAdd} className="bg-[#6b46c1] hover:bg-[#553c9a] text-white text-[12px] font-medium py-1.5 px-3 rounded-md flex items-center gap-1.5 transition-colors z-10">
                <FiShoppingCart size={12} className="w-3.5 h-3.5" /> <span className="whitespace-nowrap hidden lg:inline">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
        {renderMobileLayout()}
      </>
    );
  }

  // top or bottom
  return renderMobileLayout(true);
}
