import { getWordOfTheDay } from "@/api/words";
import Wordle from "./sections/wordle";

export default async function Page() {
  const [wordOfTheDay] = await getWordOfTheDay();

  return (
    <main className="min-h-screen flex flex-col gap-28 items-center justify-center">
      <h1 className="pt-10 font-extrabold text-4xl">WORDLE</h1>

      <div className="h-fit w-fit border border-gray-300 p-4 flex flex-col items-center gap-4 rounded">
        {wordOfTheDay ? (
          <Wordle solution={wordOfTheDay.toUpperCase()} />
        ) : (
          <h3>Wordle currently unavailable</h3>
        )}
      </div>
    </main>
  );
}
