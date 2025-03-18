import { useRef, useState } from "react";

const WORD_LENGTH = parseInt(process.env.WORD_LENGTH ?? "5");

type WordInput = {
  onChange: (value: string) => void;
  solution: string;
  isCompleted: boolean;
};

export default function WordInput({
  onChange,
  solution,
  isCompleted,
}: WordInput) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [letters, setLetters] = useState<(string | null)[]>(
    Array(WORD_LENGTH).fill(null)
  );
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (isSubmitted || isCompleted) {
      return;
    }
    if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < WORD_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    } else if (event.key === "Backspace" && letters[index]) {
      const newLetters = [...letters];
      newLetters[index] = null;
      setLetters(newLetters);
    } else if (event.key === "Backspace" && !letters[index]) {
      inputsRef.current[index ? index - 1 : 0]?.focus();
    } else if (event.key.match(/^[a-zA-Z]$/) && index < WORD_LENGTH) {
      const newLetters = [...letters];
      newLetters[index] = event.key.toUpperCase();
      setLetters(newLetters);
      if (index < 4) {
        inputsRef.current[index + 1]?.focus();
      } else {
        console.log("blue called");
        inputsRef.current[index]?.blur();
      }
    } else if (
      event.key === "Enter" &&
      letters.join("").length === WORD_LENGTH
    ) {
      setIsSubmitted(true);
      inputsRef.current[index]?.blur();
      onChange(letters.join(""));
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {letters.map((letter, index) => {
        const className =
          letter && isSubmitted
            ? getTileClassName(letter, index, solution)
            : "";
        return (
          <input
            key={index}
            ref={(el) => {
              if (el && !isCompleted) inputsRef.current[index] = el;
            }}
            type="text"
            value={letter ?? ""}
            maxLength={1}
            readOnly
            disabled={isCompleted}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`size-16 border border-gray-200 flex items-center justify-center text-center rounded-lg ${className} ${
              isCompleted || isSubmitted ? "pointer-events-none" : ""
            }`}
          />
        );
      })}
    </div>
  );
}

function getTileClassName(letter: string, index: number, solution: string) {
  letter = letter.toUpperCase();
  if (solution.includes(letter) && solution[index] !== letter) {
    return "bg-yellow-400 text-white";
  } else if (solution.includes(letter) && solution[index] === letter) {
    return "bg-green-400 text-white";
  } else return "bg-gray-400 text-white";
}
