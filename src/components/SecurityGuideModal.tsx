import React, { useEffect } from 'react';
import { X, ShieldCheck, AlertOctagon, CheckCircle2, Lock, ExternalLink } from 'lucide-react';
import { OFFICIAL_SECURITY_TIPS } from '../data/appsData';

interface SecurityGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityGuideModal: React.FC<SecurityGuideModalProps> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">دليل الأمان ومكافحة التطبيقات المزيفة</h3>
              <p className="text-xs text-emerald-200">إرشادات رسمية لحماية بياناتك وأموالك من الاحتيال الرقمي</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 flex items-start gap-3">
            <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed">
              <strong>تحذير أمني هام:</strong> تتكرر محاولات إنشاء تطبيقات ومواقع وهمية تنتحل أسماء وزارات ومؤسسات سورية (خصوصاً نتائج الامتحانات، حجز جوازات السفر، ومنصات الدفع الإلكتروني) بهدف سرقة البيانات واختراق المحافظ.
            </div>
          </div>

          <div className="space-y-3">
            {OFFICIAL_SECURITY_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-1.5"
              >
                <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{tip.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed pr-6">
                  {tip.text}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-200">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              في حال تعرضك لأي ابتزاز أو محاولة احتيال إلكتروني، يمكنك التبليغ المباشر عبر تطبيق <strong>"صوتك وصل"</strong> التابع لوزارة الداخلية أو مراجعة فرع مكافحة الجرائم المعلوماتية.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-700 rounded-xl transition-colors"
          >
            فهمت الإرشادات
          </button>
        </div>
      </div>
    </div>
  );
};
