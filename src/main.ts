import './style.css';
import { StorageState } from './types';
import { loadWateringLogs, getGasApiUrl, saveWateringLogs } from './utils/storage';
import { fetchLogsFromSpreadsheet } from './utils/api';
import { createHeader } from './components/Header';
import { createTodayCheckCard } from './components/TodayCheckCard';
import { createCalendarView } from './components/CalendarView';

class App {
  private appElement: HTMLElement;
  private logs: StorageState;
  private currentView: 'home' | 'calendar' = 'home';
  private currentYear: number;
  private currentMonthIndex: number;

  constructor(appElement: HTMLElement) {
    this.appElement = appElement;
    this.logs = loadWateringLogs();
    
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonthIndex = today.getMonth();

    this.render();
    this.syncWithSpreadsheet();
  }

  /**
   * 静かにバックグラウンドでスプレッドシートと同期
   */
  private async syncWithSpreadsheet() {
    const apiUrl = getGasApiUrl();
    if (!apiUrl) return;

    const remoteLogs = await fetchLogsFromSpreadsheet(apiUrl);
    if (remoteLogs) {
      this.logs = { ...this.logs, ...remoteLogs };
      saveWateringLogs(this.logs);
      this.render();
    }
  }

  private handleLogUpdate = (newLogs: StorageState) => {
    this.logs = newLogs;
    this.render();
  };

  private handleViewChange = (view: 'home' | 'calendar') => {
    this.currentView = view;
    this.render();
  };

  private handleMonthChange = (year: number, monthIndex: number) => {
    this.currentYear = year;
    this.currentMonthIndex = monthIndex;
    this.render();
  };

  public render() {
    this.appElement.innerHTML = '';

    // ヘッダー
    const header = createHeader({
      currentView: this.currentView,
      onViewChange: this.handleViewChange,
    });
    this.appElement.appendChild(header);

    // メインコンテンツ
    const main = document.createElement('main');
    main.className = 'flex-1 mb-8';

    if (this.currentView === 'home') {
      const todayCard = createTodayCheckCard({
        logs: this.logs,
        onLogUpdate: this.handleLogUpdate,
        onOpenCalendar: () => this.handleViewChange('calendar'),
      });
      main.appendChild(todayCard);
    } else {
      const calendarView = createCalendarView({
        logs: this.logs,
        currentYear: this.currentYear,
        currentMonthIndex: this.currentMonthIndex,
        onMonthChange: this.handleMonthChange,
        onLogUpdate: this.handleLogUpdate,
      });
      main.appendChild(calendarView);
    }

    this.appElement.appendChild(main);

    // フッター
    const footer = document.createElement('footer');
    footer.className = 'text-center py-4 text-xs font-maru text-pachira-textMuted border-t border-pachira-darkShadow/15';
    footer.innerHTML = `
      <p>🌱 パキラの水やり記録</p>
    `;
    this.appElement.appendChild(footer);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const appEl = document.getElementById('app');
  if (appEl) {
    new App(appEl);
  }
});
