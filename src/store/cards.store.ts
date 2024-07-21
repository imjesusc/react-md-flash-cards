import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cardAdapter } from "../adapters/card.adapter";
import { CardStatusEnum } from "../models/card-status-enum";
import { Card } from "../models/card.model";
import { extractMdSections } from "../utilities/extract-md-sections.utilitie";

interface CardsState {
  name: string;
  cards: Card[];
  currentCard: Card | null;
  loadCards: (name: string, content: string) => void;
  restartCards: () => void;
  reset: () => void;
  getNextCard: (cardId: string) => void;
  checkStatus: (cardId: string) => void;
}

export const useCardsStore = create<CardsState>()(
  persist(
    (set, get) => ({
      name: "",
      cards: [],
      currentCard: null,

      loadCards: (name: string, content: string) => {
        const mdSections = extractMdSections(content);
        const cards = mdSections.map(cardAdapter);

        set({
          name,
          cards,
          currentCard: cards[0],
        });
      },

      restartCards: () => {
        const updatedCards = get().cards.map((card) => ({
          ...card,
          status: CardStatusEnum.UNKNOWN,
        }));
        set({ cards: updatedCards, currentCard: updatedCards[0] });
      },

      getNextCard: (cardId: string) => {
        const cards = get().cards;
        const unknownCards = cards.filter(
          (card) => card.status === CardStatusEnum.UNKNOWN
        );

        if (unknownCards.length === 0) {
          set({ currentCard: null });
          return;
        }

        const currentCardIndex = unknownCards.findIndex(
          (card) => card.id === cardId
        );
        const indexRandom = Math.floor(Math.random() * unknownCards.length);

        const nextCard =
          unknownCards[
            indexRandom === currentCardIndex
              ? (indexRandom + 1) % unknownCards.length
              : indexRandom
          ];

        set({ currentCard: nextCard });
      },

      checkStatus: (cardId: string) => {
        const updatedCards = get().cards.map((card) =>
          card.id === cardId ? { ...card, status: CardStatusEnum.KNOWN } : card
        );
        set({ cards: updatedCards });
        const currentCard = updatedCards.find((card) => card.id === cardId);
        set({ currentCard });
      },

      reset: () => {
        set({
          name: "",
          cards: [],
          currentCard: null,
        });
      },
    }),
    { name: "__md_flash_cards__" }
  )
);
