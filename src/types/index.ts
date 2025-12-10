export interface Song {
  id: string;
  title: string;
  category: string;
  key: string;
  tempo: number;
}

export interface WeekData {
  opening?: string;
  worship?: string;
  praise?: string;
  persembahan?: string;
  penutup?: string;
}

export interface MonthData {
  week1?: WeekData;
  week2?: WeekData;
  week3?: WeekData;
  week4?: WeekData;
  week5?: WeekData;
  [key: string]: WeekData | undefined;
}

export interface UsageData {
  [month: string]: MonthData;
}

export type SlotType = 'opening' | 'worship' | 'praise' | 'persembahan' | 'penutup';
