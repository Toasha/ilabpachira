export interface WateringEntry {
  date: string; // YYYY-MM-DD
  soil: boolean; // 土への水やり
  mist: boolean; // 葉水
}

export type StorageState = Record<string, WateringEntry>;
