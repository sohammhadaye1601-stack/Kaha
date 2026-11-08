import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  FileText,
  Sliders,
  Image as ImageIcon,
  BookOpen,
  Building,
  Phone,
  Palette,
  Search as SearchIcon,
  Globe,
  Inbox,
  LogOut,
  Shield,
  Layers
} from 'lucide-react';
import {
  CMSData,
  Product,
  InstallationProject,
  Milestone,
  BlogPost,
  CustomizationColor,
  Enquiry,
  EnquiryStatus,
  ProductCategory
} from '../../types';
import { saveCMSData, resetCMSData } from '../../utils/cmsStore';
import { getStatusBadgeStyle } from '../../utils/filterAndSearch';

interface AdminDashboardProps {
  cmsData: CMSData;
  isOpen: boolean;
  onClose: () => void;
  onDataUpdated: (newData: CMSData) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  cmsData,
  isOpen,
  onClose,
  onDataUpdated,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Local working copy of CMS Data
  const [draft, setDraft] = useState<CMSData>(cmsData);
  const [activeTab, setActiveTab] = useState<
    | 'homepage'
    | 'products'
    | 'images'
    | 'blogs'
    | 'gallery'
    | 'company'
    | 'customization'
    | 'seo'
    | 'enquiries'
  >('homepage');

  const [notification, setNotification] = useState<string | null>(null);

