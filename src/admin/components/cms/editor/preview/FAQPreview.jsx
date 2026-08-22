import { FiPlus } from 'react-icons/fi';

export default function FAQPreview({ section }) {
  const content = section?.content || {};
  const faqs = [
    "What is your return policy?",
    "Do you offer international shipping?",
    "How do I care for my wooden furniture?",
    "Can I customize the dimensions?"
  ];

  return (
    <div className="py-24 px-8 md:px-16 bg-surface">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-text-primary mb-12 text-center">{content.title || 'Frequently Asked Questions'}</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-black/10 rounded-lg p-6 flex justify-between items-center cursor-pointer hover:border-black/30 transition-colors">
              <span className="font-bold text-text-primary">{faq}</span>
              <FiPlus className="text-text-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
