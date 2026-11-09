import React from 'react';
import { Category, CategoryId, PlatformType } from '../types';
import { 
  LayoutGrid, 
  GraduationCap, 
  ShieldCheck, 
  Building2, 
  HeartHandshake, 
  Landmark, 
  Users, 
  CreditCard,
  Smartphone,
  Globe,
  Apple
} from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
  selectedPlatform: PlatformType | 'all';
  onSelectPlatform: (platform: PlatformType | 'all') => void;
  categoryCounts: Record<CategoryId, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedPlatform,
  onSelectPlatform,
  categoryCounts,
}) => {
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      case 'Building2':
        return <Building2 className="w-4 h-4" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4" />;
      case 'Landmark':
        return <Landmark className="w-4 h-4" />;
      case 'Users':
        return <Users className="w-4 h-4" />;
      case 'CreditCard':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div className="py-6 border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Categories Header & Platform Filter Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              تصنيف القطاعات والوزارات
            </h3>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              (اختر القطاع لعرض التطبيقات التابعة له)
            </span>
          </div>

          {/* Platform Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-800 rounded-xl text-xs font-medium">
            <span className="text-stone-500 dark:text-stone-400 px-2 hidden md:inline">المنصة:</span>
            <button
              onClick={() => onSelectPlatform('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedPlatform === 'all'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => onSelectPlatform('android')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                selectedPlatform === 'android'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>أندرويد</span>
            </button>
            <button
              onClick={() => onSelectPlatform('web')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                selectedPlatform === 'web'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>بوابة ويب</span>
            </button>
            <button
              onClick={() => onSelectPlatform('ios')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all ${
                selectedPlatform === 'ios'
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <Apple className="w-3.5 h-3.5" />
              <span>iOS</span>
            </button>
          </div>
        </div>

        {/* Categories Buttons Grid/Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
          {categories.map((cat) => {
            const count = categoryCounts[cat.id] ?? 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-900 dark:bg-emerald-700 dark:border-emerald-600 shadow-sm'
                    : 'bg-white dark:bg-stone-800/90 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700/80 hover:bg-stone-50 dark:hover:bg-stone-700/60'
                }`}
              >
                <span className={isSelected ? 'text-amber-300' : 'text-emerald-700 dark:text-emerald-400'}>
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold tabular-nums ${
                    isSelected
                      ? 'bg-emerald-950/60 text-emerald-100'
                      : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
