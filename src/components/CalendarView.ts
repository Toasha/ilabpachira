import { StorageState } from '../types';
import { getMonthCalendarDays } from '../utils/dateUtils';
import { toggleSoilWatering, toggleLeafMist } from '../utils/storage';

export interface CalendarViewProps {
  logs: StorageState;
  currentYear: number;
  currentMonthIndex: number;
  onMonthChange: (year: number, monthIndex: number) => void;
  onLogUpdate: (logs: StorageState) => void;
}

export function createCalendarView({
  logs,
  currentYear,
  currentMonthIndex,
  onMonthChange,
  onLogUpdate
}: CalendarViewProps): HTMLElement {
  const container = document.createElement('div');
  container.className = 'space-y-6 animate-pop';

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const weekDays = [
    { label: '日', isWeekend: true },
    { label: '月', isWeekend: false },
    { label: '火', isWeekend: false },
    { label: '水', isWeekend: false },
    { label: '木', isWeekend: false },
    { label: '金', isWeekend: false },
    { label: '土', isWeekend: true },
  ];

  const days = getMonthCalendarDays(currentYear, currentMonthIndex);

  // 月間集計
  const currentMonthPrefix = `${currentYear}-${String(currentMonthIndex + 1).padStart(2, '0')}`;
  const soilCount = Object.keys(logs).filter(key => key.startsWith(currentMonthPrefix) && logs[key]?.soil).length;
  const mistCount = Object.keys(logs).filter(key => key.startsWith(currentMonthPrefix) && logs[key]?.mist).length;

  container.innerHTML = `
    <div class="neu-card p-4 sm:p-6 md:p-8 space-y-6">
      <!-- ナビゲーション -->
      <div class="flex items-center justify-between">
        <button id="btn-prev-month" class="w-10 h-10 neu-button flex items-center justify-center text-pachira-text hover:text-pachira-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>

        <div class="text-center">
          <h2 class="text-xl sm:text-2xl font-bold font-maru text-pachira-text">
            ${currentYear}年 ${monthNames[currentMonthIndex]}
          </h2>
          <button id="btn-today-month" class="text-xs font-bold text-pachira-500 hover:underline">今月へ</button>
        </div>

        <button id="btn-next-month" class="w-10 h-10 neu-button flex items-center justify-center text-pachira-text hover:text-pachira-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>

      <!-- 曜日ヘッダー -->
      <div class="grid grid-cols-7 gap-1 text-center">
        ${weekDays.map(w => `
          <div class="text-xs font-bold font-maru ${w.isWeekend ? 'text-pachira-600/70' : 'text-pachira-textMuted'} py-1">
            ${w.label}
          </div>
        `).join('')}
      </div>

      <!-- 日付グリッド -->
      <div class="grid grid-cols-7 gap-1.5 sm:gap-2">
        ${days.map(day => {
          const entry = logs[day.dateStr];
          const hasSoil = entry?.soil || false;
          const hasMist = entry?.mist || false;

          let cellClass = 'aspect-square p-1 sm:p-2 rounded-2xl flex flex-col items-center justify-between transition-all select-none cursor-pointer ';
          
          if (!day.isCurrentMonth) {
            cellClass += 'opacity-30 bg-pachira-bg/40 ';
          } else if (day.isToday) {
            cellClass += (hasSoil || hasMist) ? 'neu-green-pressed border-2 border-white/60 ' : 'neu-pressed border-2 border-pachira-400 ';
          } else if (hasSoil || hasMist) {
            cellClass += 'neu-green-btn ';
          } else {
            cellClass += 'neu-card-sm hover:scale-105 active:scale-95 ';
          }

          const isDarkBg = (hasSoil || hasMist);

          return `
            <div class="calendar-cell ${cellClass}" data-date="${day.dateStr}">
              <div class="w-full flex items-center justify-between">
                <span class="text-xs font-bold font-maru ${isDarkBg ? 'text-white' : (day.isCurrentMonth ? 'text-pachira-text' : 'text-pachira-textMuted')}">
                  ${day.dayNumber}
                </span>
                ${day.isToday ? `
                  <span class="text-[9px] px-1 rounded font-bold ${isDarkBg ? 'bg-white/30 text-white' : 'bg-pachira-400 text-white'}">今日</span>
                ` : ''}
              </div>

              <!-- 印 (土 / 葉水) -->
              <div class="my-auto flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold">
                ${hasSoil ? `
                  <span class="${isDarkBg ? 'text-white' : 'text-pachira-700'}">土 ◯</span>
                ` : ''}
                ${hasMist ? `
                  <span class="${isDarkBg ? 'text-white/90' : 'text-pachira-600'}">葉水 ◯</span>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 今月の集計 -->
      <div class="pt-4 border-t border-pachira-darkShadow/15 flex justify-around text-xs font-maru font-bold text-pachira-text">
        <div>🪴 土の水やり: <span class="text-pachira-600 text-sm">${soilCount}</span> 回</div>
        <div>🚿 葉水: <span class="text-pachira-600 text-sm">${mistCount}</span> 回</div>
      </div>
    </div>
  `;

  // イベント設定
  container.querySelector('#btn-prev-month')?.addEventListener('click', () => {
    let newMonth = currentMonthIndex - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    onMonthChange(newYear, newMonth);
  });

  container.querySelector('#btn-next-month')?.addEventListener('click', () => {
    let newMonth = currentMonthIndex + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    onMonthChange(newYear, newMonth);
  });

  container.querySelector('#btn-today-month')?.addEventListener('click', () => {
    const today = new Date();
    onMonthChange(today.getFullYear(), today.getMonth());
  });

  const cells = container.querySelectorAll('.calendar-cell');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const dateStr = cell.getAttribute('data-date');
      if (!dateStr) return;
      showSimpleEditModal(dateStr, logs, onLogUpdate);
    });
  });

  return container;
}

