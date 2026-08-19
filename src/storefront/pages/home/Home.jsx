import { useProducts } from '../../../admin/context/commerce/ProductContext';
import HeroSection from '../../components/home/HeroSection';
import BenefitsSection from '../../components/home/BenefitsSection';
import CategoryShowcase from '../../components/home/CategoryShowcase';
import ProductGridSection from '../../components/home/ProductGridSection';
import PromoBanner from '../../components/home/PromoBanner';
import CollectionFeature from '../../components/home/CollectionFeature';
import BrandStory from '../../components/home/BrandStory';
import EditorialSection from '../../components/home/EditorialSection';
import Testimonials from '../../components/home/Testimonials';
import NewsletterSection from '../../components/home/NewsletterSection';

export default function Home() {
  const { products } = useProducts();

  const safeProducts = products || [];
  const featuredProducts = safeProducts.filter(p => p.badge === 'Featured' || p.featured === true).slice(0, 4);
  const newArrivals = [...safeProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  const bestSellers = safeProducts.filter(p => p.badge === 'Best Seller').slice(0, 4);

  // Fallbacks if not enough specific products exist
  if (featuredProducts.length === 0) featuredProducts.push(...safeProducts.slice(0, 4));
  if (bestSellers.length === 0) bestSellers.push(...safeProducts.slice(0, 4));

  return (
    <div className="w-full bg-white animate-in fade-in duration-1000">
      <HeroSection />
      <BenefitsSection />
      <CategoryShowcase />
      
      <ProductGridSection 
        title="Featured Products" 
        products={featuredProducts} 
        linkTo="/products" 
      />
      
      <PromoBanner />
      
      <ProductGridSection 
        title="New Arrivals" 
        products={newArrivals} 
        linkTo="/collections/new" 
      />
      
      <CollectionFeature />
      <BrandStory />
      
      <ProductGridSection 
        title="Best Sellers" 
        products={bestSellers} 
        linkTo="/products" 
      />
      
      <EditorialSection />
      <Testimonials />
      <NewsletterSection />
    </div>
  );
}
