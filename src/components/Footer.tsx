import React from 'react';
import { ArrowUp, ShieldCheck, ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSecurityModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSecurityModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-400 flex items-center justify-center font-bold text-sm">
                س
              </div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100">
                دليل التطبيقات الحكومية السورية
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed max-w-md">
              منصة رقمية تفاعلية موحدة تهدف إلى تسهيل وصول المواطنين السوريين في الداخل والمغتربين إلى التطبيقات والخدمات الإلكترونية الرسمية، وشرح آليات عملها والمتطلبات القانونية المعتمدة لكل معاملة.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs">
              روابط حكومية سريعة
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="http://moed.gov.sy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>وزارة التربية السورية</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://syrian-interior.gov.sy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>وزارة الداخلية السورية</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://mofaex.gov.sy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>وزارة الخارجية والمغتربين</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://ecsc.gov.sy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <span>مركز خدمة المواطن الإلكتروني</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Safety & Compliance */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs">
              التوعية والأمان الرقمي
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              احرص دائماً على فحص الروابط والنطاقات الرسمية المعتمدة (.gov.sy) قبل إدخال أي أرقام وطنية أو بيانات مصرفية.
            </p>
            <button
              onClick={onOpenSecurityModal}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold hover:underline"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>مراجعة إرشادات التحقق ومكافحة الاحتيال</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            دليل التطبيقات الحكومية السورية © {new Date().getFullYear()} · المنصة الوطنية الموحدة
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition-colors"
            >
              <span>العودة إلى الأعلى</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
