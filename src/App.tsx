import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES, GOV_APPS } from './data/appsData';
import { CategoryId, GovApp, PlatformType } from './types';
import { Header } from './components/Header';
import { CategoryFilter } from './components/CategoryFilter';
import { AppCard } from './components/AppCard';
import { AppModal } from './components/AppModal';
import { SecurityGuideModal } from './components/SecurityGuideModal';
import { UnderDevSection } from './components/UnderDevSection';
import { EmergencyDirectory } from './components/EmergencyDirectory';
import { Footer } from './components/Footer';
import { 
  Search, 
  RotateCcw, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  CreditCard,
  FileQuestion
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType | 'all'>('all');
  const [selectedApp, setSelectedApp] = useState<GovApp | null>(null);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Dark mode state with persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sy_gov_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Favorites state with persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sy_gov_favorites');
        return saved ? JSON.parse(saved) : ['exam-results', 'civil-affairs', 'sham-cash'];
      } catch {
        return ['exam-results', 'civil-affairs', 'sham-cash'];
      }
    }
    return ['exam-results', 'civil-affairs', 'sham-cash'];
  });

  // Apply dark mode class to documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sy_gov_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sy_gov_theme', 'light');
    }
  }, [isDarkMode]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('sy_gov_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (appId: string) => {
    setFavorites((prev) =>
      prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
    );
  };

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      all: GOV_APPS.length,
      education: 0,
      civil_interior: 0,
      municipal_local: 0,
      diplomatic_health: 0,
      realestate: 0,
      community: 0,
      finance_pay: 0,
    };

    GOV_APPS.forEach((app) => {
      if (counts[app.categoryId] !== undefined) {
        counts[app.categoryId] += 1;
      }
    });

    return counts;
  }, []);

  // Filter applications based on category, search, platform, and favorites
  const filteredApps = useMemo(() => {
    return GOV_APPS.filter((app) => {
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(app.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && app.categoryId !== selectedCategory) {
        return false;
      }

      // Platform filter
      if (selectedPlatform !== 'all' && !app.platforms.includes(selectedPlatform)) {
        return false;
      }

      // Search query filter (matches name, englishName, entity, summary, keyFeatures, requirements)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = app.name.toLowerCase().includes(q);
        const matchesEnglish = app.englishName.toLowerCase().includes(q);
        const matchesEntity = app.entity.toLowerCase().includes(q);
        const matchesSummary = app.summary.toLowerCase().includes(q);
        const matchesFeatures = app.keyFeatures.some((f) => f.toLowerCase().includes(q));
        const matchesRequirements = app.requirements.some((r) => r.toLowerCase().includes(q));
        return matchesName || matchesEnglish || matchesEntity || matchesSummary || matchesFeatures || matchesRequirements;
      }

      return true;
    });
  }, [selectedCategory, selectedPlatform, searchQuery, showFavoritesOnly, favorites]);

  // Reset all active filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedPlatform('all');
    setShowFavoritesOnly(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header & Search Bar */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        onOpenSecurityModal={() => setIsSecurityModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        totalAppsCount={GOV_APPS.length}
        filteredCount={filteredApps.length}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* Interactive Categories & Platform Navigation */}
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={setSelectedPlatform}
          categoryCounts={categoryCounts}
        />

        {/* Apps Grid Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Active Filter Bar if applied */}
          {(searchQuery || selectedCategory !== 'all' || selectedPlatform !== 'all' || showFavoritesOnly) && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white dark:bg-stone-850 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-stone-700 dark:text-stone-300">التصفية النشطة:</span>
                {searchQuery && (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    بحث: &ldquo;{searchQuery}&rdquo;
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-200">
                    {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  </span>
                )}
                {selectedPlatform !== 'all' && (
                  <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-200">
                    منصة: {selectedPlatform === 'android' ? 'أندرويد' : selectedPlatform === 'web' ? 'بوابة ويب' : 'iOS'}
                  </span>
                )}
                {showFavoritesOnly && (
                  <span className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                    المفضلة فقط
                  </span>
                )}
              </div>

              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
            </div>
          )}

          {/* Cards Grid */}
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <AppCard
                  key={app.id}
                  app={app}
                  onSelect={setSelectedApp}
                  isFavorite={favorites.includes(app.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white dark:bg-stone-850 rounded-3xl border border-stone-200 dark:border-stone-800 max-w-xl mx-auto my-8">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-700/60 flex items-center justify-center mx-auto text-stone-400 mb-4">
                <FileQuestion className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                لم يتم العثور على نتائج مطابقة
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-md mx-auto">
                جرب تغيير مصطلحات البحث أو إزالة بعض الفلاتر (مثل تحديد المنصة أو القطاع) لعرض كافة التطبيقات الحكومية.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-semibold shadow-xs transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إلغاء التصفية وعرض كل التطبيقات</span>
              </button>
            </div>
          )}
        </section>

        {/* Applications Under Development Section */}
        <UnderDevSection />

        {/* Emergency Hotlines Directory Section */}
        <EmergencyDirectory />
      </main>

      {/* Detail Modal for Selected App */}
      <AppModal
        app={selectedApp}
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        isFavorite={selectedApp ? favorites.includes(selectedApp.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Security and Verification Advice Modal */}
      <SecurityGuideModal
        isOpen={isSecurityModalOpen}
        onClose={() => setIsSecurityModalOpen(false)}
      />

      {/* Footer */}
      <Footer onOpenSecurityModal={() => setIsSecurityModalOpen(true)} />
    </div>
  );
}