/**
 * 日付タップ時のチェック変更ダイアログ
 */
function showSimpleEditModal(dateStr: string, logs: StorageState, onLogUpdate: (logs: StorageState) => void) {
  const existing = document.getElementById('day-edit-modal');
  if (existing) existing.remove();

  const entry = logs[dateStr] || { date: dateStr, soil: false, mist: false };

  const modal = document.createElement('div');
  modal.id = 'day-edit-modal';
  modal.className = 'fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-pop';

  modal.innerHTML = `
    <div class="neu-card p-6 w-full max-w-xs text-center space-y-5">
      <h3 class="text-base font-bold font-maru text-pachira-text">
        ${dateStr} の記録
      </h3>

      <div class="space-y-3">
        <!-- 土への水やり -->
        <button id="modal-btn-soil" class="w-full py-3 px-4 rounded-2xl font-bold font-maru flex items-center justify-between transition-all ${
          entry.soil ? 'neu-green-btn' : 'neu-button text-pachira-text'
        }">
          <span class="flex items-center gap-2">🪴 土への水やり</span>
          <span>${entry.soil ? '◯ 済み' : '未チェック'}</span>
        </button>

        <!-- 葉水 -->
        <button id="modal-btn-mist" class="w-full py-3 px-4 rounded-2xl font-bold font-maru flex items-center justify-between transition-all ${
          entry.mist ? 'neu-green-btn' : 'neu-button text-pachira-text'
        }">
          <span class="flex items-center gap-2">🚿 葉水</span>
          <span>${entry.mist ? '◯ 済み' : '未チェック'}</span>
        </button>
      </div>

      <button id="modal-btn-close" class="w-full py-2 text-sm font-bold font-maru text-pachira-textMuted hover:text-pachira-text">
        閉じる
      </button>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#modal-btn-soil')?.addEventListener('click', () => {
    const updated = toggleSoilWatering(dateStr);
    modal.remove();
    onLogUpdate(updated);
  });

  modal.querySelector('#modal-btn-mist')?.addEventListener('click', () => {
    const updated = toggleLeafMist(dateStr);
    modal.remove();
    onLogUpdate(updated);
  });

  modal.querySelector('#modal-btn-close')?.addEventListener('click', () => {
    modal.remove();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}
