import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BookOpen, Clock, User, ArrowRight, X, Search } from 'lucide-react';
import { filterBlogs } from '../utils/filterAndSearch';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ blogs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Biomechanics & Training', label: 'Biomechanics' },
    { id: 'Business of Fitness', label: 'Business of Fitness' },
    { id: 'Equipment Engineering', label: 'Engineering' },
    { id: 'Exhibitions & Events', label: 'Events & Expos' }
  ];

  const filtered = filterBlogs(blogs, searchQuery, selectedCategory);

  return (
    <section id="blogs" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
              Industry Insights & Engineering Guides
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 uppercase">
              BLOG & GYM RESOURCES
            </h2>
            <div className="w-16 h-1 bg-red-600 mt-4" />
          </div>

          <p className="text-sm text-neutral-600 max-w-md">
            Biomechanical guides, commercial facility planning advice, and manufacturing breakthroughs from the Into Wellness engineering team.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles & guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-200 border border-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((post) => (
            <div
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-red-400/60 transition-all duration-200 cursor-pointer group"
            >
              <div>
                <div className="aspect-16/10 bg-neutral-200 overflow-hidden relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-neutral-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {post.category}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                    <span>{post.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold uppercase text-neutral-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-red-600 uppercase tracking-wider mt-2">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-200 relative animate-in fade-in zoom-in-95 duration-150">
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                  {activeArticle.category}
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-10 space-y-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-neutral-900 leading-snug">
                    {activeArticle.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mt-3 pt-3 border-t border-neutral-100">
                    <span className="flex items-center gap-1 text-neutral-700 font-semibold">
                      <User className="w-3.5 h-3.5 text-red-600" />
                      {activeArticle.author}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{activeArticle.date}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-red-600" />
                      {activeArticle.readTime}
                    </span>
                  </div>
                </div>

                <div className="relative aspect-16/9 rounded-lg overflow-hidden border border-neutral-200">
                  <img
                    src={activeArticle.imageUrl}
                    alt={activeArticle.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                  {activeArticle.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-neutral-200 flex justify-end">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
