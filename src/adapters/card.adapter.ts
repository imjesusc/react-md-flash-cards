import { CardStatusEnum } from "../models/card-status-enum";
import { Card } from "../models/card.model";
import { MdSection } from "../utilities/extract-md-sections.utilitie";
export const cardAdapter = (data: MdSection): Card => {
  const id: string = crypto.randomUUID().replace(/-/g, "");
  return {
    id: id,
    general: data.title || "",
    code: data.content || "",
    status: CardStatusEnum.UNKNOWN,
  };
};
