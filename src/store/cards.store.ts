import { persist } from "zustand/middleware";
import { extractMdSections } from "../utilities/extract-md-sections.utilitie";
import { Card } from "../models/card.model";
import { create } from "zustand";
import { cardAdapter } from "../adapters/card.adapter";
import { CardStatusEnum } from "../models/card-status-enum";

interface CardsState {
  name: string;
  cards: Card[];
  currentCard: Card | null;
  loadCards: (name: string, content: string) => void;
  getNextCard: () => void;
  updateCardStatus: (cardStatus: CardStatusEnum) => void;
  removeUnknownCards: () => void;
}

export const useCardsStore = create<CardsState>()(
  persist(
    (set, get) => ({
      name: "",
      cards: [],
      currentCard: null,
      currentPosition: 0,
      loadCards: (name: string, content: string) => {
        const mdSections = extractMdSections(content);
        const cards = mdSections.map(cardAdapter);

        set({
          name,
          cards,
          currentCard: cards[0],
        });
      },
      getNextCard: () => {
        const currentCard = get().currentCard;
        const cards = get().cards;

        if (!currentCard) return;

        const index = cards.findIndex((card) => card.id === currentCard?.id);
        const nextIndex = (index + 1) % get().cards.length;
        const nextCard = cards[nextIndex];

        set({
          currentCard: nextCard,
        });
      },
      updateCardStatus: (cardStatus: CardStatusEnum) => {
        const currentCard = get().currentCard;
        if (!currentCard) return;

        const updatedCard = { ...currentCard };
        updatedCard.status = cardStatus;

        set({
          currentCard: updatedCard,
        });
      },
      removeUnknownCards: () => {
        const cards = get().cards;
        if (!cards.length) return;

        const newCards = cards.filter(
          (card) => card.status !== CardStatusEnum.UNKNOWN,
        );

        set({
          cards: newCards,
        });
      },
    }),
    { name: "__md_flash_cards__" },
  ),
);
