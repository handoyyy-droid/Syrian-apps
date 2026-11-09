import React from 'react';
import { GovApp } from '../types';
import {
  GraduationCap,
  Fingerprint,
  ShieldAlert,
  Building2,
  MapPin,
  Globe2,
  HeartPulse,
  Landmark,
  Users,
  CreditCard,
  FileCheck,
  Fuel,
  Heart,
  ChevronLeft,
  Smartphone,
  Globe,
  Apple,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface AppCardProps {
  app: GovApp;
  onSelect: (app: GovApp) => void;
  isFavorite: boolean;
  onToggleFavorite: (appId: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  onSelect,
  isFavorite,
  onToggleFavorite,
}) => {
  const getAppIcon = (name: string) => {
    const iconClass = "w-6 h-6";
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Fingerprint':
        return <Fingerprint className={iconClass} />;
      case 'ShieldAlert':
        return <ShieldAlert className={iconClass} />;
      case 'Building2':
        return <Building2 className={iconClass} />;
      case 'MapPin':
        return <MapPin className={iconClass} />;
      case 'Globe2':
        return <Globe2 className={iconClass} />;
      case 'HeartPulse':
        return <HeartPulse className={iconClass} />;
      case 'Landmark':
        return <Landmark className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'CreditCard':
        return <CreditCard className={iconClass} />;
      case 'FileCheck':
        return <FileCheck className={iconClass} />;
      case 'Fuel':
        return <Fuel className={iconClass} />;
      default:
        return <Building2 className={iconClass} />;
    }
  };

  const getThemeColors = (categoryId: string) => {
    switch (categoryId) {
      case 'education':
        return {
          iconBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300',
          badge: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          primaryBtn: 'bg-emerald-800 hover:bg-emerald-900 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600',
        };
      case 'civil_interior':
        return {
          iconBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300',
          badge: 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
          primaryBtn: 'bg-blue-800 hover:bg-blue-900 text-white dark:bg-blue-700 dark:hover:bg-blue-600',
        };
      case 'municipal_local':
        return {
          iconBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300',
          badge: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          primaryBtn: 'bg-amber-800 hover:bg-amber-900 text-white dark:bg-amber-700 dark:hover:bg-amber-600',
        };
      case 'diplomatic_health':
        return {
          iconBg: 'bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300',
          badge: 'bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800',
          primaryBtn: 'bg-teal-800 hover:bg-teal-900 text-white dark:bg-teal-700 dark:hover:bg-teal-600',
        };
      case 'realestate':
        return {
          iconBg: 'bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-300',
          badge: 'bg-stone-100 text-stone-800 dark:bg-stone-800/80 dark:text-stone-300 border-stone-300 dark:border-stone-700',
          primaryBtn: 'bg-stone-800 hover:bg-stone-900 text-white dark:bg-stone-700 dark:hover:bg-stone-600',
        };
      case 'community':
        return {
          iconBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300',
          badge: 'bg-purple-50 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
          primaryBtn: 'bg-purple-800 hover:bg-purple-900 text-white dark:bg-purple-700 dark:hover:bg-purple-600',
        };
      case 'finance_pay':
        return {
          iconBg: 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200',
          badge: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          primaryBtn: 'bg-emerald-800 hover:bg-emerald-900 text-white dark:bg-emerald-700 dark:hover:bg-emerald-600',
        };
      default:
        return {
          iconBg: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300',
          badge: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700',
          primaryBtn: 'bg-stone-800 hover:bg-stone-900 text-white dark:bg-stone-700 dark:hover:bg-stone-600',
        };
    }
  };

  const theme = getThemeColors(app.categoryId);

  return (
    <div 
      className="group relative flex flex-col justify-between bg-white dark:bg-stone-850 rounded-2xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200"
    >
      {/* Top Header Row of the Card */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${theme.iconBg}`}>
              {getAppIcon(app.iconName)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span className="font-semibold text-stone-700 dark:text-stone-300">{app.entityShort}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[11px] font-mono">{app.englishName}</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5 leading-snug">
                {app.name}
              </h4>
            </div>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(app.id);
            }}
            title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            className="p-2 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700/60 transition-colors shrink-0"
          >
            <Heart
              className={`w-5 h-5 transition-transform group-active:scale-90 ${
                isFavorite ? 'fill-rose-500 text-rose-500' : ''
              }`}
            />
          </button>
        </div>

        {/* Official Entity & Badge */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className={`inline-block px-2.5 py-0.5 rounded-md font-medium text-[11px] border ${theme.badge}`}>
            {app.badge}
          </span>
          <span className="text-stone-400 dark:text-stone-500 text-[11px]">
            {app.entity.length > 32 ? app.entity.substring(0, 32) + '...' : app.entity}
          </span>
        </div>

        {/* Concise Functional Summary */}
        <p className="mt-3 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">
          {app.summary}
        </p>

        {/* 2 Key Feature Highlights */}
        <div className="mt-4 space-y-1.5 pt-3 border-t border-stone-100 dark:border-stone-800">
          {app.keyFeatures.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer: Platforms, Working Official Link, and Details Modal Button */}
      <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800 space-y-3">
        {/* Supported Platforms icons row */}
        <div className="flex items-center justify-between text-stone-400 dark:text-stone-500 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span>متاح عبر:</span>
            {app.platforms.includes('android') && (
              <span title="تطبيق أندرويد (APK / متجر)" className="p-1 rounded bg-stone-100 dark:bg-stone-700/50 text-emerald-600 dark:text-emerald-400">
                <Smartphone className="w-3.5 h-3.5" />
              </span>
            )}
            {app.platforms.includes('web') && (
              <span title="بوابة إلكترونية عبر المتصفح" className="p-1 rounded bg-stone-100 dark:bg-stone-700/50 text-blue-600 dark:text-blue-400">
                <Globe className="w-3.5 h-3.5" />
              </span>
            )}
            {app.platforms.includes('ios') && (
              <span title="متوفر لأجهزة آيفون iOS" className="p-1 rounded bg-stone-100 dark:bg-stone-700/50 text-stone-600 dark:text-stone-300">
                <Apple className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">
            {new URL(app.officialUrl).hostname}
          </span>
        </div>

        {/* Action Buttons: Direct Working Official Link + Full Details */}
        <div className="flex items-center gap-2 pt-1">
          {/* Direct Working Official Website Link */}
          <a
            href={app.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-xl transition-all shadow-xs"
            title={`فتح الرابط الرسمي المباشر: ${app.officialUrl}`}
          >
            <span>الموقع الرسمي</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* View Details / Modal Button */}
          <button
            onClick={() => onSelect(app)}
            className="flex items-center justify-center gap-1 py-2 px-3 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-xl transition-colors shrink-0"
            title="عرض الشرح الكامل والميزات والمتطلبات وخطوات الاستخدام"
          >
            <span>التفاصيل والشرح</span>
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
