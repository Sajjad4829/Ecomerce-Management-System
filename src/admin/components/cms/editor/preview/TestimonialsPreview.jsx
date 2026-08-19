export default function TestimonialsPreview() {
  return (
    <div className="py-24 px-8 md:px-16 bg-[#1A1A1A] text-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <h3 className="text-3xl md:text-4xl font-serif leading-relaxed mb-8">
          "The quality of the oak dining table exceeded all our expectations. It is truly a centerpiece that our family will gather around for decades to come."
        </h3>
        <div className="text-sm tracking-widest uppercase font-bold text-text-muted">
          — Sarah Jenkins, Verified Buyer
        </div>
      </div>
    </div>
  );
}
