import React, { useState } from 'react';
import { UNDER_DEV_APPS } from '../data/appsData';
import { UnderDevApp } from '../types';
import {
  Sparkles,
  Clock,
  Calendar,
  Building,
  CheckCircle,
  Bell,
  BellRing,
  Scale,
  GraduationCap,
  Train,
  Briefcase,
  Stethoscope,
  Compass,
  Layers
} from 'lucide-react';

export const UnderDevSection: React.FC = () => {
  const [subscribedApps, setSubscribedApps] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleSubscribe = (appId: string, appName: string) => {
    if (subscribedApps.includes(appId)) {
      setSubscribedApps(prev => prev.filter(id => id !== appId));
      setToastMessage(`تم إلغاء التنبيه لتطبيق "${appName}"`);
    } else {
      setSubscribedApps(prev => [...prev, appId]);
      setToastMessage(`سيتم إشعارك فور إطلاق وتوفر تطبيق "${appName}" رسمياً`);
    }
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getDevIcon = (iconName: string) => {
    const cls = "w-6 h-6";
    switch (iconName) {
      case 'Scale':
        return <Scale className={cls} />;
      case 'GraduationCap':
        return <GraduationCap className={cls} />;
      case 'Train':
        return <Train className={cls} />;
      case 'Briefcase':
        return <Briefcase className={cls} />;
      case 'Stethoscope':
        return <Stethoscope className={cls} />;
      case 'Compass':
        return <Compass className={cls} />;
      default:
        return <Layers className={cls} />;
    }
  };

  return (
    <section id="under-development" className="mt-16 pt-12 border-t-2 border-dashed border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold mb-2">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>مشاريع التحول الرقمي القادمة</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100">
              تطبيقات قيد التطوير والإطلاق (Applications Under Development)
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
              استعراض لأبرز التطبيقات والمنصات الحكومية السورية المخططة أو الجاري تطويرها وأتمتتها برمجياً من قبل الوزارات والمؤسسات الرسمية، مع نبذة عن خدماتها المتوقعة وجداول إطلاقها.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <span>يتم تحديث الجداول حسب بيانات الوزارات الرسمية</span>
          </div>
        </div>

        {/* Toast feedback */}
        {toastMessage && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-900 text-white text-xs font-medium flex items-center gap-2 shadow-lg animate-in fade-in duration-200">
            <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Blueprint-styled Grid of Under Development Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNDER_DEV_APPS.map((devApp) => {
            const isSubscribed = subscribedApps.includes(devApp.id);

            return (
              <div
                key={devApp.id}
                className="relative flex flex-col justify-between bg-stone-100/60 dark:bg-stone-900/50 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700/80 p-5 sm:p-6 transition-all duration-200 hover:border-amber-500/80 dark:hover:border-amber-500/80 hover:bg-white dark:hover:bg-stone-850 shadow-xs"
              >
                <div>
                  {/* Top Status & Blueprint Badge */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 border border-amber-300 dark:border-amber-800/80">
                      {getDevIcon(devApp.iconName)}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                        {devApp.status}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        <span>متوقع: {devApp.expectedLaunch}</span>
                      </div>
                    </div>
                  </div>

                  {/* Entity kicker & App Title */}
                  <div className="text-xs text-stone-500 dark:text-stone-400 mb-1 flex items-center gap-1.5">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">{devApp.entityShort}</span>
                    <span aria-hidden="true">·</span>
                    <span>{devApp.sector}</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
                    {devApp.name}
                  </h4>
                  <div className="text-[11px] font-mono text-stone-400 dark:text-stone-500 mb-3">
                    {devApp.englishName}
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
                    {devApp.summary}
                  </p>

                  {/* Anticipated Features List */}
                  <div className="space-y-1.5 pt-3 border-t border-stone-200 dark:border-stone-800">
                    <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 block mb-1">
                      الخدمات والميزات المتوقعة:
                    </span>
                    {devApp.keyAnticipatedFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bar and alert subscription action */}
                <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                      <span>نسبة الإنجاز التقريبي:</span>
                      <span className="font-bold font-mono text-amber-700 dark:text-amber-400">
                        {devApp.progressPercent}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${devApp.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSubscribe(devApp.id, devApp.name)}
                    className={`w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-xl border transition-all ${
                      isSubscribed
                        ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700'
                        : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border-stone-200 dark:border-stone-700 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:border-amber-300'
                    }`}
                  >
                    {isSubscribed ? (
                      <>
                        <BellRing className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>تم تفعيل التنبيه عند التوفر</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4 text-stone-400" />
                        <span>تنبيهي عند الإطلاق الرسمي</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
