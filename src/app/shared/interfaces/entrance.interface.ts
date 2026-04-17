export interface IEntrance {
  id: string;
  complexId: string;
  maxApartment: number;
  minApartment: number;
  name: string;
  openUrl: string;
  closeUrl: string;
  type: string;
}

export enum EntranceType {
  GATE = 'GATE',
  DOOR = 'DOOR',
}

export const EntranceTypeTitles: Record<EntranceType, string> = {
  GATE: 'Шлагбаум',
  DOOR: 'Парадне',
}