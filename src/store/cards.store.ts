import { persist } from "zustand/middleware";
import { extractMdSections } from "../utilities/extract-md-sections.utilitie";
import { Card } from "../models/card.model";
import { create } from "zustand";
import { cardAdapter } from "../adapters/card.adapter";

interface CardsState {
  name: string;
  cards: Card[];
  currentCard: Card | null;
  currentPosition: number;
  loadCards: (name: string, content: string) => void;
  getNextCard: () => void;
  updateCardStatus: (cardId: string) => void;
  removeUnknownCards: () => void;
}

export const useCardsStore = create<CardsState>()(
  persist(
    (set) => ({
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
        });

        set({
          currentCard: cards[0],
        });
      },
      getNextCard: () => {},
      updateCardStatus: (cardId: string) => {},
      removeUnknownCards: () => {},
    }),
    { name: "__md_flash_cards__" },
  ),
);
