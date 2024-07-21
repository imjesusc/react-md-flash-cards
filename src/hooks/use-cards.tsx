import { useNavigate } from "react-router-dom";
import { useCardsStore } from "../store/cards.store";

export function useCards() {
  const { reset, restartCards, getNextCard, checkStatus } = useCardsStore();
  const navigate = useNavigate();

  const changeStatus = (cardId: string) => {
    checkStatus(cardId);
  };

  const restart = () => {
    restartCards();
  };

  const showNextCard = (cardId: string) => {
    if (!cardId) return;
    getNextCard(cardId);
  };
  const startNew = () => {
    reset();
    navigate("/");
  };

  return {
    startNew,
    showNextCard,
    changeStatus,
    restart,
  };
}
