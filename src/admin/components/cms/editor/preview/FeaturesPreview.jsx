export default function FeaturesPreview() {
  const features = [
    { title: 'Sustainably Sourced', desc: 'Every piece is crafted from ethically harvested wood.' },
    { title: 'Lifetime Warranty', desc: 'Built to last generations, guaranteed by our warranty.' },
    { title: 'Free White Glove Delivery', desc: 'Complimentary delivery and assembly on all orders over $1000.' },
  ];

  return (
    <div className="py-20 px-8 md:px-16 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, idx) => (
          <div key={idx} className="text-center">
            <div className="w-12 h-12 border border-black/10 rounded-full mx-auto mb-6 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#1A1A1A] rounded-full"></div>
            </div>
            <h3 className="text-lg font-serif font-bold text-text-primary mb-3">{feature.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
