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

  // Using simple slicing or reversing to simulate different lists of products
  // In a real application, you'd filter by specific tags or categories like "featured", "new", etc.
  const featuredProducts = products; 
  const newArrivals = [...products].reverse();
  const bestSellers = products;

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