  // Sync draft when opened or updated
  React.useEffect(() => {
    setDraft(cmsData);
  }, [cmsData, isOpen]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveAll = () => {
    saveCMSData(draft);
    onDataUpdated(draft);
    showNotification('All changes saved persistently to CMS database!');
  };

  const handleResetToFactory = () => {
    if (window.confirm('Are you sure you want to reset all CMS content to factory defaults? All manual edits will be reverted.')) {
      const reset = resetCMSData();
      setDraft(reset);
      onDataUpdated(reset);
      showNotification('Content reset to factory defaults.');
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draft, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `into_wellness_cms_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Backup JSON exported successfully.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setDraft(parsed);
        saveCMSData(parsed);
        onDataUpdated(parsed);
        showNotification('Backup successfully imported and applied!');
      } catch (err) {
        alert('Invalid JSON file. Please provide a valid Into Wellness CMS backup.');
      }
    };
    reader.readAsText(file);
  };

  // Helper for generic file upload to base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onResult: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onResult(reader.result);
        showNotification('Image uploaded successfully.');
      }
    };
    reader.readAsDataURL(file);
  };

  // Product Editor Sub-State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Blog Editor Sub-State
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isNewBlog, setIsNewBlog] = useState(false);

  // Installation Editor Sub-State
  const [editingInst, setEditingInst] = useState<InstallationProject | null>(null);
  const [isNewInst, setIsNewInst] = useState(false);

  // Custom Color Sub-State
  const [newColor, setNewColor] = useState<{ name: string; hex: string; type: 'frame' | 'upholstery'; description: string }>({
    name: '',
    hex: '#D32F2F',
    type: 'frame',
    description: ''
  });

  // Milestone Editor Sub-State
  const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);

  if (!isOpen) return null;

  // LOGIN SCREEN IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 border border-neutral-200 text-neutral-900 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-lg bg-red-600 text-white font-display text-xl font-bold flex items-center justify-center mx-auto shadow-md">
              IW
            </div>
            <h2 className="font-display text-2xl font-bold uppercase text-neutral-900">
              Admin CMS Login
            </h2>
            <p className="text-xs text-neutral-500">
              Into Wellness Private Limited · Supreme Headquarters
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
              {loginError}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                (username === 'admin' && (password === 'intowellness2025' || password === 'admin' || password === '')) ||
                password === 'demo'
              ) {
                setIsAuthenticated(true);
                setLoginError('');
              } else {
                setLoginError('Invalid credentials. (Hint: Click "Quick Demo Access" below)');
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded text-neutral-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded text-neutral-900 focus:outline-none focus:ring-1 focus:ring-red-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow"
            >
              Sign In to CMS Portal
            </button>

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setUsername('admin');
                  setPassword('intowellness2025');
                  setIsAuthenticated(true);
                }}
                className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded border border-neutral-300 flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-red-600" />
                <span>1-Click Demo Login (Pre-filled credentials)</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // MAIN ADMIN DASHBOARD
  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full h-[96vh] flex flex-col overflow-hidden border border-neutral-200">
        {/* Top Header */}
        <div className="bg-neutral-900 text-white px-6 py-3.5 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center font-bold text-xs">
              IW
            </div>
            <div>
              <div className="font-display text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span>INTO WELLNESS MANUAL CMS SYSTEM</span>
                <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.2 rounded font-normal">
                  Live Editing Mode
                </span>
              </div>
              <div className="text-[10px] text-neutral-400">
                All changes save directly to persistent storage and update the live website immediately.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {notification && (
              <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle className="w-3.5 h-3.5" />
                {notification}
              </span>
            )}

            <button
              onClick={handleSaveAll}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded flex items-center gap-1.5 shadow"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              title="Log Out"
              className="p-1.5 text-neutral-400 hover:text-white"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              title="Close CMS"
              className="p-1.5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Body: Tabs Sidebar + Content Panel */}
        <div className="flex-1 flex overflow-hidden">
          {/* Navigation Sidebar */}
          <div className="w-60 bg-neutral-950 text-neutral-300 border-r border-neutral-800 p-3 space-y-1 overflow-y-auto shrink-0 text-xs">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
              Management Modules
            </div>

            {[
              { id: 'homepage', label: 'A. Homepage Editor', icon: Sliders },
              { id: 'products', label: 'B. Product Manager', icon: Layers, badge: draft.products.length },
              { id: 'images', label: 'C. Image Manager', icon: ImageIcon },
              { id: 'blogs', label: 'D. Blog Manager', icon: BookOpen, badge: draft.blogs.length },
              { id: 'gallery', label: 'E. Gallery Manager', icon: Building, badge: draft.installations.length },
              { id: 'company', label: 'F. Company & Milestones', icon: Phone },
              { id: 'customization', label: 'G. Customization Editor', icon: Palette, badge: draft.colors.length },
              { id: 'seo', label: 'H. SEO Manager', icon: Globe },
              { id: 'enquiries', label: 'I. Enquiry Manager', icon: Inbox, badge: draft.enquiries.length, badgeHighlight: true },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-left ${
                    isActive
                      ? 'bg-red-600 text-white font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive
                          ? 'bg-red-950 text-white'
                          : item.badgeHighlight
                          ? 'bg-red-600 text-white'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Backup & Factory Actions */}
            <div className="pt-4 mt-4 border-t border-neutral-800 space-y-1">
              <div className="px-3 py-1 text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                System Backup
              </div>

              <button
                onClick={handleExportJSON}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded"
              >
                <Download className="w-3.5 h-3.5 text-red-500" />
                <span>Export Site Backup</span>
              </button>

              <label className="w-full flex items-center gap-2 px-3 py-1.5 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-red-500" />
                <span>Import Site Backup</span>
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>

              <button
                onClick={handleResetToFactory}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Default</span>
              </button>
            </div>
          </div>

          {/* Tab Content Canvas */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-neutral-50 text-neutral-900">
            {/* TAB A: HOMEPAGE EDITOR */}
            {activeTab === 'homepage' && (
              <div className="max-w-4xl space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                    A. Homepage Hero & Section Visibility Editor
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1">
                    Update the cinematic hero text, buttons, background image, and rearrange or toggle homepage sections.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-5">
                  <h4 className="text-xs font-bold uppercase text-red-600 tracking-wider">
                    Hero Section Copy & Imagery
                  </h4>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Main Hero Headline
                    </label>
                    <input
                      type="text"
                      value={draft.homepage.heroHeading}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          homepage: { ...draft.homepage, heroHeading: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded font-semibold text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Supporting Subtext
                    </label>
                    <textarea
                      rows={3}
                      value={draft.homepage.heroSubtext}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          homepage: { ...draft.homepage, heroSubtext: e.target.value }
                        })
                      }
                      className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded text-neutral-900 leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                        Primary CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={draft.homepage.ctaPrimaryText}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            homepage: { ...draft.homepage, ctaPrimaryText: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                        Secondary CTA Button Label
                      </label>
                      <input
                        type="text"
                        value={draft.homepage.ctaSecondaryText}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            homepage: { ...draft.homepage, ctaSecondaryText: e.target.value }
                          })
                        }
                        className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded text-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                      Hero Background Image URL or Upload File
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={draft.homepage.heroImageUrl}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            homepage: { ...draft.homepage, heroImageUrl: e.target.value }
                          })
                        }
                        className="flex-1 px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded font-mono text-neutral-800"
                      />
                      <label className="px-3 py-2 bg-neutral-900 text-white text-xs font-bold uppercase rounded cursor-pointer flex items-center gap-1.5 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (base64) =>
                              setDraft({
                                ...draft,
                                homepage: { ...draft.homepage, heroImageUrl: base64 }
                              })
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Section Visibility Toggles */}
                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold uppercase text-red-600 tracking-wider">
                    Homepage Sections Visibility
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                    {Object.entries(draft.homepage.sectionVisibility).map(([key, isVis]) => (
                      <label key={key} className="flex items-center gap-2 p-3 bg-neutral-50 rounded border border-neutral-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isVis}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              homepage: {
                                ...draft.homepage,
                                sectionVisibility: {
                                  ...draft.homepage.sectionVisibility,
                                  [key]: e.target.checked
                                }
                              }
                            })
                          }
                          className="rounded text-red-600 focus:ring-red-500"
                        />
                        <span className="capitalize font-semibold text-neutral-800">{key} Section</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB B: PRODUCT MANAGER */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                      B. Product Catalogue Manager
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Add, edit, assign categories, update specifications, upload photographs, and publish/hide machines.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsNewProduct(true);
                      setEditingProduct({
                        id: 'prod-' + Date.now().toString(36),
                        name: '',
                        seriesId: draft.seriesList[0]?.id || 'hs-pro',
                        seriesName: draft.seriesList[0]?.name || 'HS Pro Series',
                        category: 'strength',
                        description: '',
                        imageUrl: '/src/assets/images/hs_pro_chest_press_1794110546275.jpg',
                        specifications: {
                          dimensions: '1500 x 1200 x 1700 mm',
                          steelGauge: '3.0 mm (11-Gauge Structural Steel)',
                          maxUserWeight: '180 kg',
                          powderCoating: 'Dual-coat electrostatic thermo-cured finish'
                        },
                        features: ['Biomechanical motion arc', 'Knurled handgrips'],
                        customOptions: ['25 Frame Colors', '5 Upholstery Colors'],
                        published: true
                      });
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Machine</span>
                  </button>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-100 text-neutral-700 uppercase font-bold border-b border-neutral-200">
                        <tr>
                          <th className="p-3">Photo</th>
                          <th className="p-3">Product Name</th>
                          <th className="p-3">Series</th>
                          <th className="p-3">Category</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {draft.products.map((p) => (
                          <tr key={p.id} className="hover:bg-neutral-50">
                            <td className="p-3">
                              <img
                                src={p.imageUrl}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="w-12 h-10 object-contain rounded bg-neutral-100 border border-neutral-200"
                              />
                            </td>
                            <td className="p-3 font-semibold text-neutral-900">{p.name}</td>
                            <td className="p-3 text-neutral-600">{p.seriesName}</td>
                            <td className="p-3 uppercase text-[10px] text-neutral-500">{p.category}</td>
                            <td className="p-3">
                              <button
                                onClick={() => {
                                  const updated = draft.products.map((item) =>
                                    item.id === p.id ? { ...item, published: !item.published } : item
                                  );
                                  setDraft({ ...draft, products: updated });
                                }}
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 ${
                                  p.published
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-neutral-200 text-neutral-600 border border-neutral-300'
                                }`}
                              >
                                {p.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                <span>{p.published ? 'Published' : 'Hidden'}</span>
                              </button>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setIsNewProduct(false);
                                  setEditingProduct({ ...p });
                                }}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                title="Edit Product"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Delete product "${p.name}"?`)) {
                                    setDraft({
                                      ...draft,
                                      products: draft.products.filter((item) => item.id !== p.id)
                                    });
                                    showNotification('Product removed.');
                                  }
                                }}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Product Editing Modal */}
                {editingProduct && (
                  <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 border border-neutral-200">
                      <div className="flex items-center justify-between border-b pb-3">
                        <h4 className="font-display text-xl font-bold uppercase text-neutral-900">
                          {isNewProduct ? 'Add New Fitness Machine' : 'Edit Machine Details'}
                        </h4>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="p-1 text-neutral-400 hover:text-neutral-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold text-neutral-700 mb-1">Product Name</label>
                          <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-bold text-neutral-700 mb-1">Series</label>
                            <select
                              value={editingProduct.seriesId}
                              onChange={(e) => {
                                const found = draft.seriesList.find((s) => s.id === e.target.value);
                                setEditingProduct({
                                  ...editingProduct,
                                  seriesId: e.target.value,
                                  seriesName: found?.name || editingProduct.seriesName
                                });
                              }}
                              className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                            >
                              {draft.seriesList.map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block font-bold text-neutral-700 mb-1">Category</label>
                            <select
                              value={editingProduct.category}
                              onChange={(e) =>
                                setEditingProduct({
                                  ...editingProduct,
                                  category: e.target.value as ProductCategory
                                })
                              }
                              className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                            >
                              <option value="strength">Strength</option>
                              <option value="cardio">Cardio</option>
                              <option value="benches-racks">Benches & Racks</option>
                              <option value="functional">Functional</option>
                              <option value="accessories">Accessories</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-neutral-700 mb-1">Description</label>
                          <textarea
                            rows={3}
                            value={editingProduct.description}
                            onChange={(e) =>
                              setEditingProduct({ ...editingProduct, description: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-neutral-700 mb-1">
                            Product Image URL or Upload File
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editingProduct.imageUrl}
                              onChange={(e) =>
                                setEditingProduct({ ...editingProduct, imageUrl: e.target.value })
                              }
                              className="flex-1 px-3 py-2 bg-neutral-50 border rounded text-neutral-900 font-mono"
                            />
                            <label className="px-3 py-2 bg-neutral-900 text-white rounded cursor-pointer font-bold flex items-center gap-1">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (base64) =>
                                    setEditingProduct({ ...editingProduct, imageUrl: base64 })
                                  )
                                }
                              />
                            </label>
                          </div>
                        </div>

                        {/* Specifications Editor */}
                        <div className="border p-3 rounded bg-neutral-50 space-y-2">
                          <div className="font-bold uppercase text-[11px] text-neutral-700">
                            Technical Specifications
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-neutral-500">Dimensions:</span>
                              <input
                                type="text"
                                value={editingProduct.specifications.dimensions || ''}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    specifications: {
                                      ...editingProduct.specifications,
                                      dimensions: e.target.value
                                    }
                                  })
                                }
                                className="w-full px-2 py-1 bg-white border rounded mt-0.5"
                              />
                            </div>
                            <div>
                              <span className="text-neutral-500">Steel Gauge:</span>
                              <input
                                type="text"
                                value={editingProduct.specifications.steelGauge || ''}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    specifications: {
                                      ...editingProduct.specifications,
                                      steelGauge: e.target.value
                                    }
                                  })
                                }
                                className="w-full px-2 py-1 bg-white border rounded mt-0.5"
                              />
                            </div>
                            <div>
                              <span className="text-neutral-500">Weight Stack:</span>
                              <input
                                type="text"
                                value={editingProduct.specifications.weightStack || ''}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    specifications: {
                                      ...editingProduct.specifications,
                                      weightStack: e.target.value
                                    }
                                  })
                                }
                                className="w-full px-2 py-1 bg-white border rounded mt-0.5"
                              />
                            </div>
                            <div>
                              <span className="text-neutral-500">Powder Coating:</span>
                              <input
                                type="text"
                                value={editingProduct.specifications.powderCoating || ''}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    specifications: {
                                      ...editingProduct.specifications,
                                      powderCoating: e.target.value
                                    }
                                  })
                                }
                                className="w-full px-2 py-1 bg-white border rounded mt-0.5"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 border rounded font-bold uppercase text-neutral-700"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!editingProduct.name.trim()) {
                                alert('Product name is required.');
                                return;
                              }
                              let updatedProducts = [...draft.products];
                              if (isNewProduct) {
                                updatedProducts.unshift(editingProduct);
                              } else {
                                updatedProducts = updatedProducts.map((item) =>
                                  item.id === editingProduct.id ? editingProduct : item
                                );
                              }
                              setDraft({ ...draft, products: updatedProducts });
                              setEditingProduct(null);
                              showNotification(`Product "${editingProduct.name}" saved!`);
                            }}
                            className="px-5 py-2 bg-red-600 text-white rounded font-bold uppercase"
                          >
                            Save Product
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB C: IMAGE MANAGER */}
            {activeTab === 'images' && (
              <div className="space-y-6 max-w-4xl">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                    C. Media & Image Asset Manager
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Upload images manually, copy asset references, or replace hero and gallery photographs.
                  </p>
                </div>

                {/* Upload action box */}
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-neutral-300 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-base font-bold uppercase text-neutral-800">
                    Upload New Image File
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-md mx-auto">
                    Select a high-resolution gym photo, factory snapshot, or equipment render from your local device.
                  </p>
                  <label className="inline-block px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded cursor-pointer shadow">
                    <span>Browse & Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (base64) => {
                          // Auto assign as a sample hero or add to assets
                          setDraft({
                            ...draft,
                            homepage: { ...draft.homepage, heroImageUrl: base64 }
                          });
                          showNotification('Image uploaded and set as Hero background!');
                        })
                      }
                    />
                  </label>
                </div>

                {/* Current Active Image Slots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2">
                    <div className="text-xs font-bold uppercase text-neutral-700">Hero Section Background</div>
                    <div className="aspect-16/9 bg-neutral-100 rounded overflow-hidden">
                      <img src={draft.homepage.heroImageUrl} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono truncate">{draft.homepage.heroImageUrl}</div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2">
                    <div className="text-xs font-bold uppercase text-neutral-700">Factory Showcase Photo</div>
                    <div className="aspect-16/9 bg-neutral-100 rounded overflow-hidden">
                      <img src="/src/assets/images/manufacturing_facility_1794110545984.jpg" alt="Factory" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono truncate">Chakan Manufacturing Complex</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB D: BLOG MANAGER */}
            {activeTab === 'blogs' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                      D. Blog & Editorial Articles Manager
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Write new articles, edit existing content, upload featured images, and publish/unpublish guides.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsNewBlog(true);
                      setEditingBlog({
                        id: 'blog-' + Date.now().toString(36),
                        slug: 'new-commercial-gym-guide',
                        title: 'New Commercial Fitness Guide',
                        category: 'Biomechanics & Training',
                        author: 'Into Wellness Editorial Team',
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        readTime: '5 min read',
                        excerpt: 'Summary of the new fitness guide.',
                        content: ['Paragraph 1 of the article.', 'Paragraph 2 of the article.'],
                        imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
                        published: true
                      });
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Article</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {draft.blogs.map((b) => (
                    <div key={b.id} className="bg-white p-5 rounded-xl border border-neutral-200 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded">
                            {b.category}
                          </span>
                          <span className="text-[10px] text-neutral-400">{b.date}</span>
                        </div>
                        <h4 className="font-display text-base font-bold uppercase text-neutral-900">
                          {b.title}
                        </h4>
                        <p className="text-xs text-neutral-600 mt-1 line-clamp-2">{b.excerpt}</p>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                        <button
                          onClick={() => {
                            const updated = draft.blogs.map((item) =>
                              item.id === b.id ? { ...item, published: !item.published } : item
                            );
                            setDraft({ ...draft, blogs: updated });
                          }}
                          className={`font-semibold ${b.published ? 'text-emerald-700' : 'text-neutral-400'}`}
                        >
                          {b.published ? 'Published' : 'Draft (Unpublished)'}
                        </button>
                        <div className="space-x-2">
                          <button
                            onClick={() => {
                              setIsNewBlog(false);
                              setEditingBlog({ ...b });
                            }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete article "${b.title}"?`)) {
                                setDraft({
                                  ...draft,
                                  blogs: draft.blogs.filter((item) => item.id !== b.id)
                                });
                                showNotification('Article deleted.');
                              }
                            }}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Blog Editor Modal */}
                {editingBlog && (
                  <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 border border-neutral-200">
                      <div className="flex items-center justify-between border-b pb-3">
                        <h4 className="font-display text-xl font-bold uppercase text-neutral-900">
                          {isNewBlog ? 'Create Editorial Article' : 'Edit Article'}
                        </h4>
                        <button onClick={() => setEditingBlog(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold text-neutral-700 mb-1">Article Title</label>
                          <input
                            type="text"
                            value={editingBlog.title}
                            onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                            className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900 font-semibold"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-bold text-neutral-700 mb-1">Category</label>
                            <input
                              type="text"
                              value={editingBlog.category}
                              onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                              className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-neutral-700 mb-1">Author</label>
                            <input
                              type="text"
                              value={editingBlog.author}
                              onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                              className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-neutral-700 mb-1">Excerpt</label>
                          <textarea
                            rows={2}
                            value={editingBlog.excerpt}
                            onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                            className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-neutral-700 mb-1">Article Content (Separate paragraphs with newlines)</label>
                          <textarea
                            rows={6}
                            value={editingBlog.content.join('\n\n')}
                            onChange={(e) =>
                              setEditingBlog({
                                ...editingBlog,
                                content: e.target.value.split('\n\n').filter((p) => p.trim())
                              })
                            }
                            className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900 leading-relaxed font-sans"
                          />
                        </div>

                        <div className="pt-3 border-t flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingBlog(null)}
                            className="px-4 py-2 border rounded font-bold uppercase text-neutral-700"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              let updated = [...draft.blogs];
                              if (isNewBlog) {
                                updated.unshift(editingBlog);
                              } else {
                                updated = updated.map((item) => (item.id === editingBlog.id ? editingBlog : item));
                              }
                              setDraft({ ...draft, blogs: updated });
                              setEditingBlog(null);
                              showNotification(`Article "${editingBlog.title}" saved!`);
                            }}
                            className="px-5 py-2 bg-red-600 text-white rounded font-bold uppercase"
                          >
                            Save Article
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB E: GALLERY MANAGER */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                      E. Gym Installation Gallery Manager
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Manage client installation case studies (Forge Hub, Peter's Gym, Wolf'N'Lean, Olympian Gym, Armed Forces).
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsNewInst(true);
                      setEditingInst({
                        id: 'inst-' + Date.now().toString(36),
                        name: 'New Commercial Gym Facility',
                        location: 'Pune, Maharashtra',
                        category: 'Commercial Gym',
                        completionDate: '2025',
                        description: 'Turnkey fitness equipment outfitting with custom colorway.',
                        imageUrl: '/src/assets/images/hero_commercial_gym_1794110545322.jpg',
                        equipmentCount: 35,
                        highlightSeries: ['HS Pro Series', 'FM Multi-Jungle'],
                        published: true
                      });
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {draft.installations.map((inst) => (
                    <div key={inst.id} className="bg-white rounded-xl border border-neutral-200 p-4 space-y-3">
                      <div className="aspect-16/10 rounded overflow-hidden bg-neutral-100">
                        <img src={inst.imageUrl} alt={inst.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-red-600 uppercase">{inst.category} · {inst.location}</div>
                        <h4 className="font-display text-base font-bold uppercase text-neutral-900">{inst.name}</h4>
                        <div className="text-xs text-neutral-500">{inst.equipmentCount} Stations Installed</div>
                      </div>
                      <div className="pt-2 border-t flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setIsNewInst(false);
                            setEditingInst({ ...inst });
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete installation "${inst.name}"?`)) {
                              setDraft({
                                ...draft,
                                installations: draft.installations.filter((item) => item.id !== inst.id)
                              });
                              showNotification('Installation deleted.');
                            }
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Installation Modal */}
                {editingInst && (
                  <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 border border-neutral-200">
                      <div className="flex items-center justify-between border-b pb-3">
                        <h4 className="font-display text-xl font-bold uppercase text-neutral-900">
                          {isNewInst ? 'Add Installation Project' : 'Edit Installation Project'}
                        </h4>
                        <button onClick={() => setEditingInst(null)} className="p-1 text-neutral-400">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="block font-bold text-neutral-700 mb-1">Gym / Project Name</label>
                          <input
                            type="text"
                            value={editingInst.name}
                            onChange={(e) => setEditingInst({ ...editingInst, name: e.target.value })}
                            className="w-full px-3 py-2 bg-neutral-50 border rounded font-semibold text-neutral-900"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block font-bold text-neutral-700 mb-1">Location (City, State)</label>
                            <input
                              type="text"
                              value={editingInst.location}
                              onChange={(e) => setEditingInst({ ...editingInst, location: e.target.value })}
                              className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-neutral-700 mb-1">Equipment Stations</label>
                            <input
                              type="number"
                              value={editingInst.equipmentCount}
                              onChange={(e) => setEditingInst({ ...editingInst, equipmentCount: Number(e.target.value) })}
                              className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-neutral-700 mb-1">Project Description</label>
                          <textarea
                            rows={3}
                            value={editingInst.description}
                            onChange={(e) => setEditingInst({ ...editingInst, description: e.target.value })}
                            className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                          />
                        </div>

                        <div className="pt-3 border-t flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingInst(null)}
                            className="px-4 py-2 border rounded font-bold uppercase"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              let updated = [...draft.installations];
                              if (isNewInst) {
                                updated.unshift(editingInst);
                              } else {
                                updated = updated.map((item) => (item.id === editingInst.id ? editingInst : item));
                              }
                              setDraft({ ...draft, installations: updated });
                              setEditingInst(null);
                              showNotification('Installation saved!');
                            }}
                            className="px-5 py-2 bg-red-600 text-white rounded font-bold uppercase"
                          >
                            Save Project
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB F: COMPANY INFO & MILESTONES */}
            {activeTab === 'company' && (
              <div className="max-w-4xl space-y-8">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                    F. Company Information & History Milestones
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Edit corporate contacts, Supreme Headquarters Baner address, and historical milestones.
                  </p>
                </div>

                {/* Contacts Section */}
                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold uppercase text-red-600 tracking-wider">
                    Regional Phone Numbers & Helplines
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Sales West & South</label>
                      <input
                        type="text"
                        value={draft.companyInfo.contacts.salesWestSouth}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            companyInfo: {
                              ...draft.companyInfo,
                              contacts: { ...draft.companyInfo.contacts, salesWestSouth: e.target.value }
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-neutral-50 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Sales East</label>
                      <input
                        type="text"
                        value={draft.companyInfo.contacts.salesEast}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            companyInfo: {
                              ...draft.companyInfo,
                              contacts: { ...draft.companyInfo.contacts, salesEast: e.target.value }
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-neutral-50 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Sales North</label>
                      <input
                        type="text"
                        value={draft.companyInfo.contacts.salesNorth}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            companyInfo: {
                              ...draft.companyInfo,
                              contacts: { ...draft.companyInfo.contacts, salesNorth: e.target.value }
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-neutral-50 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Sales Export</label>
                      <input
                        type="text"
                        value={draft.companyInfo.contacts.salesExport}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            companyInfo: {
                              ...draft.companyInfo,
                              contacts: { ...draft.companyInfo.contacts, salesExport: e.target.value }
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-neutral-50 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Service Helpline 1</label>
                      <input
                        type="text"
                        value={draft.companyInfo.contacts.service1}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            companyInfo: {
                              ...draft.companyInfo,
                              contacts: { ...draft.companyInfo.contacts, service1: e.target.value }
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-neutral-50 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Corporate Email</label>
                      <input
                        type="email"
                        value={draft.companyInfo.contacts.email}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            companyInfo: {
                              ...draft.companyInfo,
                              contacts: { ...draft.companyInfo.contacts, email: e.target.value }
                            }
                          })
                        }
                        className="w-full px-3 py-2 bg-neutral-50 border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Milestones Editor */}
                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase text-red-600 tracking-wider">
                      Timeline Milestones ({draft.milestones.length})
                    </h4>
                    <button
                      onClick={() => {
                        const newM: Milestone = {
                          id: 'm-' + Date.now().toString(36),
                          monthYear: '2026',
                          dateSort: '2026-01',
                          title: 'New Milestone Event',
                          description: 'Description of the milestone.'
                        };
                        setDraft({ ...draft, milestones: [...draft.milestones, newM] });
                        showNotification('New milestone added.');
                      }}
                      className="px-3 py-1 bg-neutral-900 text-white text-xs font-bold uppercase rounded flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  <div className="divide-y divide-neutral-200 max-h-80 overflow-y-auto">
                    {draft.milestones.map((m) => (
                      <div key={m.id} className="py-2.5 flex items-start justify-between gap-4 text-xs">
                        <div>
                          <div className="font-bold text-red-600">{m.monthYear}</div>
                          <div className="font-semibold text-neutral-900">{m.title}</div>
                          <div className="text-neutral-500">{m.description}</div>
                        </div>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete milestone "${m.title}"?`)) {
                              setDraft({
                                ...draft,
                                milestones: draft.milestones.filter((item) => item.id !== m.id)
                              });
                            }
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB G: CUSTOMIZATION EDITOR */}
            {activeTab === 'customization' && (
              <div className="max-w-4xl space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                    G. Customization Colorways Editor
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Add or update frame powder coating colors and upholstery leather swatches.
                  </p>
                </div>

                {/* Add new color form */}
                <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4">
                  <h4 className="text-xs font-bold uppercase text-red-600 tracking-wider">
                    Add New Swatch
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Color Name</label>
                      <input
                        type="text"
                        value={newColor.name}
                        onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                        placeholder="e.g. Cobalt Metallic"
                        className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Hex Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={newColor.hex}
                          onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                          className="w-10 h-8 p-0 rounded border cursor-pointer"
                        />
                        <input
                          type="text"
                          value={newColor.hex}
                          onChange={(e) => setNewColor({ ...newColor, hex: e.target.value })}
                          className="flex-1 px-2 py-1 bg-neutral-50 border rounded font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-700 mb-1">Component Type</label>
                      <select
                        value={newColor.type}
                        onChange={(e) => setNewColor({ ...newColor, type: e.target.value as any })}
                        className="w-full px-3 py-2 bg-neutral-50 border rounded"
                      >
                        <option value="frame">Frame Powder Coat</option>
                        <option value="upholstery">Upholstery Leather</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => {
                          if (!newColor.name.trim()) return;
                          const created: CustomizationColor = {
                            id: 'c-' + Date.now().toString(36),
                            name: newColor.name,
                            hex: newColor.hex,
                            type: newColor.type,
                            description: newColor.description
                          };
                          setDraft({ ...draft, colors: [...draft.colors, created] });
                          setNewColor({ name: '', hex: '#D32F2F', type: 'frame', description: '' });
                          showNotification(`Color "${created.name}" added!`);
                        }}
                        className="w-full py-2 bg-red-600 text-white font-bold uppercase rounded text-xs"
                      >
                        Add Swatch
                      </button>
                    </div>
                  </div>
                </div>

                {/* Colors List */}
                <div className="bg-white p-6 rounded-xl border border-neutral-200 space-y-4">
                  <h4 className="text-xs font-bold uppercase text-red-600 tracking-wider">
                    Current Configured Colors ({draft.colors.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
                    {draft.colors.map((c) => (
                      <div key={c.id} className="p-2.5 bg-neutral-50 rounded border border-neutral-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-5 h-5 rounded border border-neutral-300 shrink-0" style={{ backgroundColor: c.hex }} />
                          <div className="truncate">
                            <div className="font-semibold text-neutral-900 truncate">{c.name}</div>
                            <div className="text-[10px] text-neutral-500 uppercase">{c.type}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setDraft({ ...draft, colors: draft.colors.filter((item) => item.id !== c.id) });
                          }}
                          className="p-1 text-red-600 hover:bg-red-50 rounded shrink-0 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB H: SEO MANAGER */}
            {activeTab === 'seo' && (
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                    H. SEO & Meta Tags Manager
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Configure titles, meta descriptions, canonical URLs, and OpenGraph tags for search engines.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Browser Page Title</label>
                    <input
                      type="text"
                      value={draft.seo.metaTitle}
                      onChange={(e) => setDraft({ ...draft, seo: { ...draft.seo, metaTitle: e.target.value } })}
                      className="w-full px-3 py-2 bg-neutral-50 border rounded font-semibold text-neutral-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Meta Description</label>
                    <textarea
                      rows={3}
                      value={draft.seo.metaDescription}
                      onChange={(e) => setDraft({ ...draft, seo: { ...draft.seo, metaDescription: e.target.value } })}
                      className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900 leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Keywords</label>
                    <input
                      type="text"
                      value={draft.seo.keywords}
                      onChange={(e) => setDraft({ ...draft, seo: { ...draft.seo, keywords: e.target.value } })}
                      className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">Canonical URL</label>
                    <input
                      type="text"
                      value={draft.seo.canonicalUrl}
                      onChange={(e) => setDraft({ ...draft, seo: { ...draft.seo, canonicalUrl: e.target.value } })}
                      className="w-full px-3 py-2 bg-neutral-50 border rounded text-neutral-900 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB I: ENQUIRY MANAGER */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                      I. Customer Enquiry & Quote Lead Manager
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Review commercial quote requests and contact tickets submitted via the website. Update lead statuses.
                    </p>
                  </div>

                  {/* Export CSV Button */}
                  <button
                    onClick={() => {
                      const headers = ['ID', 'Type', 'Customer Name', 'Phone', 'Email', 'City', 'Facility', 'Status', 'Date', 'Message'];
                      const rows = draft.enquiries.map((e) => [
                        e.id,
                        e.type,
                        `"${e.customerName.replace(/"/g, '""')}"`,
                        `"${e.phone}"`,
                        `"${e.email}"`,
                        `"${e.city}"`,
                        `"${e.facilityType || ''}"`,
                        e.status,
                        e.createdAt,
                        `"${e.message.replace(/"/g, '""')}"`
                      ]);
                      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement('a');
                      link.setAttribute('href', encodedUri);
                      link.setAttribute('download', `into_wellness_leads_${new Date().toISOString().slice(0, 10)}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      link.remove();
                      showNotification('Leads exported to CSV.');
                    }}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase rounded flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-4 h-4 text-red-500" />
                    <span>Export Leads CSV</span>
                  </button>
                </div>

                {/* Enquiries List */}
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                  {draft.enquiries.length === 0 ? (
                    <div className="p-12 text-center text-xs text-neutral-500">
                      No customer enquiries in the database yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-neutral-200">
                      {draft.enquiries.map((enq) => {
                        const style = getStatusBadgeStyle(enq.status);
                        return (
                          <div key={enq.id} className="p-5 hover:bg-neutral-50 transition-colors space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${style.bg} ${style.text} ${style.border}`}>
                                  {enq.status}
                                </span>
                                <span className="font-display text-sm font-bold uppercase text-neutral-900">
                                  {enq.customerName}
                                </span>
                                <span className="text-xs text-neutral-500">({enq.facilityType || 'General'})</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-neutral-400">
                                  {new Date(enq.createdAt).toLocaleDateString()}
                                </span>
                                <select
                                  value={enq.status}
                                  onChange={(e) => {
                                    const updated = draft.enquiries.map((item) =>
                                      item.id === enq.id ? { ...item, status: e.target.value as EnquiryStatus } : item
                                    );
                                    setDraft({ ...draft, enquiries: updated });
                                    showNotification(`Enquiry status changed to ${e.target.value}`);
                                  }}
                                  className="text-xs px-2 py-1 bg-white border border-neutral-300 rounded font-semibold text-neutral-800"
                                >
                                  <option value="New">New</option>
                                  <option value="In Review">In Review</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Closed">Closed</option>
                                </select>
                                <button
                                  onClick={() => {
                                    if (window.confirm('Delete this enquiry record?')) {
                                      setDraft({
                                        ...draft,
                                        enquiries: draft.enquiries.filter((item) => item.id !== enq.id)
                                      });
                                      showNotification('Enquiry record deleted.');
                                    }
                                  }}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="text-xs grid grid-cols-1 sm:grid-cols-3 gap-2 text-neutral-600 bg-neutral-50 p-2.5 rounded border border-neutral-200">
                              <div><span className="font-bold text-neutral-700">Phone:</span> {enq.phone}</div>
                              <div><span className="font-bold text-neutral-700">Email:</span> {enq.email}</div>
                              <div><span className="font-bold text-neutral-700">City:</span> {enq.city}</div>
                            </div>

                            <p className="text-xs text-neutral-700 leading-relaxed font-normal">
                              {enq.message}
                            </p>

                            {enq.seriesInterest && enq.seriesInterest.length > 0 && (
                              <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                                <span className="text-neutral-500 font-semibold">Series Requested:</span>
                                {enq.seriesInterest.map((s, idx) => (
                                  <span key={idx} className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.2 rounded font-medium">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
