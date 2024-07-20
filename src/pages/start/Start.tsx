import { useState } from "react";
import { Button } from "../../components/button";
import { useCardsStore } from "../../store/cards.store";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { cn } from "../../utilities/cn";

export function Start() {
  const [tabs, setTabs] = useState<"GENERAL" | "CODE">("GENERAL");
  const handleSetTabs = (tab: "GENERAL" | "CODE") => {
    setTabs(tab);
  };

  const currentCard = useCardsStore((state) => state.currentCard);
  return (
    <main className="my-4 mx-2 tablet:mx-auto max-w-[700px] flex flex-col gap-4">
      <header className="flex m-auto border rounded-lg w-max">
        <Button
          className="rounded-r-none"
          onClick={() => handleSetTabs("GENERAL")}
          variant={tabs === "GENERAL" ? "default" : "secondary"}
        >
          General
        </Button>
        <Button
          className="rounded-l-none"
          onClick={() => handleSetTabs("CODE")}
          variant={tabs === "CODE" ? "default" : "secondary"}
        >
          Code
        </Button>
      </header>

      {tabs === "GENERAL" && (
        <div
          className={cn(
            "flex justify-center items-center text-2xl p-4 border m-auto",
            "tablet:w-[400px]  rounded-lg h-[300px] text-center",
          )}
        >
          <h2>{currentCard?.general}</h2>
        </div>
      )}
      {tabs === "CODE" && (
        <div
          className={cn(
            "h-[300px] p-2 border rounded-lg overflow-y-scroll",
            " tablet:w-[400px] m-auto ",
          )}
        >
          <MarkdownPreview
            className="w-full"
            source={currentCard?.code}
            wrapperElement={{
              "data-color-mode": "light",
            }}
          />
        </div>
      )}
    </main>
  );
}
