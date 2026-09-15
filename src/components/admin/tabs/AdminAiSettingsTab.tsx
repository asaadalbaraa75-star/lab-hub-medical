import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Send,
  Zap,
  ShieldAlert,
  BrainCircuit,
  MessageSquareQuote
} from 'lucide-react';
import { User } from '../../../types';
import { apiService } from '../../../services/apiService';

interface Props {
  currentUser: User;
}

export const AdminAiSettingsTab: React.FC<Props> = ({ currentUser }) => {
  const [modelName, setModelName] = useState('gemini-3.8-flash');
  const [pedagogicalStyle, setPedagogicalStyle] = useState('ospe_focus');
  const [enableQuickChips, setEnableQuickChips] = useState(true);
  const [enableClinicalExamples, setEnableClinicalExamples] = useState(true);
  const [temperature, setTemperature] = useState(0.4);

  // Playground test state
  const [testQuestion, setTestQuestion] = useState('What is the clinical significance of a fracture at the surgical neck of the humerus?');
  const [testMode, setTestMode] = useState<any>('exam_tip');
  const [testAnswer, setTestAnswer] = useState('');
  const [testSource, setTestSource] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  const handleTestTutor = async () => {
    if (!testQuestion.trim()) return;
    setIsTesting(true);
    setTestAnswer('');
    try {
      const res = await apiService.askAiTutor({
        question: testQuestion,
        labContext: 'Gross Anatomy & Osteology',
        practicalTitle: 'Upper Limb Bones & Humerus Fractures',
        mode: testMode
      });
      setTestAnswer(res.answer || 'لم يتم استلام رد');
      setTestSource(res.source || 'gemini');
    } catch (e: any) {
      setTestAnswer('حدث خطأ أثناء التواصل مع المساعد الذكي: ' + (e?.message || ''));
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6" id="admin-ai-settings-tab">
      {/* Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold font-mono">
              Medical AI Tutor Engine
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Gemini 3.8 Flash Active
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            إعدادات المساعد الطبي الذكي (Smart AI Assistant Settings)
          </h2>
          <p className="text-xs text-slate-500">
            ضبط خوارزمية التعليم الطبي، نماذج التفسير، تفعيل أزرار التفاعل السريع (Explain / Example / Quiz Me)، وفحص أداء الذكاء الاصطناعي.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configuration Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>معايير التوجيه الطبي (Pedagogical Parameters)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              تحديد نمط التدريس المتبع عند إجابة استفسارات الطلاب المعملية.
            </p>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-slate-700 mb-1">محرك الذكاء الاصطناعي (Model Architecture)</label>
              <select
                value={modelName}
                onChange={e => setModelName(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-mono font-bold"
              >
                <option value="gemini-3.8-flash">gemini-3.8-flash (الأسرع والأدق طبيًا - افتراضي)</option>
                <option value="gemini-2.5-flash">gemini-2.5-flash (نموذج احتياطي)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-1">النمط التعليمي (Pedagogical Focus)</label>
              <select
                value={pedagogicalStyle}
                onChange={e => setPedagogicalStyle(e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-slate-800 font-bold"
              >
                <option value="ospe_focus">التركيز على امتحانات OSPE والتعرف على العينات</option>
                <option value="deep_clinical">ربط تشريحي وسريري عميق (Clinical Pearls)</option>
                <option value="simple_beginner">تبسيط فائق للمصطلحات المبتدئة</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-700">درجة الدقة / الإبداع (Temperature)</label>
                <span className="font-mono text-indigo-600 font-bold">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.1"
                value={temperature}
                onChange={e => setTemperature(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>صارم وطبي 100% (0.1)</span>
                <span>متوازن (0.4)</span>
                <span>مرن (0.8)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableQuickChips}
                  onChange={e => setEnableQuickChips(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span>تفعيل أزرار المساعدة السريعة (Explain, Example, Quiz Me)</span>
              </label>

              <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableClinicalExamples}
                  onChange={e => setEnableClinicalExamples(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                <span>إلزامية تضمين أمثلة سريرية (Clinical Spotters) في الإجابة</span>
              </label>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-1">
              <div className="text-indigo-900 font-bold flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-indigo-600" />
                <span>نظام الحماية المعملية (Verified Curriculum Safety):</span>
              </div>
              <p className="text-[11px] text-indigo-800 leading-relaxed">
                في حال عدم توفر اتصال بالشبكة أو انتهاء الحصة، يتم تفعيل قاعدة بيانات المنهج المعتمدة تلقائيًا بدون انقطاع تجربة الطالب.
              </p>
            </div>
          </div>
        </div>

        {/* Right: AI Playground & Testing Console (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Bot className="w-4 h-4 text-indigo-600" />
                <span>منصة اختبار المساعد الذكي (AI Tutor Playground)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                اختبار فوري لكيفية صياغة الإجابات للطلاب بحسب المحطات.
              </p>
            </div>
            {testSource && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Source: {testSource}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                سؤال تجريبي أو حالة سريرية:
              </label>
              <textarea
                value={testQuestion}
                onChange={e => setTestQuestion(e.target.value)}
                rows={2}
                className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500 font-bold">وضع الاختبار:</span>
              {[
                { id: 'explain_simple', label: '📖 اشرح ببساطة' },
                { id: 'example', label: '🔬 مثال عملي' },
                { id: 'quiz_me', label: '🎯 اختبرني (Quiz)' },
                { id: 'exam_tip', label: '💡 نصيحة امتحان' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setTestMode(m.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    testMode === m.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleTestTutor}
              disabled={isTesting}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'جاري توليد الاستجابة الطبية...' : 'تشغيل الاختبار وتوليد الإجابة'}</span>
            </button>

            {/* Output Box */}
            {testAnswer && (
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs leading-relaxed space-y-2 max-h-[350px] overflow-y-auto">
                <div className="text-[11px] font-bold text-slate-400 uppercase font-mono border-b border-slate-200 pb-1">
                  AI Medical Response Output:
                </div>
                <div className="whitespace-pre-wrap font-sans text-slate-800">
                  {testAnswer}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
