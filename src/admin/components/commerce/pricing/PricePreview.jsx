import { useState } from 'react';
import { FiArrowRight, FiInfo } from 'react-icons/fi';

export default function PricePreview() {
  const [regularPrice, setRegularPrice] = useState(1500);
  const [promoDiscount, setPromoDiscount] = useState(20);
  const [promoType, setPromoType] = useState('percentage');
  const [groupDiscount, setGroupDiscount] = useState(0);

  const calculateFinalPrice = () => {
    let price = regularPrice;
    
    // 1. Promo Discount
    let promoAmount = 0;
    if (promoType === 'percentage') {
      promoAmount = price * (promoDiscount / 100);
    } else {
      promoAmount = promoDiscount;
    }
    
    let afterPromo = price - promoAmount;
    if (afterPromo < 0) afterPromo = 0;

    // 2. Group Discount
    let groupAmount = afterPromo * (groupDiscount / 100);
    let finalPrice = afterPromo - groupAmount;
    if (finalPrice < 0) finalPrice = 0;

    return {
      price,
      promoAmount,
      afterPromo,
      groupAmount,
      finalPrice
    };
  };

  const calc = calculateFinalPrice();

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-serif font-bold text-text-primary mb-2">Price Simulation Engine</h2>
          <p className="text-sm text-text-muted max-w-lg">
            Test how different rules, discounts, and customer groups interact to calculate the final display price.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-text-primary">1. Base Product Price</h3>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">$</span>
                <input 
                  type="number" 
                  value={regularPrice}
                  onChange={(e) => setRegularPrice(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-background border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 text-lg font-bold text-text-primary"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <h3 className="text-sm font-bold text-text-primary">2. Active Promotion</h3>
                <select 
                  value={promoType}
                  onChange={(e) => setPromoType(e.target.value)}
                  className="text-xs font-medium text-text-muted bg-transparent border-none focus:ring-0 cursor-pointer"
                >
                  <option value="percentage">% Off</option>
                  <option value="fixed">$ Off</option>
                </select>
              </div>
              <div className="relative">
                <input 
                  type="number" 
                  value={promoDiscount}
                  onChange={(e) => setPromoDiscount(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 bg-background border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 text-lg font-bold text-text-primary"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">
                  {promoType === 'percentage' ? '%' : '$'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-text-primary">3. Customer Group (e.g. Wholesale)</h3>
              <div className="relative">
                <input 
                  type="number" 
                  value={groupDiscount}
                  onChange={(e) => setGroupDiscount(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-3 bg-background border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-black/20 text-lg font-bold text-text-primary"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">% Off</span>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8 text-white flex flex-col justify-center">
            <h3 className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest mb-8">Waterfall Calculation</h3>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-text-muted">Regular Price</span>
                <span className="text-xl font-medium">${calc.price.toLocaleString()}</span>
              </div>

              {calc.promoAmount > 0 && (
                <div className="flex justify-between items-center text-pink-400">
                  <span className="flex items-center gap-2">
                    <FiArrowRight size={14} /> Promotion Discount
                  </span>
                  <span>-${calc.promoAmount.toLocaleString()}</span>
                </div>
              )}

              {calc.groupAmount > 0 && (
                <div className="flex justify-between items-center text-blue-400">
                  <span className="flex items-center gap-2">
                    <FiArrowRight size={14} /> Group Discount
                  </span>
                  <span>-${calc.groupAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="pt-6 border-t border-white/20 mt-6">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-300">Final Display Price</span>
                  <span className="text-5xl font-serif font-bold text-white">${calc.finalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex items-start gap-3 p-4 bg-surface/5 rounded-xl border border-white/10">
              <FiInfo className="text-text-muted shrink-0 mt-0.5" />
              <p className="text-xs text-text-muted leading-relaxed">
                Rules apply sequentially. Group discounts apply to the post-promotion price to protect profit margins.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
