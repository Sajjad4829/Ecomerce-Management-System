export default function FooterPreview({ section = {} }) {
  const content = section.content || {};

  return (
    <footer className="bg-gray-100 py-16 px-8 md:px-16 text-sm border-t border-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <h2 className="text-xl font-serif font-bold text-text-primary mb-6">{content.title || 'LUMIÈRE'}</h2>
          <p className="text-text-muted leading-relaxed mb-6">
            {content.subtitle || content.description || 'Crafting premium wooden furniture for modern living spaces since 2010.'}
          </p>
        </div>
        <div>
          <h4 className="font-bold text-text-primary uppercase tracking-widest mb-6 text-xs">Shop</h4>
          <ul className="space-y-3 text-text-muted">
            <li>Living Room</li>
            <li>Dining</li>
            <li>Bedroom</li>
            <li>Accessories</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-text-primary uppercase tracking-widest mb-6 text-xs">Support</h4>
          <ul className="space-y-3 text-text-muted">
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Shipping & Returns</li>
            <li>Care Guide</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-text-primary uppercase tracking-widest mb-6 text-xs">Legal</h4>
          <ul className="space-y-3 text-text-muted">
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center text-xs text-text-muted">
        <p>&copy; {new Date().getFullYear()} LUMIÈRE. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span>Instagram</span>
          <span>Pinterest</span>
        </div>
      </div>
    </footer>
  );
}
