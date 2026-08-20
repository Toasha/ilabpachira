import { StorageState } from '../types';
import { formatDateJapanese, formatDateKey } from '../utils/dateUtils';
import { toggleSoilWatering, toggleLeafMist } from '../utils/storage';

export interface TodayCheckCardProps {
  logs: StorageState;
  onLogUpdate: (logs: StorageState) => void;
  onOpenCalendar: () => void;
}

export function createTodayCheckCard({ logs, onLogUpdate, onOpenCalendar }: TodayCheckCardProps): HTMLElement {
  const container = document.createElement('div');
  container.className = 'space-y-6 animate-pop';

  const today = new Date();
  const todayKey = formatDateKey(today);
  const todayEntry = logs[todayKey] || { date: todayKey, soil: false, mist: false };

  container.innerHTML = `
    <div class="neu-card p-6 md:p-8 text-center space-y-6">
      <!-- 今日の日付 -->
      <div>
        <span class="text-xs font-bold text-pachira-textMuted tracking-wider uppercase">TODAY</span>
        <h2 class="text-2xl md:text-3xl font-bold font-maru text-pachira-text mt-1">
          ${formatDateJapanese(today)}
        </h2>
      </div>

      <!-- 2種類のチェックボタン (土への水やり & 葉水) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
        <!-- 1. 土への水やり -->
        <button id="btn-today-soil" class="relative group p-6 rounded-3xl flex flex-col items-center justify-center transition-all duration-200 focus:outline-none ${
          todayEntry.soil ? 'neu-green-pressed text-white' : 'neu-button text-pachira-text hover:scale-[1.02]'
        }">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform ${todayEntry.soil ? 'bg-white/20 scale-110' : 'neu-card text-pachira-500'}">
            <!-- 土・鉢アイコン -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M7 10h10l-1 9H8z"/>
              <path d="M6 6h12v4H6z"/>
              <path d="M12 2v4"/>
            </svg>
          </div>

          <span class="text-lg font-bold font-maru">
            土への水やり
          </span>

          <div class="mt-2 flex items-center gap-1.5 font-bold text-sm font-maru ${todayEntry.soil ? 'text-white' : 'text-pachira-textMuted'}">
            ${todayEntry.soil ? `
              <span class="text-base">◯</span>
              <span>水やり完了</span>
            ` : `
              <span class="w-4 h-4 rounded-full border-2 border-pachira-400 inline-block"></span>
              <span>チェックする</span>
            `}
          </div>
        </button>

        <!-- 2. 葉水 (スプレー) -->
        <button id="btn-today-mist" class="relative group p-6 rounded-3xl flex flex-col items-center justify-center transition-all duration-200 focus:outline-none ${
          todayEntry.mist ? 'neu-green-pressed text-white' : 'neu-button text-pachira-text hover:scale-[1.02]'
        }">
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform ${todayEntry.mist ? 'bg-white/20 scale-110' : 'neu-card text-pachira-500'}">
            <!-- スプレー/水滴アイコン -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
          </div>

          <span class="text-lg font-bold font-maru">
            葉水（スプレー）
          </span>

          <div class="mt-2 flex items-center gap-1.5 font-bold text-sm font-maru ${todayEntry.mist ? 'text-white' : 'text-pachira-textMuted'}">
            ${todayEntry.mist ? `
              <span class="text-base">◯</span>
              <span>葉水完了</span>
            ` : `
              <span class="w-4 h-4 rounded-full border-2 border-pachira-400 inline-block"></span>
              <span>チェックする</span>
            `}
          </div>
        </button>
      </div>

      <!-- カレンダー遷移リンク -->
      <div class="pt-4 border-t border-pachira-darkShadow/15 flex justify-center">
        <button id="btn-open-calendar-bottom" class="px-6 py-3 neu-button text-sm font-bold font-maru text-pachira-text flex items-center gap-2 hover:text-pachira-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pachira-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
            <line x1="16" x2="16" y1="2" y2="6"/>
            <line x1="8" x2="8" y1="2" y2="6"/>
            <line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
          カレンダーで確認する →
        </button>
      </div>
    </div>
  `;

  container.querySelector('#btn-today-soil')?.addEventListener('click', () => {
    const updated = toggleSoilWatering(todayKey);
    onLogUpdate(updated);
  });

  container.querySelector('#btn-today-mist')?.addEventListener('click', () => {
    const updated = toggleLeafMist(todayKey);
    onLogUpdate(updated);
  });

  container.querySelector('#btn-open-calendar-bottom')?.addEventListener('click', onOpenCalendar);

  return container;
}
