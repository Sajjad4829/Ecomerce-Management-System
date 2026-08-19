import { useReviews } from '../../../admin/context/ReviewContext';

export default function Testimonials() {
  const { reviews } = useReviews();

  // Get up to 3 published 5-star reviews, fallback to hardcoded if none
  const publishedReviews = reviews?.filter(r => r.status === 'Published' && r.rating >= 4).slice(0, 3) || [];
  
  const displayReviews = publishedReviews.length > 0 ? publishedReviews.map(r => ({
    id: r.id,
    quote: r.content,
    author: r.customerName,
    location: "Verified Customer"
  })) : [
    {
      id: 1,
      quote: "The craftsmanship is unparalleled. Our new dining table has completely transformed the energy of our home, becoming the focal point of every gathering.",
      author: "Eleanor V.",
      location: "New York, NY"
    },
    {
      id: 2,
      quote: "Minimalist design without sacrificing comfort. The lounge chair feels like it was custom-made for my reading nook. Exceptional quality and service.",
      author: "James T.",
      location: "London, UK"
    },
    {
      id: 3,
      quote: "From the sustainable materials to the impeccable delivery experience, Aurelia sets a new standard for luxury furniture.",
      author: "Sarah M.",
      location: "Sydney, AU"
    }
  ];

  return (
    <section className="py-24 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-16">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {displayReviews.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col items-center">
              <span className="text-4xl text-gray-300 font-serif mb-6 leading-none">"</span>
              <p className="text-lg text-gray-700 italic mb-8 flex-grow leading-relaxed">
                {testimonial.quote}
              </p>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500 mt-1">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
