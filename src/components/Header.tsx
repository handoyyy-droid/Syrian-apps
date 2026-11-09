import React from 'react';
import { ShieldCheck, Heart, Moon, Sun, Info, Share2, Search, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  onOpenSecurityModal: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  totalAppsCount: number;
  filteredCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  onOpenSecurityModal,
  isDarkMode,
  onToggleDarkMode,
  totalAppsCount,
  filteredCount,
}) => {
  const [copiedShare, setCopiedShare] = React.useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'دليل التطبيقات الحكومية السورية',
          text: 'دليل شامل وموثق لكافة التطبيقات والمنصات الحكومية السورية الرسمية وخدماتها الإلكترونية.',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      }
    } catch {
      // ignore aborts
    }
  };

  const quickSearches = ['نتائج الامتحانات', 'الشؤون المدنية', 'شام كاش', 'صوتك وصل', 'محلولة', 'Mofa Sy'];

  return (
    <header className="relative border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md transition-colors">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          {/* Brand Zone */}
          <div className="flex items-center gap-3">
            <a href="/" className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center shadow-sm border border-emerald-700/30 overflow-hidden shrink-0">
              <img src="/favicon.svg" alt="شعار دليل التطبيقات الحكومية السورية" className="w-9 h-9" />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 font-sans">
                  دليل التطبيقات الحكومية السورية
                </h1>
                <span className="hidden sm:inline-block text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  النسخة الموحدة الرسمية
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 hidden sm:block">
                المنصة الوطنية للتعريف بالخدمات والتطبيقات الرقمية المعتمدة
              </p>
            </div>
          </div>

          {/* Nav Controls & Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Link to Applications Under Development */}
            <a
              href="#under-development"
              title="استعراض التطبيقات الحكومية قيد التطوير والإطلاق"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-800 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>قيد التطوير</span>
            </a>

            {/* Security Advisory Button */}
            <button
              onClick={onOpenSecurityModal}
              title="دليل الأمان والتأكد من موثوقية التطبيقات"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline">دليل الأمان والتحقق</span>
            </button>

            {/* Favorites Toggle */}
            <button
              onClick={onToggleFavoritesOnly}
              title="عرض التطبيقات المحفوظة في المفضلة"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                showFavoritesOnly
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                  : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  showFavoritesOnly ? 'fill-rose-500 text-rose-500' : 'text-stone-500 dark:text-stone-400'
                }`}
              />
              <span className="hidden sm:inline">المفضلة</span>
              {favoritesCount > 0 && (
                <span className="w-4.5 h-4.5 rounded-full text-[10px] font-bold bg-rose-600 text-white flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Share Directory */}
            <button
              onClick={handleShare}
              title="مشاركة رابط الدليل"
              className="p-2 text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedShare && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">تم النسخ!</span>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الليلي'}
              className="p-2 text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Hero & Real-Time Search Banner */}
      <div className="border-t border-stone-100 dark:border-stone-800/80 bg-gradient-to-b from-stone-50/80 via-white to-white dark:from-stone-900/60 dark:via-stone-900 dark:to-stone-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-2">
            <span>الجمهورية العربية السورية</span>
            <span>·</span>
            <span>بوابة التحول الرقمي والخدمات الإلكترونية</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight leading-snug">
            كل التطبيقات والخدمات الحكومية في مكان واحد
          </h2>

          <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto">
            دليل وطني شامل لمعرفة التطبيقات الحكومية السورية الرسمية، وشرح خدماتها وخطوات الاستفادة منها، وتجنب الروابط والتطبيقات المزيفة.
          </p>

          {/* Real-Time Search Box */}
          <div className="mt-6 relative max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
                <Search className="w-5 h-5 text-emerald-700 dark:text-emerald-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحث بالاسم، الوزارة، الخدمة (مثال: نتائج الامتحانات، حجز موعد، شكاوى، شام كاش)..."
                className="w-full pr-12 pl-12 py-3.5 text-sm sm:text-base bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-2xl border-2 border-stone-200 dark:border-stone-700 shadow-sm hover:border-emerald-500 focus:border-emerald-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  title="مسح البحث"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Search Chips */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
              <span className="text-stone-400 dark:text-stone-500">الأكثر بحثاً:</span>
              {quickSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => onSearchChange(term)}
                  className="px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/60 dark:hover:text-emerald-400 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Result Stats Indicator */}
            <div className="mt-2 text-xs text-stone-500 dark:text-stone-400 flex items-center justify-center gap-3">
              <span>
                عرض <strong className="font-semibold text-emerald-700 dark:text-emerald-400">{filteredCount}</strong> تطبيق
                من أصل {totalAppsCount}
              </span>
              {showFavoritesOnly && (
                <span className="text-rose-600 dark:text-rose-400 font-medium">· تصفية المفضلة مفعلة</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
