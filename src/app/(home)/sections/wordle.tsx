"use client";

import WordInput from "@/components/wordInput";
import { useMemo, useState } from "react";

const TOTAL_CHANCES = parseInt(process.env.TOTAL_CHANCES ?? "6");

type Wordle = {
  solution: string;
};

export default function Wordle({ solution }: Wordle) {
  const [guesses, setGuesses] = useState<string[]>(
    Array(TOTAL_CHANCES).fill(null)
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const nullableIndex = useMemo(() => {
    const nullableIndex = guesses.findIndex((guess) => guess === null);
    if (nullableIndex === -1) {
      setIsFailed(true);
    }
    return nullableIndex;
  }, [guesses]);

  const handleOnChange = (value: string) => {
    if (nullableIndex !== null || nullableIndex !== -1) {
      setGuesses((prev) => {
        const newGuesses = [...prev];
        newGuesses[nullableIndex] = value;
        return newGuesses;
      });
      setIsCompleted(() => value === solution);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {guesses.map((guess, index) => {
        return (
          <WordInput
            key={index}
            onChange={handleOnChange}
            solution={solution}
            isCompleted={isCompleted}
          />
        );
      })}
      {isFailed && <h3>Game over! Better luck next time!</h3>}
      {isCompleted && <h3>Game completed!</h3>}
    </div>
  );
}
