import { StorageState } from '../types';
import { sendLogToSpreadsheet } from './api';

const STORAGE_KEY = 'pachira_simple_log_v2';
const GAS_URL_KEY = 'pachira_gas_api_url_v1';

const DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbz5YgmLc-IQPS_bD-onLyz6No-i4rTts64PR0T3mASLeWhPyrVWhLXXi5E6Au4c9Y0pzQ/exec';

/**
 * 設定された GAS Web App URL の取得
 */
export function getGasApiUrl(): string {
  const envUrl = import.meta.env.VITE_GAS_API_URL;
  const localUrl = localStorage.getItem(GAS_URL_KEY);
  return localUrl || envUrl || DEFAULT_GAS_URL;
}

/**
 * GAS Web App URL の保存
 */
export function setGasApiUrl(url: string): void {
  localStorage.setItem(GAS_URL_KEY, url.trim());
}

/**
 * ローカルストレージからログを取得
 */
export function loadWateringLogs(): StorageState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to load local logs', e);
    return {};
  }
}

/**
 * 全ログの保存
 */
export function saveWateringLogs(logs: StorageState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to save local logs', e);
  }
}

/**
 * 土への水やりトグル（ローカル保存 & クラウドAPI同期）
 */
export function toggleSoilWatering(dateKey: string): StorageState {
  const logs = loadWateringLogs();
  const current = logs[dateKey] || { date: dateKey, soil: false, mist: false };

  const updatedEntry = {
    ...current,
    soil: !current.soil
  };

  logs[dateKey] = updatedEntry;
  saveWateringLogs(logs);

  // バックグラウンドでスプレッドシートに送信
  const apiUrl = getGasApiUrl();
  if (apiUrl) {
    sendLogToSpreadsheet(apiUrl, updatedEntry);
  }

  return logs;
}

/**
 * 葉水トグル（ローカル保存 & クラウドAPI同期）
 */
export function toggleLeafMist(dateKey: string): StorageState {
  const logs = loadWateringLogs();
  const current = logs[dateKey] || { date: dateKey, soil: false, mist: false };

  const updatedEntry = {
    ...current,
    mist: !current.mist
  };

  logs[dateKey] = updatedEntry;
  saveWateringLogs(logs);

  // バックグラウンドでスプレッドシートに送信
  const apiUrl = getGasApiUrl();
  if (apiUrl) {
    sendLogToSpreadsheet(apiUrl, updatedEntry);
  }

  return logs;
}
