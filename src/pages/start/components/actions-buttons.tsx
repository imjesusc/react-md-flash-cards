import { ArrowRightIcon, ArrowRightLeftIcon, Check } from "lucide-react";
import { Button } from "../../../components/button";
import { CardStatusEnum } from "../../../models/card-status-enum";
import { Card } from "../../../models/card.model";

export const ActionsButtons = ({
  onTabChange,
  tab,
  currentCard,
  checkStatus,
  getNextCard,
}: {
  onTabChange: (value: string) => void;
  tab: string;
  currentCard: Card;
  checkStatus: (cardId: string) => void;
  getNextCard: (cardId: string) => void;
}) => {
  return (
    <footer className="grid grid-cols-3 tablet:max-w-[400px] justify-center gap-4 m-auto">
      <Button
        disabled={currentCard.status === CardStatusEnum.KNOWN}
        onClick={() => onTabChange("general" === tab ? "code" : "general")}
        className="gap-1"
      >
        <ArrowRightLeftIcon size={16} /> Flip Card
      </Button>
      <Button
        disabled={currentCard.status === CardStatusEnum.KNOWN}
        onClick={() => checkStatus(currentCard?.id)}
        className="gap-1"
        variant="outline"
      >
        <Check size={16} /> I Know it
      </Button>
      <Button onClick={() => getNextCard(currentCard?.id)} className="gap-1">
        Next Card <ArrowRightIcon size={16} />
      </Button>
    </footer>
  );
};
