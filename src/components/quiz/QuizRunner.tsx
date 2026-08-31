import React, { useState, useEffect } from 'react';
import { Quiz, QuizAttempt, LabSubjectId } from '../../types';
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  RotateCcw,
  CheckSquare,
  AlertCircle,
  Award,
  ChevronLeft,
  Share2
} from 'lucide-react';

interface QuizRunnerProps {
  quiz: Quiz;
  userId: string;
  onCompleteQuiz: (attempt: QuizAttempt) => void;
  onBack: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({
  quiz,
  userId,
  onCompleteQuiz,
  onBack
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitMinutes * 60);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const questions = quiz.questions;
  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectAnswer = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);

    let calculatedScore = 0;
    const answerRecords = questions.map(q => {
      const selected = selectedAnswers[q.id] ?? -1;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) calculatedScore += 1;
      return {
        questionId: q.id,
        selectedIndex: selected,
        isCorrect
      };
    });

    const percentage = Math.round((calculatedScore / questions.length) * 100);
    const passed = percentage >= quiz.passingScorePercent;

    const attempt: QuizAttempt = {
      id: `att_${Date.now()}`,
      quizId: quiz.id,
      quizTitle: quiz.title,
      labId: quiz.labId,
      userId: userId,
      score: calculatedScore,
      maxScore: questions.length,
      percentage,
      passed,
      answers: answerRecords,
      completedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    onCompleteQuiz(attempt);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Results Review Screen
  if (isSubmitted) {
    let finalScore = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) finalScore += 1;
    });
    const percentage = Math.round((finalScore / questions.length) * 100);
    const passed = percentage >= quiz.passingScorePercent;

    return (
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-300">
        {/* Results Card */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center border-2 shadow-xs">
            {passed ? (
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
              </div>
            )}
          </div>

          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                passed
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {passed ? 'Passed Practical Assessment' : 'Needs Review & Retake'}
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {quiz.title}
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Your results have been securely recorded in your laboratory progress portfolio.
            </p>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
            <div className="bg-slate-50 p-3.5 rounded-lg border border-[#E2E8F0] shadow-xs">
              <span className="text-2xl font-black text-slate-900">{finalScore}/{questions.length}</span>
              <span className="text-[11px] text-slate-500 font-medium block">Correct Answers</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-[#E2E8F0] shadow-xs">
              <span className="text-2xl font-black text-indigo-600">{percentage}%</span>
              <span className="text-[11px] text-slate-500 font-medium block">Score Percentage</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-[#E2E8F0] shadow-xs">
              <span className="text-2xl font-black text-teal-700">{quiz.passingScorePercent}%</span>
              <span className="text-[11px] text-slate-500 font-medium block">Pass Benchmark</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs sm:text-sm transition-all shadow-xs"
            >
              Return to Laboratory
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedAnswers({});
                setIsSubmitted(false);
                setCurrentQuestionIndex(0);
                setTimeLeft(quiz.timeLimitMinutes * 60);
              }}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-5 py-2.5 rounded-lg border border-[#E2E8F0] text-xs sm:text-sm transition-all inline-flex items-center gap-1.5 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>

        {/* Detailed Question by Question Review */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Question Review & Detailed Explanations</h2>

          {questions.map((q, idx) => {
            const studentSelection = selectedAnswers[q.id];
            const isCorrect = studentSelection === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`bg-white border rounded-xl p-5 space-y-3 shadow-xs ${
                  isCorrect ? 'border-emerald-200 bg-emerald-50/20' : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-indigo-700 font-mono text-xs font-bold flex items-center justify-center border border-[#E2E8F0]">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{q.question}</h3>
                  </div>
                  {isCorrect ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Correct
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1 shrink-0">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 pl-8">
                  {q.options.map((opt, optIdx) => {
                    const isOptionCorrect = optIdx === q.correctIndex;
                    const isOptionSelected = optIdx === studentSelection;

                    let optStyle = 'bg-slate-50 text-slate-700 border-[#E2E8F0]';
                    if (isOptionCorrect) {
                      optStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold';
                    } else if (isOptionSelected && !isOptionCorrect) {
                      optStyle = 'bg-rose-50 text-rose-800 border-rose-300';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-lg border text-xs flex items-center justify-between shadow-2xs ${optStyle}`}
                      >
                        <span className="font-medium">{opt}</span>
                        {isOptionCorrect && <span className="text-[10px] uppercase font-bold text-emerald-700">Correct Key</span>}
                        {isOptionSelected && !isOptionCorrect && <span className="text-[10px] uppercase font-bold text-rose-700">Your Choice</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="pl-8 pt-1">
                  <div className="bg-slate-50 p-3 rounded-lg border border-[#E2E8F0] text-xs text-slate-600 leading-relaxed font-medium">
                    <strong className="text-teal-700 font-bold">Academic Explanation:</strong> {q.explanation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Quiz View
  const progressPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const answeredTotal = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300" id="active-quiz-runner">
      {/* Top Header Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Exit Quiz</span>
          </button>

          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-800">
            <Clock className="w-3.5 h-3.5" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>
        </div>

        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900">{quiz.title}</h1>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mt-1">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>{answeredTotal} of {questions.length} Answered</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-100 mt-2 overflow-hidden border border-[#E2E8F0]">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Current Question Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Question {currentQuestionIndex + 1}:
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Optional Image */}
        {currentQuestion.imageUrl && (
          <div className="rounded-xl overflow-hidden bg-slate-900 border border-[#E2E8F0] max-h-64 flex items-center justify-center">
            <img
              src={currentQuestion.imageUrl}
              alt="Question illustration"
              className="max-h-64 object-contain"
            />
          </div>
        )}

        {/* Option Choices */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentQuestion.id] === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 text-xs sm:text-sm shadow-xs ${
                  isSelected
                    ? 'bg-indigo-50 border-indigo-400 text-indigo-950 font-bold ring-2 ring-indigo-200'
                    : 'bg-slate-50 hover:bg-slate-100 border-[#E2E8F0] text-slate-700 hover:text-slate-900 font-medium'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs shrink-0 border shadow-2xs ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                      : 'bg-white text-slate-700 border-[#E2E8F0]'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1 leading-relaxed">{option}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation & Submit Bar */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-30 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-[#E2E8F0] transition-colors shadow-xs"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitQuiz}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Submit & View Results</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
