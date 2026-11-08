import { Product, InstallationProject, BlogPost, EnquiryStatus } from '../types';

export function filterProducts(
  products: Product[],
  searchQuery: string,
  categoryFilter: string,
  seriesFilter: string
): Product[] {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((p) => {
    // Only published
    if (!p.published) return false;

    // Category filter
    if (categoryFilter !== 'all' && p.category !== categoryFilter) {
      return false;
    }

    // Series filter
    if (seriesFilter !== 'all' && p.seriesId !== seriesFilter) {
      return false;
    }

    // Search query matches name, series, description, or features
    if (query) {
      const matchName = p.name.toLowerCase().includes(query);
      const matchSeries = p.seriesName.toLowerCase().includes(query);
      const matchDesc = p.description.toLowerCase().includes(query);
      const matchFeatures = p.features.some((f) => f.toLowerCase().includes(query));
      if (!matchName && !matchSeries && !matchDesc && !matchFeatures) {
        return false;
      }
    }

    return true;
  });
}

export function groupProductsBySeries(products: Product[]): Record<string, Product[]> {
  const grouped: Record<string, Product[]> = {};
  for (const product of products) {
    if (!grouped[product.seriesName]) {
      grouped[product.seriesName] = [];
    }
    grouped[product.seriesName].push(product);
  }
  return grouped;
}

export function filterInstallations(
  installations: InstallationProject[],
  categoryFilter: string
): InstallationProject[] {
  return installations.filter((inst) => {
    if (!inst.published) return false;
    if (categoryFilter !== 'all' && inst.category !== categoryFilter) {
      return false;
    }
    return true;
  });
}

export function filterBlogs(
  blogs: BlogPost[],
  searchQuery: string,
  categoryFilter: string
): BlogPost[] {
  const query = searchQuery.trim().toLowerCase();
  return blogs.filter((b) => {
    if (!b.published) return false;
    if (categoryFilter !== 'all' && b.category !== categoryFilter) {
      return false;
    }
    if (query) {
      const matchTitle = b.title.toLowerCase().includes(query);
      const matchExcerpt = b.excerpt.toLowerCase().includes(query);
      if (!matchTitle && !matchExcerpt) {
        return false;
      }
    }
    return true;
  });
}

export function cleanPhoneForTel(raw: string): string {
  return raw.replace(/[^0-9+]/g, '');
}

export function getStatusBadgeStyle(status: EnquiryStatus): { bg: string; text: string; border: string } {
  switch (status) {
    case 'New':
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
    case 'In Review':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'Contacted':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    case 'Closed':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
  }
}
