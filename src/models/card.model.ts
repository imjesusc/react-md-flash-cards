import { CardStatusEnum } from "./card-status-enum";

export interface Card {
  id: number;
  general: string;
  code: string;
  status: CardStatusEnum;
}
