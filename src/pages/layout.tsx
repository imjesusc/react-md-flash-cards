import { cn } from "../utilities/cn";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header
        className={cn(
          "border mx-2 my-4 py-8 px-6 w-auto max-w-[700px] ",
          "rounded-lg bg-accent flex items-center justify-between tablet:mx-auto",
        )}
      >
        <h1 className="text-2xl">Md Flash Cards</h1>
      </header>
      <>{children}</>
    </>
  );
}
