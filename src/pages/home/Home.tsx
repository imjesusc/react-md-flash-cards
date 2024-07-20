import { CollectionCardForm } from "./components/collection-card-form";

export default function Home() {
  return (
    <main className="my-4 mx-2 tablet:mx-auto max-w-[700px] flex flex-col gap-4">
      <header>
        <h1 className="text-2xl text-semibold">Add collections card</h1>
      </header>
      <CollectionCardForm />
    </main>
  );
}
