import { CardStatusEnum } from "./card-status-enum";

export interface Card {
  id: string;
  general: string;
  code: string;
  status: CardStatusEnum;
}
