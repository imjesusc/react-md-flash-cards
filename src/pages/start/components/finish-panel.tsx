import { Button } from "../../../components/button";
import { useCards } from "../../../hooks/use-cards";
import { useCardsStore } from "../../../store/cards.store";

export const FinishPanel = () => {
  const { startNew, restart } = useCards();
  const cards = useCardsStore((state) => state.cards);

  return (
    <div className="flex flex-col items-center gap-4">
      <header>
        <h1 className="text-2xl">You completed all cards</h1>
      </header>
      <footer className="flex gap-4">
        <Button onClick={() => startNew()}>Start new</Button>
        <Button disabled={cards.length === 0} onClick={() => restart()}>
          Restart
        </Button>
      </footer>
    </div>
  );
};
