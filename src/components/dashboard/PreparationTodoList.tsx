import React from 'react';
import { CheckCircle2, Circle, ListTodo, Sparkles } from 'lucide-react';
import { ScheduleItem } from '../../types';

interface PreparationTodoListProps {
  scheduleItem?: ScheduleItem;
  onToggleTask: (scheduleId: string, taskId: string) => void;
}

export const PreparationTodoList: React.FC<PreparationTodoListProps> = ({
  scheduleItem,
  onToggleTask
}) => {
  const tasks = scheduleItem?.preparationTasks || [];
  if (!scheduleItem || tasks.length === 0) {
    return null;
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div
      id="dashboard-lab-preparation-card"
      className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
              <ListTodo className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">قائمة التحضير للمعمل</h3>
              <p className="text-[11px] text-slate-500">
                لجلسة: {scheduleItem.practicalTitle}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
            {completedCount}/{totalCount} تم إنجازها
          </span>
        </div>

        {/* Task List */}
        <div className="divide-y divide-[#F1F5F9] mt-3 space-y-1">
          {scheduleItem.preparationTasks.map(task => {
            return (
              <button
                key={task.id}
                type="button"
                id={`task-btn-${task.id}`}
                onClick={() => onToggleTask(scheduleItem.id, task.id)}
                className="w-full flex items-start gap-3 py-2.5 px-2 rounded-lg hover:bg-slate-50 text-left transition-colors group"
              >
                <div className="mt-0.5 shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  )}
                </div>
                <span
                  className={`text-xs leading-relaxed transition-all ${
                    task.completed
                      ? 'text-slate-400 line-through'
                      : 'text-slate-700 group-hover:text-slate-900 font-medium'
                  }`}
                >
                  {task.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress Footer */}
      <div className="pt-4 border-t border-[#E2E8F0] mt-4 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>يرجى إتمام المهام قبل دخول قاعة المعمل</span>
        </div>
        <span className="font-mono font-bold text-slate-900">{percent}% الجاهزية</span>
      </div>
    </div>
  );
};
