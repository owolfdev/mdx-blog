"use client";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
// import Confetti from "react-confetti";
import { Button } from "@/components/ui/button";

interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
}

// Keyframes for dancing ants animation
const dancingAnts = keyframes`
  to {
    background-position: 100%;
  }
`;

// Styled component for Quiz with dancing ants border
const QuizContainer = styled.div`
  border: 2px dashed black;
  background: linear-gradient(white, white) padding-box,
    repeating-linear-gradient(-45deg, black 0, black 25%, white 0, white 50%) 0 /
      0.6em 0.6em;
  animation: ${dancingAnts} 1s linear infinite;
  border-radius: 0.8rem;

  position: relative; // Needed for confetti
`;

const Quiz: React.FC<QuizProps> = ({ question, options, correctAnswer }) => {
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setUserAnswer(option);
    setResult(""); // Reset the result when a new option is selected
    setShowConfetti(false); // Hide confetti when a new option is selected
  };

  const checkAnswer = () => {
    if (userAnswer === correctAnswer) {
      setResult("Yes. Correct!");
      setShowConfetti(true); // Show confetti for correct answer
    } else {
      setResult("Nope. Try again!");
      setShowConfetti(false);
    }
  };

  return (
    <QuizContainer className="overflow-hidden">
      {/* {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )} */}
      <div className="bg-white p-[1.5rem] rounded-xl relative ">
        <h2 className="text-gray-800">{question}</h2>
        <p className="text-gray-800 text-sm">
          Select the correct answer below, then submit.
        </p>
        <div className="flex flex-col gap-2 items-start mb-6 text-gray-800">
          {options.map((option) => (
            <button
              className={`py-1 px-3 ${
                userAnswer === option ? "font-bold" : ""
              }`}
              onClick={() => handleOptionClick(option)}
              key={option}
            >
              • {option}
            </button>
          ))}
        </div>
        <div className="mb-3 ">
          <Button className="border" onClick={checkAnswer}>
            Submit Your Answer
          </Button>
        </div>
        <div>
          {result && (
            <div className="text-2xl font-bold text-gray-800">{result}</div>
          )}
        </div>
      </div>
    </QuizContainer>
  );
};

export default Quiz;
