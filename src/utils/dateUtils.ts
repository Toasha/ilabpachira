export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatDateJapanese(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
  const week = weekDays[date.getDay()];
  return `${year}年${month}月${day}日 (${week})`;
}

export interface CalendarDayCell {
  date: Date;
  dateStr: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export function getMonthCalendarDays(year: number, monthIndex: number): CalendarDayCell[] {
  const todayStr = formatDateKey(new Date());
  
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  
  const startDayOfWeek = firstDayOfMonth.getDay();
  const totalDaysInMonth = lastDayOfMonth.getDate();
  
  const cells: CalendarDayCell[] = [];
  
  // 前月埋め
  const prevMonthLastDay = new Date(year, monthIndex, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const prevDate = new Date(year, monthIndex - 1, prevMonthLastDay - i);
    const dateStr = formatDateKey(prevDate);
    cells.push({
      date: prevDate,
      dateStr,
      dayNumber: prevDate.getDate(),
      isCurrentMonth: false,
      isToday: dateStr === todayStr
    });
  }
  
  // 当月
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const currentDate = new Date(year, monthIndex, d);
    const dateStr = formatDateKey(currentDate);
    cells.push({
      date: currentDate,
      dateStr,
      dayNumber: d,
      isCurrentMonth: true,
      isToday: dateStr === todayStr
    });
  }
  
  // 翌月埋め
  const targetTotal = cells.length <= 35 ? 35 : 42;
  const paddingNeeded = targetTotal - cells.length;
  
  for (let i = 1; i <= paddingNeeded; i++) {
    const nextDate = new Date(year, monthIndex + 1, i);
    const dateStr = formatDateKey(nextDate);
    cells.push({
      date: nextDate,
      dateStr,
      dayNumber: i,
      isCurrentMonth: false,
      isToday: dateStr === todayStr
    });
  }
  
  return cells;
}
