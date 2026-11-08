import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { Product, ProductSeries, ProductCategory, CustomizationColor } from '../types';
import { filterProducts } from '../utils/filterAndSearch';
import { ProductDetailModal } from './ProductDetailModal';

interface ProductCatalogProps {
  products: Product[];
  seriesList: ProductSeries[];
  colors: CustomizationColor[];
  onRequestQuoteForProduct: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  seriesList,
  colors,
  onRequestQuoteForProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeries, setSelectedSeries] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'strength', label: 'Strength Equipment' },
    { id: 'cardio', label: 'Cardio Range' },
    { id: 'benches-racks', label: 'Benches & Racks' },
  ];

  const filteredProducts = useMemo(() => {
    return filterProducts(products, searchQuery, selectedCategory, selectedSeries);
  }, [products, searchQuery, selectedCategory, selectedSeries]);

  const activeSeriesInfo = useMemo(() => {
    if (selectedSeries === 'all') return null;
    return seriesList.find((s) => s.id === selectedSeries);
  }, [selectedSeries, seriesList]);

  return (
    <section id="products" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
              Commercial Equipment Catalogue
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 uppercase">
              Engineered Strength & Cardio Series
            </h2>
            <div className="w-16 h-1 bg-red-600 mt-4" />
          </div>

          <p className="text-sm text-neutral-600 max-w-md">
            Every Into Wellness machine is manufactured from structural 11-gauge steel, dual-layer electrostatic
            thermo-cured powder coating, and anatomically calibrated motion curves.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-xl border border-neutral-200 shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by machine name, series, or biomechanics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all text-neutral-900 placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400 hover:text-neutral-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Segmented Buttons */}
            <div className="md:col-span-6 flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSeries('all');
                  }}
                  className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Series Horizontal Selector */}
          <div className="pt-3 border-t border-neutral-100">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 shrink-0 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-red-600" />
                Series:
              </span>

              <button
                onClick={() => setSelectedSeries('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
                  selectedSeries === 'all'
                    ? 'bg-red-600 text-white font-bold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All Series
              </button>

              {seriesList.map((series) => (
                <button
                  key={series.id}
                  onClick={() => {
                    setSelectedSeries(series.id);
                    setSelectedCategory(series.category);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
                    selectedSeries === series.id
                      ? 'bg-red-600 text-white font-bold'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {series.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Series Highlight Banner if specific series selected */}
        {activeSeriesInfo && (
          <div className="mb-10 bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 text-white p-6 sm:p-8 rounded-xl border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-widest text-red-500">
                Series Spotlight
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                {activeSeriesInfo.name} · {activeSeriesInfo.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {activeSeriesInfo.description}
              </p>
              <div className="text-xs text-neutral-400 pt-1 font-medium">
                <span className="text-red-400 font-semibold">Recommended Application:</span> {activeSeriesInfo.idealFor}
              </div>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => setSelectedSeries('all')}
                className="text-xs uppercase tracking-wider font-bold text-neutral-300 hover:text-white px-4 py-2 border border-neutral-700 hover:border-neutral-500 rounded transition-colors"
              >
                Show All Series
              </button>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-800 uppercase">
              No matching equipment found
            </h3>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              We couldn't find any products matching your search criteria. Try adjusting your search query or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedSeries('all');
              }}
              className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-200 group"
              >
                <div>
                  {/* Image container */}
                  <div
                    onClick={() => setActiveModalProduct(product)}
                    className="relative aspect-4/3 bg-neutral-100 overflow-hidden cursor-pointer p-4 flex items-center justify-center border-b border-neutral-100"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {product.seriesName}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-3">
                    <h3
                      onClick={() => setActiveModalProduct(product)}
                      className="font-display text-base sm:text-lg font-bold text-neutral-900 uppercase leading-snug group-hover:text-red-600 transition-colors cursor-pointer line-clamp-2"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Quick Specs Strip */}
                    <div className="pt-2 border-t border-neutral-100 space-y-1 text-[11px] text-neutral-500">
                      {product.specifications.steelGauge && (
                        <div className="flex justify-between">
                          <span>Steel Gauge:</span>
                          <span className="font-semibold text-neutral-800">{product.specifications.steelGauge}</span>
                        </div>
                      )}
                      {product.specifications.weightStack && (
                        <div className="flex justify-between">
                          <span>Weight Stack:</span>
                          <span className="font-semibold text-neutral-800">{product.specifications.weightStack}</span>
                        </div>
                      )}
                      {product.specifications.driveSystem && (
                        <div className="flex justify-between">
                          <span>Drive:</span>
                          <span className="font-semibold text-neutral-800">{product.specifications.driveSystem}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTAs */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveModalProduct(product)}
                    className="py-2.5 px-3 border border-neutral-300 hover:border-neutral-900 text-neutral-800 text-xs font-bold uppercase tracking-wider rounded transition-colors text-center"
                  >
                    Specs
                  </button>

                  <button
                    onClick={() => onRequestQuoteForProduct(product)}
                    className="py-2.5 px-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors text-center shadow-sm"
                  >
                    Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for detail view */}
        {activeModalProduct && (
          <ProductDetailModal
            product={activeModalProduct}
            seriesList={seriesList}
            allProducts={products}
            colors={colors}
            onClose={() => setActiveModalProduct(null)}
            onRequestQuoteForProduct={(prod) => {
              setActiveModalProduct(null);
              onRequestQuoteForProduct(prod);
            }}
            onSelectProduct={(prod) => setActiveModalProduct(prod)}
          />
        )}
      </div>
    </section>
  );
};
