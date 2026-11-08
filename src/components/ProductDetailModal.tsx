import React, { useState } from 'react';
import { X, Check, FileText, MessageSquare, ArrowRight, Layers, Sliders, ShieldCheck } from 'lucide-react';
import { Product, ProductSeries, CustomizationColor } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  seriesList: ProductSeries[];
  allProducts: Product[];
  colors: CustomizationColor[];
  onClose: () => void;
  onRequestQuoteForProduct: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  seriesList,
  allProducts,
  colors,
  onClose,
  onRequestQuoteForProduct,
  onSelectProduct,
}) => {
  if (!product) return null;

  const currentSeries = seriesList.find((s) => s.id === product.seriesId);
  const relatedProducts = allProducts
    .filter((p) => p.seriesId === product.seriesId && p.id !== product.id)
    .slice(0, 3);

  const frameColors = colors.filter((c) => c.type === 'frame').slice(0, 8);
  const upholsteryColors = colors.filter((c) => c.type === 'upholstery');

  const [selectedFrame, setSelectedFrame] = useState(frameColors[0]?.hex || '#1C1C1E');
  const [selectedUpholstery, setSelectedUpholstery] = useState(upholsteryColors[0]?.hex || '#881337');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200 relative">
        {/* Top bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
            <span className="text-red-600 font-bold">{product.seriesName}</span>
            <span aria-hidden="true">·</span>
            <span>Category: {product.category.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close product details"
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Grid: Visuals & Fast Information */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Image & Customizer Preview */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 aspect-4/3 flex items-center justify-center p-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-neutral-900/80 backdrop-blur-sm text-white text-[11px] font-bold rounded">
                  Commercial Grade
                </div>
              </div>

              {/* Dynamic finish selector preview */}
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-700">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-red-600" />
                    Custom Finish Preview
                  </span>
                  <span className="text-neutral-500 font-normal">25 Frame / 5 Upholstery Available</span>
                </div>

                <div>
                  <div className="text-[11px] text-neutral-500 mb-1 font-medium">Select Sample Frame Powder Coat:</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {frameColors.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => setSelectedFrame(col.hex)}
                        title={col.name}
                        className={`w-6 h-6 rounded-full border transition-transform ${
                          selectedFrame === col.hex ? 'scale-125 ring-2 ring-red-600 ring-offset-1' : 'border-neutral-300'
                        }`}
                        style={{ backgroundColor: col.hex }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-neutral-500 mb-1 font-medium">Select Sample Upholstery Leather:</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {upholsteryColors.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => setSelectedUpholstery(col.hex)}
                        title={col.name}
                        className={`w-6 h-6 rounded-full border transition-transform ${
                          selectedUpholstery === col.hex ? 'scale-125 ring-2 ring-red-600 ring-offset-1' : 'border-neutral-300'
                        }`}
                        style={{ backgroundColor: col.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Information & CTAs */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-neutral-900 leading-snug">
                  {product.name}
                </h2>
                <div className="text-xs font-semibold text-red-600 uppercase tracking-widest mt-1">
                  Series: {product.seriesName}
                </div>
              </div>

              <p className="text-sm text-neutral-700 leading-relaxed">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onRequestQuoteForProduct(product);
                  }}
                  className="flex-1 py-3 px-5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request a Quote</span>
                </button>

                <a
                  href={`https://wa.me/917420925709?text=Hello%20Into%20Wellness,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(product.name)}%20(${encodeURIComponent(product.seriesName)})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>

              {/* Technical Specifications Table */}
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <div className="bg-neutral-100 px-4 py-2.5 border-b border-neutral-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                    Verified Technical Specifications
                  </span>
                </div>
                <div className="divide-y divide-neutral-100 text-xs">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    val ? (
                      <div key={key} className="grid grid-cols-2 px-4 py-2.5">
                        <span className="text-neutral-500 capitalize font-medium">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                        <span className="text-neutral-900 font-semibold">{val}</span>
                      </div>
                    ) : null
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features Checklist */}
          {product.features && product.features.length > 0 && (
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900 mb-4">
                Key Engineering & Biomechanical Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-700">
                    <div className="p-1 rounded bg-red-100 text-red-700 shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products within Series */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-neutral-900 mb-4">
                Other Machines in {product.seriesName}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectProduct(rel)}
                    className="text-left p-3 border border-neutral-200 hover:border-red-500 rounded-lg bg-neutral-50 hover:bg-white transition-all group"
                  >
                    <div className="aspect-4/3 rounded bg-white overflow-hidden mb-2 border border-neutral-200 flex items-center justify-center p-2">
                      <img
                        src={rel.imageUrl}
                        alt={rel.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="text-xs font-bold text-neutral-900 line-clamp-1 group-hover:text-red-600">
                      {rel.name}
                    </div>
                    <div className="text-[10px] text-neutral-500 mt-0.5 flex items-center justify-between">
                      <span>View Specifications</span>
                      <ArrowRight className="w-3 h-3 text-red-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
