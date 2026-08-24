export interface HeaderProps {
  currentView: 'home' | 'calendar';
  onViewChange: (view: 'home' | 'calendar') => void;
}

export function createHeader({ currentView, onViewChange }: HeaderProps): HTMLElement {
  const header = document.createElement('header');
  header.className = 'flex items-center justify-between py-4 mb-6 px-1';

  header.innerHTML = `
    <!-- タイトル -->
    <button id="nav-brand" class="flex items-center space-x-3 text-left focus:outline-none group">
      <div class="w-11 h-11 neu-card flex items-center justify-center text-pachira-400 group-hover:scale-105 transition-transform duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22v-9"/>
          <path d="M12 13C12 7.5 7.5 4 3 4c0 5.5 3.5 10 9 9Z"/>
          <path d="M12 13C12 7.5 16.5 4 21 4c0 5.5-3.5 10-9 9Z"/>
        </svg>
      </div>
      <div class="whitespace-nowrap flex-shrink-0">
        <h1 class="text-base sm:text-lg font-bold font-maru text-pachira-text tracking-tight">
          パキラの水やり記録
        </h1>
        <p class="text-[10px] sm:text-xs text-pachira-textMuted tracking-wider font-sans">Watering & Leaf Mist Log</p>
      </div>
    </button>

    <!-- カレンダー / ホーム 切り替えボタン -->
    <button id="btn-toggle-view" class="px-4 py-2 text-sm font-bold font-maru ${currentView === 'calendar' ? 'neu-pressed text-pachira-700' : 'neu-button text-pachira-text'} flex items-center gap-2">
      ${currentView === 'home' ? `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pachira-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
          <line x1="16" x2="16" y1="2" y2="6"/>
          <line x1="8" x2="8" y1="2" y2="6"/>
          <line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
        カレンダー
      ` : `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-pachira-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
        ホーム
      `}
    </button>
  `;

  header.querySelector('#nav-brand')?.addEventListener('click', () => onViewChange('home'));
  header.querySelector('#btn-toggle-view')?.addEventListener('click', () => {
    onViewChange(currentView === 'home' ? 'calendar' : 'home');
  });

  return header;
}
