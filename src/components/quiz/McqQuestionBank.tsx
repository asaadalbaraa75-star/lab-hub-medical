import React, { useState, useMemo } from 'react';
import { 
  ALL_MCQ_BANK, 
  BankMcqQuestion 
} from '../../data/mcqBankData';
import { 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  RotateCcw, 
  Filter, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Award, 
  Flame, 
  Check, 
  Layers, 
  ChevronDown,
  BarChart2,
  AlertCircle
} from 'lucide-react';

interface Props {
  onBackToHub?: () => void;
}

export const McqQuestionBank: React.FC<Props> = ({ onBackToHub }) => {
  // Filter state
  const [selectedSubject, setSelectedSubject] = useState<'all' | 'anatomy' | 'histology' | 'biochemistry'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyShowBookmarked, setOnlyShowBookmarked] = useState<boolean>(false);
  const [onlyShowMistakes, setOnlyShowMistakes] = useState<boolean>(false);

  // Active question index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User state: answers { questionId: chosenIndex }
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  // Bookmarks
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  // Filtered question set
  const filteredQuestions = useMemo(() => {
    return ALL_MCQ_BANK.filter(q => {
      const matchSubject = selectedSubject === 'all' || q.subjectId === selectedSubject;
      const matchDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      const matchSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBookmark = !onlyShowBookmarked || bookmarkedIds[q.id];
      const matchMistakes = !onlyShowMistakes || (userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctIndex);

      return matchSubject && matchDifficulty && matchSearch && matchBookmark && matchMistakes;
    });
  }, [selectedSubject, selectedDifficulty, searchQuery, onlyShowBookmarked, onlyShowMistakes, bookmarkedIds, userAnswers]);

  // Safety check on index
  const activeQuestion: BankMcqQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Stats calculation
  const stats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    let incorrect = 0;

    filteredQuestions.forEach(q => {
      const ans = userAnswers[q.id];
      if (ans !== undefined) {
        answered++;
        if (ans === q.correctIndex) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return { answered, correct, incorrect, total: filteredQuestions.length, accuracy };
  }, [filteredQuestions, userAnswers]);

  const handleSelectOption = (optionIndex: number) => {
    if (!activeQuestion) return;
    if (userAnswers[activeQuestion.id] !== undefined) return; // Already answered

    setUserAnswers(prev => ({
      ...prev,
      [activeQuestion.id]: optionIndex
    }));
  };

  const toggleBookmark = (qId: string) => {
    setBookmarkedIds(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleResetFilters = () => {
    setSelectedSubject('all');
    setSelectedDifficulty('all');
    setSearchQuery('');
    setOnlyShowBookmarked(false);
    setOnlyShowMistakes(false);
    setCurrentIndex(0);
  };

  return (
    <div id="mcq-question-bank-container" className="space-y-6 max-w-6xl mx-auto pb-12">
      
      {/* 1. HEADER & HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                First-Year Medical Examination Bank
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {ALL_MCQ_BANK.length}+ High-Yield Questions
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Medical MCQ & OSPE Question Bank
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Comprehensive exam-prep questions covering Anatomy, Histology, and Biochemistry with instant rationales and high-yield pearls.
            </p>
          </div>

          {/* Quick Stat Pill Cards */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:flex-initial bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3 text-center min-w-[90px]">
              <span className="text-xs text-slate-400 font-medium">Answered</span>
              <p className="text-lg font-bold text-white mt-0.5">{stats.answered} / {stats.total}</p>
            </div>
            <div className="flex-1 md:flex-initial bg-slate-900/90 border border-emerald-900/40 rounded-2xl px-4 py-3 text-center min-w-[90px]">
              <span className="text-xs text-emerald-400 font-medium">Accuracy</span>
              <p className="text-lg font-bold text-emerald-400 mt-0.5">{stats.accuracy}%</p>
            </div>
            <div className="flex-1 md:flex-initial bg-slate-900/90 border border-amber-900/40 rounded-2xl px-4 py-3 text-center min-w-[90px]">
              <span className="text-xs text-amber-400 font-medium">Score</span>
              <p className="text-lg font-bold text-amber-400 mt-0.5">{stats.correct}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FILTER & SUBJECT SELECTION TABS */}
      <div className="bg-slate-900/80 backdrop-blur rounded-2xl p-4 border border-slate-800 space-y-4">
        
        {/* Subject Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Subjects', count: ALL_MCQ_BANK.length },
            { id: 'anatomy', label: 'Anatomy (100)', count: 100 },
            { id: 'histology', label: 'Histology (100)', count: 100 },
            { id: 'biochemistry', label: 'Biochemistry', count: 10 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedSubject(tab.id as any);
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${
                selectedSubject === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Secondary Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse flex-1 min-w-[240px] max-w-md">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics, keywords..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentIndex(0);
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Difficulty Selector */}
            <select
              value={selectedDifficulty}
              onChange={e => {
                setSelectedDifficulty(e.target.value as any);
                setCurrentIndex(0);
              }}
              className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 font-medium"
            >
              <option value="all">All Difficulties</option>
              <option value="basic">Basic / Core</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced / Clinical</option>
            </select>

            {/* Bookmarks Filter */}
            <button
              onClick={() => {
                setOnlyShowBookmarked(!onlyShowBookmarked);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition flex items-center space-x-1 ${
                onlyShowBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Starred</span>
            </button>

            {/* Mistakes Filter */}
            <button
              onClick={() => {
                setOnlyShowMistakes(!onlyShowMistakes);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition flex items-center space-x-1 ${
                onlyShowMistakes
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Review Mistakes</span>
            </button>

            <button
              onClick={handleResetFilters}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN QUESTION DISPLAY AREA */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800">
          <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-300">No matching questions found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Try adjusting your search criteria or resetting filters to explore the full question bank.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        activeQuestion && (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
            
            {/* Question Top Subheader */}
            <div className="px-6 py-4 bg-slate-950/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="font-bold text-indigo-400 text-sm">
                  Question {currentIndex + 1} of {filteredQuestions.length}
                </span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                  {activeQuestion.topic}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                  activeQuestion.difficulty === 'basic'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : activeQuestion.difficulty === 'intermediate'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {activeQuestion.difficulty.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => toggleBookmark(activeQuestion.id)}
                  className={`p-2 rounded-xl border transition ${
                    bookmarkedIds[activeQuestion.id]
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                  title={bookmarkedIds[activeQuestion.id] ? "Starred for review" : "Star for review"}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Question Stem Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Question Text */}
              <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                {activeQuestion.question}
              </h2>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {activeQuestion.options.map((option, idx) => {
                  const hasAnswered = userAnswers[activeQuestion.id] !== undefined;
                  const isSelected = userAnswers[activeQuestion.id] === idx;
                  const isCorrect = idx === activeQuestion.correctIndex;

                  let optionStyle = 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-200';
                  let icon = <span className="w-6 h-6 rounded-full border border-slate-600 flex items-center justify-center text-xs font-semibold text-slate-400">{String.fromCharCode(65 + idx)}</span>;

                  if (hasAnswered) {
                    if (isCorrect) {
                      optionStyle = 'bg-emerald-500/15 border-emerald-500/80 text-emerald-100 font-semibold shadow-sm shadow-emerald-500/10';
                      icon = <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />;
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-red-500/15 border-red-500/80 text-red-100 font-semibold shadow-sm shadow-red-500/10';
                      icon = <XCircle className="w-6 h-6 text-red-400 shrink-0" />;
                    } else {
                      optionStyle = 'bg-slate-800/30 border-slate-800 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={hasAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center space-x-3.5 rtl:space-x-reverse ${optionStyle}`}
                    >
                      {icon}
                      <span className="text-sm flex-1 leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Rationale / Feedback Card upon Answering */}
              {userAnswers[activeQuestion.id] !== undefined && (
                <div className={`rounded-2xl p-5 border animate-in fade-in duration-200 space-y-3 ${
                  userAnswers[activeQuestion.id] === activeQuestion.correctIndex
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-red-950/20 border-red-500/40 text-red-200'
                }`}>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse font-bold text-sm">
                    {userAnswers[activeQuestion.id] === activeQuestion.correctIndex ? (
                      <>
                        <Check className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-400">Correct Answer!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-400">
                          Incorrect. Correct: {String.fromCharCode(65 + activeQuestion.correctIndex)}. {activeQuestion.options[activeQuestion.correctIndex]}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeQuestion.explanation}
                  </p>

                  {/* High Yield Key Points */}
                  {activeQuestion.keyPoints && activeQuestion.keyPoints.length > 0 && (
                    <div className="pt-2 border-t border-slate-700/60 mt-2 space-y-1">
                      <p className="text-[11px] font-semibold text-slate-400">Key Takeaways:</p>
                      <ul className="space-y-1">
                        {activeQuestion.keyPoints.map((pt, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start space-x-2">
                            <span className="text-indigo-400 text-xs font-bold">&bull;</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Clinical Pearl if present */}
                  {activeQuestion.clinicalPearl && (
                    <div className="bg-slate-900/80 rounded-xl p-3 border border-amber-500/30 text-xs text-amber-200 flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300">Clinical Pearl: </span>
                        <span>{activeQuestion.clinicalPearl}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Nav Bar */}
            <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="hidden sm:flex items-center space-x-1">
                {filteredQuestions.slice(Math.max(0, currentIndex - 2), Math.min(filteredQuestions.length, currentIndex + 3)).map((_, i) => {
                  const idx = Math.max(0, currentIndex - 2) + i;
                  const isCurrent = idx === currentIndex;
                  const isAns = userAnswers[filteredQuestions[idx].id] !== undefined;
                  const isRight = isAns && userAnswers[filteredQuestions[idx].id] === filteredQuestions[idx].correctIndex;

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                        isCurrent
                          ? 'ring-2 ring-indigo-500 bg-indigo-600 text-white'
                          : isAns
                            ? isRight ? 'bg-emerald-600/60 text-white' : 'bg-red-600/60 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === filteredQuestions.length - 1}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-white transition flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
