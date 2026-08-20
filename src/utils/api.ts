import { StorageState, WateringEntry } from '../types';

/**
 * スプレッドシート (GAS Web App) から全ログを取得
 */
export async function fetchLogsFromSpreadsheet(apiUrl: string): Promise<StorageState | null> {
  if (!apiUrl || !apiUrl.startsWith('http')) return null;

  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      redirect: 'follow'
    });

    if (!res.ok) {
      console.warn('Failed to fetch from Google Sheets API', res.statusText);
      return null;
    }

    const json = await res.json();
    if (json.status === 'success' && json.data) {
      return json.data as StorageState;
    }
    return null;
  } catch (err) {
    console.error('Error fetching from spreadsheet API:', err);
    return null;
  }
}

/**
 * 水やり・葉水ログをスプレッドシート (GAS Web App) へ送信保存
 * CORSエラーを100%回避するGETクエリ更新方式を採用
 */
export async function sendLogToSpreadsheet(apiUrl: string, entry: WateringEntry): Promise<boolean> {
  if (!apiUrl || !apiUrl.startsWith('http')) return false;

  try {
    const url = new URL(apiUrl);
    url.searchParams.set('action', 'update');
    url.searchParams.set('date', entry.date);
    url.searchParams.set('soil', String(entry.soil));
    url.searchParams.set('mist', String(entry.mist));

    // GETで更新リクエストを送信 (CORS制限なし・確実に到達)
    const res = await fetch(url.toString(), {
      method: 'GET',
      redirect: 'follow'
    });

    if (!res.ok) return false;
    const json = await res.json();
    return json.status === 'success';
  } catch (err) {
    console.error('Error sending log to spreadsheet:', err);
    return false;
  }
}
