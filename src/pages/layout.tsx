import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "../components/button";
import { CardStatusEnum } from "../models/card-status-enum";
import { useCardsStore } from "../store/cards.store";
import { cn } from "../utilities/cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = useLocation().pathname;
  const reset = useCardsStore((state) => state.reset);
  const cards = useCardsStore((state) => state.cards);
  const unknownCards = cards.filter(
    (card) => card.status === CardStatusEnum.UNKNOWN
  ).length;

  return (
    <>
      <header
        className={cn(
          "border mx-2 my-4 py-7 px-6 w-auto max-w-[700px] ",
          "rounded-lg bg-accent flex items-center justify-between tablet:mx-auto"
        )}
      >
        <h1 className="text-2xl">Md Flash Cards</h1>

        {pathname === "/start" && (
          <div className="flex gap-4 items-center">
            <p>
              {unknownCards} unknown of {cards.length}
            </p>

            <Link
              to="/"
              onClick={reset}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Star new
            </Link>
          </div>
        )}
      </header>
      <>{children}</>
    </>
  );
}
