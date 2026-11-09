import React, { useEffect, useState } from 'react';
import { GovApp } from '../types';
import {
  X,
  ExternalLink,
  Heart,
  Share2,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Layers,
  HelpCircle,
  Copy,
  Smartphone,
  Globe,
  Apple,
  ShieldCheck,
  Check
} from 'lucide-react';

interface AppModalProps {
  app: GovApp | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (appId: string) => void;
}

export const AppModal: React.FC<AppModalProps> = ({
  app,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'requirements' | 'safety'>('overview');
  const [copied, setCopied] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !app) return null;

  const handleCopyDetails = () => {
    const textToCopy = `*${app.name}* (${app.entity})\n${app.summary}\n\nأهم الميزات:\n${app.keyFeatures.map((f, i) => `${i + 1}. ${f}`).join('\n')}\n\nالموقع الرسمي: ${app.officialUrl || 'الموقع الحكومي المعتمد'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-850/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span className="font-semibold text-emerald-800 dark:text-emerald-400">{app.entity}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[11px]">{app.englishName}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 mt-1">
                {app.name}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-block px-2.5 py-0.5 rounded-md font-medium bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {app.badge}
                </span>
                <span className="text-stone-500 dark:text-stone-400">
                  المنصات: {app.platforms.map(p => p === 'android' ? 'أندرويد' : p === 'web' ? 'بوابة ويب' : 'iOS').join('، ')}
                </span>
              </div>
            </div>

            {/* Top Actions: Close, Favorite, Copy */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onToggleFavorite(app.id)}
                title={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                className={`p-2 rounded-xl border transition-colors ${
                  isFavorite
                    ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/50 dark:border-rose-900 dark:text-rose-400'
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <button
                onClick={handleCopyDetails}
                title="نسخ ملخص التطبيق وميزاته"
                className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </button>

              <button
                onClick={onClose}
                title="إغلاق النافذة"
                className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Navigation Tabs inside Modal */}
          <div className="mt-4 flex items-center gap-2 border-t border-stone-200 dark:border-stone-800 pt-3 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'overview'
                  ? 'bg-emerald-800 text-white dark:bg-emerald-700'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>الشرح والميزات</span>
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'steps'
                  ? 'bg-emerald-800 text-white dark:bg-emerald-700'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>خطوات الاستخدام</span>
            </button>
            <button
              onClick={() => setActiveTab('requirements')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'requirements'
                  ? 'bg-emerald-800 text-white dark:bg-emerald-700'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>المتطلبات والأوراق</span>
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'safety'
                  ? 'bg-emerald-800 text-white dark:bg-emerald-700'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>الأمان والموثوقية</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          {/* TAB 1: Overview & Features */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-2">
                  الشرح المفصل للخدمة وكيفية الاستفادة منها:
                </h4>
                <p className="text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                  {app.fullDescription}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
                  أهم الميزات والقدرات التي يقدمها التطبيق:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {app.keyFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/70 dark:border-stone-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-stone-800 dark:text-stone-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Note for Sham Cash or Financial Wallets */}
              {app.categoryId === 'finance_pay' && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                  <strong>توضيح طبيعة الخدمة:</strong> {app.name} ليست جهة حكومية مباشرة، بل هي منظومة محفظة دفع إلكتروني رقمية مرخصة رسمياً من مصرف سورية المركزي وموصولة مع الشبكة الوطنية للمدفوعات السورية، وتقدم خدمات سداد الفواتير الحكومية والمعاملات والرسوم.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Steps */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
                خطوات استخدام التطبيق من البداية وحتى إنجاز المعاملة:
              </h4>
              <div className="space-y-3">
                {app.howToUse.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200/80 dark:border-stone-800"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Requirements */}
          {activeTab === 'requirements' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-3">
                المتطلبات والأوراق والشروط اللازمة للاستفادة من التطبيق:
              </h4>
              <ul className="space-y-2.5">
                {app.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-800 dark:text-stone-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* TAB 4: Safety Advice */}
          {activeTab === 'safety' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>تنبيه أمان وتدقيق رسمي خاص بتطبيق {app.name}:</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                  {app.safetyTip}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-2">
                <h5 className="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm">
                  قواعد عامة للتحقق من تطبيقات الوزارات السورية:
                </h5>
                <ul className="text-xs text-stone-600 dark:text-stone-400 space-y-1.5 list-disc list-inside leading-relaxed">
                  <li>لا تقم بتثبيت أي ملفات APK ترسل عبر تطبيقات واتساب أو تيليغرام.</li>
                  <li>تأكد دائماً أن رابط المتصفح ينتهي بنطاق الحكومة السورية الرسمي (.gov.sy).</li>
                  <li>لا تدفع أي مبالغ أو عمولات بحجة تسريع الاستعلام أو استخراج الوثائق.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Bar Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-mono text-emerald-700 dark:text-emerald-400 font-medium">
              {app.officialUrl}
            </span>
            {copied && <span className="text-emerald-600 dark:text-emerald-400 font-semibold mr-2">تم النسخ بنجاح!</span>}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(app.officialUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              title="نسخ رابط الموقع الرسمي"
              className="px-3 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>نسخ الرابط</span>
            </button>

            {app.officialUrl && (
              <a
                href={app.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 dark:hover:bg-emerald-600 rounded-xl transition-colors shadow-xs"
              >
                <span>زيارة الموقع الرسمي</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 rounded-xl transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
