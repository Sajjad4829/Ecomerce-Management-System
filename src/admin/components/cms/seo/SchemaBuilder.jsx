import { useState, useMemo } from 'react';
import { FiCode, FiCopy, FiCheck, FiPlus, FiTrash2, FiLayers, FiInfo } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function SchemaBuilder({
  initialType = 'Product',
  resourceData = {},
  onChangeSchema
}) {
  const [schemaType, setSchemaType] = useState(initialType); // 'Product' | 'Organization' | 'WebPage' | 'Article' | 'FAQPage' | 'BreadcrumbList'
  const [copied, setCopied] = useState(false);

  // Schema form state
  const [productFields, setProductFields] = useState({
    name: resourceData.title || "Aurelian Modular Velvet Sofa",
    description: resourceData.description || "Handmade luxury modular velvet sofa in cream.",
    sku: resourceData.sku || "AUR-SOFA-CRM-01",
    mpn: "AUR-SOFA-2025",
    brand: "Aurelian Luxury",
    price: "4250.00",
    currency: "USD",
    availability: "InStock", // 'InStock' | 'OutOfStock' | 'PreOrder'
    condition: "NewCondition",
    ratingValue: "4.9",
    reviewCount: "38"
  });

  const [faqItems, setFaqItems] = useState([
    { q: "What materials are used in the Aurelian velvet sofa?", a: "We use solid kiln-dried Italian oak frame and stain-resistant performance velvet." },
    { q: "Is white-glove assembly included?", a: "Yes, white-glove in-room placement and packaging removal is complimentary on all orders over $2,000." }
  ]);

  // Generate JSON-LD dynamically based on selected schema type
  const generatedJsonLd = useMemo(() => {
    if (schemaType === 'Product') {
      return {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productFields.name,
        "description": productFields.description,
        "sku": productFields.sku,
        "mpn": productFields.mpn,
        "brand": {
          "@type": "Brand",
          "name": productFields.brand
        },
        "offers": {
          "@type": "Offer",
          "url": "https://aurelianfurniture.com/products/aurelian-modular-velvet-sofa",
          "priceCurrency": productFields.currency,
          "price": productFields.price,
          "itemCondition": `https://schema.org/${productFields.condition}`,
          "availability": `https://schema.org/${productFields.availability}`
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": productFields.ratingValue,
          "reviewCount": productFields.reviewCount
        }
      };
    }

    if (schemaType === 'Organization') {
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Aurelian Luxury Furniture",
        "url": "https://aurelianfurniture.com",
        "logo": "https://aurelianfurniture.com/assets/logo.png",
        "sameAs": [
          "https://instagram.com/aurelianfurniture",
          "https://pinterest.com/aurelianfurniture"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-800-555-0199",
          "contactType": "customer service"
        }
      };
    }

    if (schemaType === 'FAQPage') {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      };
    }

    if (schemaType === 'BreadcrumbList') {
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aurelianfurniture.com" },
          { "@type": "ListItem", "position": 2, "name": "Living Room", "item": "https://aurelianfurniture.com/collections/living-room" },
          { "@type": "ListItem", "position": 3, "name": "Sofas", "item": "https://aurelianfurniture.com/categories/sofas" },
          { "@type": "ListItem", "position": 4, "name": productFields.name, "item": "https://aurelianfurniture.com/products/aurelian-velvet-sofa" }
        ]
      };
    }

    // Default WebPage
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": productFields.name,
      "description": productFields.description,
      "publisher": {
        "@type": "Organization",
        "name": "Aurelian Furniture"
      }
    };
  }, [schemaType, productFields, faqItems]);

  const jsonString = JSON.stringify(generatedJsonLd, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${jsonString}\n</script>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-surface border border-black/10 rounded-xl p-5 shadow-2xs space-y-5">
      {/* Header & Schema Type Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/5 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <FiCode size={16} className="text-purple-600" />
            <h4 className="font-serif font-bold text-base text-text-primary">Structured Data Schema Builder</h4>
          </div>
          <p className="text-xs text-text-muted mt-0.5">
            Configure Google Rich Results snippets using standard Schema.org JSON-LD microdata.
          </p>
        </div>

        {/* Type Select */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-text-secondary uppercase">Schema Type:</label>
          <select
            value={schemaType}
            onChange={(e) => setSchemaType(e.target.value)}
            className="px-3 py-1.5 bg-background border border-black/10 rounded-lg text-xs font-bold text-text-primary focus:bg-surface focus:outline-none"
          >
            <option value="Product">Product & Offer Schema</option>
            <option value="Organization">Organization Brand Schema</option>
            <option value="FAQPage">FAQ Page Schema</option>
            <option value="BreadcrumbList">Breadcrumb Navigation Schema</option>
            <option value="WebPage">Standard WebPage Schema</option>
          </select>
        </div>
      </div>

      {/* Editor Body Split: Form Left / Code Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Left: Interactive Field Configurator */}
        <div className="space-y-4">
          <h5 className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
            <FiLayers size={13} />
            <span>Schema Fields Configuration</span>
          </h5>

          {schemaType === 'Product' && (
            <div className="space-y-3 bg-background/60 p-4 border border-black/5 rounded-xl text-xs space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-text-secondary block mb-1">Product Title</label>
                  <input
                    type="text"
                    value={productFields.name}
                    onChange={(e) => setProductFields({ ...productFields, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-surface border border-black/10 rounded-lg text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-text-secondary block mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={productFields.brand}
                    onChange={(e) => setProductFields({ ...productFields, brand: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-surface border border-black/10 rounded-lg text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-text-secondary block mb-1">SKU</label>
                  <input
                    type="text"
                    value={productFields.sku}
                    onChange={(e) => setProductFields({ ...productFields, sku: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-surface border border-black/10 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-text-secondary block mb-1">Price ({productFields.currency})</label>
                  <input
                    type="text"
                    value={productFields.price}
                    onChange={(e) => setProductFields({ ...productFields, price: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-surface border border-black/10 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-text-secondary block mb-1">Availability</label>
                  <select
                    value={productFields.availability}
                    onChange={(e) => setProductFields({ ...productFields, availability: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-surface border border-black/10 rounded-lg text-xs font-semibold"
                  >
                    <option value="InStock">In Stock</option>
                    <option value="OutOfStock">Out of Stock</option>
                    <option value="PreOrder">Pre-Order</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-black/5">
                <div>
                  <label className="font-bold text-text-secondary block mb-1">Rating Stars (0 - 5)</label>
                  <input
                    type="text"
                    value={productFields.ratingValue}
                    onChange={(e) => setProductFields({ ...productFields, ratingValue: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-surface border border-black/10 rounded-lg text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-text-secondary block mb-1">Review Count</label>
                  <input
                    type="text"
                    value={productFields.reviewCount}
                    onChange={(e) => setProductFields({ ...productFields, reviewCount: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-surface border border-black/10 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {schemaType === 'FAQPage' && (
            <div className="space-y-3 bg-background/60 p-4 border border-black/5 rounded-xl text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-text-secondary">FAQ Pairs ({faqItems.length})</span>
                <button
                  type="button"
                  onClick={() => setFaqItems([...faqItems, { q: "New Question?", a: "Answer details..." }])}
                  className="px-2.5 py-1 bg-[#1A1A1A] text-white rounded-lg text-[11px] font-bold flex items-center gap-1"
                >
                  <FiPlus size={12} /> Add FAQ
                </button>
              </div>

              {faqItems.map((item, idx) => (
                <div key={idx} className="bg-surface p-3 border border-black/10 rounded-lg space-y-2 relative group">
                  <input
                    type="text"
                    placeholder="Question"
                    value={item.q}
                    onChange={(e) => {
                      const updated = [...faqItems];
                      updated[idx].q = e.target.value;
                      setFaqItems(updated);
                    }}
                    className="w-full px-2 py-1 border border-black/10 rounded text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Answer"
                    value={item.a}
                    onChange={(e) => {
                      const updated = [...faqItems];
                      updated[idx].a = e.target.value;
                      setFaqItems(updated);
                    }}
                    className="w-full px-2 py-1 border border-black/10 rounded text-xs text-text-secondary resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => setFaqItems(faqItems.filter((_, i) => i !== idx))}
                    className="text-danger hover:text-red-700 text-xs font-bold flex items-center gap-1 pt-1"
                  >
                    <FiTrash2 size={12} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {schemaType !== 'Product' && schemaType !== 'FAQPage' && (
            <div className="p-4 bg-background border border-black/5 rounded-xl text-xs text-text-secondary space-y-2">
              <div className="flex items-center gap-2 text-black font-bold">
                <FiInfo size={14} className="text-primary" />
                <span>Default Global Schema Active</span>
              </div>
              <p>
                This schema uses centralized organization settings automatically pulled from the site configuration.
              </p>
            </div>
          )}
        </div>

        {/* Right: Syntax Highlighted JSON-LD Output */}
        <div className="space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
              <FiCode size={13} />
              <span>Generated JSON-LD Output</span>
            </h5>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1 bg-surface border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:bg-background flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? <FiCheck size={14} className="text-success" /> : <FiCopy size={14} />}
              <span>{copied ? "Script Copied!" : "Copy Script"}</span>
            </button>
          </div>

          <div className="bg-[#1e1e1e] text-emerald-400 font-mono text-[11px] p-4 rounded-xl border border-black/20 overflow-x-auto max-h-80 custom-scrollbar leading-relaxed">
            <pre>
              {`<script type="application/ld+json">\n${jsonString}\n</script>`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
