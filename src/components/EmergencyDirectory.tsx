import React, { useState } from 'react';
import { SYRIAN_EMERGENCY_HOTLINES } from '../data/appsData';
import { Phone, Ambulance, Shield, Flame, Zap, Droplet, ShoppingBag, Lock, Copy, Check } from 'lucide-react';

export const EmergencyDirectory: React.FC = () => {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const getHotlineIcon = (iconName: string) => {
    const cls = "w-4 h-4";
    switch (iconName) {
      case 'Ambulance':
        return <Ambulance className={cls} />;
      case 'Shield':
        return <Shield className={cls} />;
      case 'Flame':
        return <Flame className={cls} />;
      case 'Zap':
        return <Zap className={cls} />;
      case 'Droplet':
        return <Droplet className={cls} />;
      case 'ShoppingBag':
        return <ShoppingBag className={cls} />;
      case 'Lock':
        return <Lock className={cls} />;
      default:
        return <Phone className={cls} />;
    }
  };

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <section className="mt-16 pt-12 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-400 mb-1">
              <span>أرقام الطوارئ والاتصال الحكومي السريع</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
              دليل خطوط الطوارئ والشكاوى المباشرة في سورية
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              أرقام مجانية ومباشرة للاتصال الفوري بمراكز العمليات ومنظومات الطوارئ والخدمات العامة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SYRIAN_EMERGENCY_HOTLINES.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-stone-800 rounded-2xl p-4 border border-stone-200 dark:border-stone-700/80 shadow-xs flex items-center justify-between gap-3 hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-700/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  {getHotlineIcon(item.iconName)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {item.ministry}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <span className="text-sm font-extrabold font-mono text-emerald-800 dark:text-emerald-400 px-2 py-1 rounded bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
                  {item.number}
                </span>
                <button
                  onClick={() => handleCopy(item.number)}
                  title="نسخ الرقم"
                  className="p-1.5 text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-md hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                >
                  {copiedNumber === item.number ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
