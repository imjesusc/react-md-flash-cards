import MarkdownPreview from "@uiw/react-markdown-preview";
import { useState } from "react";
import { Button } from "../../components/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/tabs";
import { useCards } from "../../hooks/use-cards";
import { useCardsStore } from "../../store/cards.store";
import { cn } from "../../utilities/cn";
import { ActionsButtons } from "./components/actions-buttons";
import { FinishPanel } from "./components/finish-panel";

export function Start() {
  const [tab, setTab] = useState("general");
  const onTabChange = (value: string) => {
    setTab(value);
  };

  const currentCard = useCardsStore((state) => state.currentCard);
  const { showNextCard, changeStatus } = useCards();

  return (
    <main className="my-4 mx-2 tablet:mx-auto max-w-[700px] flex flex-col gap-4">
      {currentCard ? (
        <>
          <Tabs value={tab} onValueChange={onTabChange} className="m-auto">
            <TabsList className="flex justify-center">
              <TabsTrigger value="general" asChild>
                <Button
                  className="rounded-r-none pointer-events-none"
                  variant={tab === "general" ? "default" : "ghost"}
                >
                  General
                </Button>
              </TabsTrigger>
              <TabsTrigger value="code" asChild>
                <Button
                  className="rounded-l-none pointer-events-none"
                  variant={tab === "code" ? "default" : "ghost"}
                >
                  Code
                </Button>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div
                className={cn(
                  "flex justify-center items-center text-2xl p-4 border m-auto",
                  "tablet:w-[500px] rounded-lg h-[350px] text-center"
                )}
              >
                <p>{currentCard?.general}</p>
              </div>
            </TabsContent>
            <TabsContent value="code">
              <div
                className={cn(
                  "h-[350px] p-2 border rounded-lg overflow-y-scroll",
                  "tablet:w-[500px] m-auto"
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
            </TabsContent>
          </Tabs>

          <ActionsButtons
            onTabChange={onTabChange}
            tab={tab}
            currentCard={currentCard}
            checkStatus={changeStatus}
            getNextCard={showNextCard}
          />
        </>
      ) : (
        <FinishPanel />
      )}
    </main>
  );
}
