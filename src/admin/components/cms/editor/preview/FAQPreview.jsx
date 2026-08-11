import { FiPlus } from 'react-icons/fi';

export default function FAQPreview() {
  const faqs = [
    "What is your return policy?",
    "Do you offer international shipping?",
    "How do I care for my wooden furniture?",
    "Can I customize the dimensions?"
  ];

  return (
    <div className="py-24 px-8 md:px-16 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-black/10 rounded-lg p-6 flex justify-between items-center cursor-pointer hover:border-black/30 transition-colors">
              <span className="font-bold text-[#1A1A1A]">{faq}</span>
              <FiPlus className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
