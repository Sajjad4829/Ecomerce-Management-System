export default function CategoryHero({ category }) {
  if (!category) return null;

  // We use a responsive height so it's not a huge desktop hero on mobile
  return (
    <div className="w-full bg-gray-100 relative overflow-hidden h-[30vh] min-h-[200px] max-h-[350px]">
      <img
        src={category.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=2000'}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Subtle overlay to ensure the brand stays premium without being too dark if we put text over it, 
          but design calls for title below hero. */}
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  );
}
