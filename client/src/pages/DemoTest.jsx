import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";

const questions = [
  {
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Personal Unit", "Central Print Unit", "Control Processing Unit"],
    answer: 0,
  },
  {
    question: "Which device is used to input text and numbers?",
    options: ["Monitor", "Keyboard", "Mouse", "Printer"],
    answer: 1,
  },
  {
    question: "Which of these is an output device?",
    options: ["Scanner", "Keyboard", "Monitor", "Microphone"],
    answer: 2,
  },
  {
    question: "What is the full form of RAM?",
    options: ["Read Access Memory", "Random Access Memory", "Run Accept Memory", "Read And Memory"],
    answer: 1,
  },
  {
    question: "Which software is used for typing documents?",
    options: ["MS Word", "MS Excel", "MS PowerPoint", "MS Paint"],
    answer: 0,
  },
  {
    question: "Which key is used to delete text to the left of the cursor?",
    options: ["Enter", "Shift", "Backspace", "Tab"],
    answer: 2,
  },
  {
    question: "Which of these is NOT an operating system?",
    options: ["Windows", "Linux", "Android", "MS Office"],
    answer: 3,
  },
  {
    question: "What does WWW stand for?",
    options: ["World Wide Web", "Web World Wide", "Wide World Web", "World Web Wide"],
    answer: 0,
  },
  {
    question: "Which shortcut is used to copy?",
    options: ["Ctrl + X", "Ctrl + V", "Ctrl + C", "Ctrl + Z"],
    answer: 2,
  },
  {
    question: "Which part of the computer stores data permanently?",
    options: ["RAM", "ROM", "Hard Disk", "Cache"],
    answer: 2,
  },
];

const TOTAL_TIME = 10 * 60; // 10 minutes in seconds

export default function DemoTest() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(Array(10).fill(null));
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!started || submitted) return;
    if (timeLeft === 0) {
      setSubmitted(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [started, timeLeft, submitted]);

  const handleStart = () => {
    setStarted(true);
    setTimeLeft(TOTAL_TIME);
    setCurrent(0);
    setSelected(Array(10).fill(null));
    setSubmitted(false);
  };

  const handleOption = (idx) => {
    if (submitted) return;
    setSelected((prev) => {
      const arr = [...prev];
      arr[current] = idx;
      return arr;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const correctCount = selected.filter((ans, i) => ans === questions[i].answer).length;

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-8">
      <Card className="w-full max-w-xl shadow-lg border-0 bg-white/95 rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Demo Test: Computer Basics</CardTitle>
        </CardHeader>
        <CardContent>
          {!started ? (
            <div className="flex flex-col items-center space-y-6 py-8">
              <p className="text-lg text-muted-foreground text-center">Test your knowledge of computer basics with 10 MCQs. You have 10 minutes. Good luck!</p>
              <Button className="bg-black text-white px-8 py-3 text-lg rounded-lg" onClick={handleStart}>Start Demo Test</Button>
            </div>
          ) : submitted ? (
            <div className="space-y-6 py-8 text-center">
              <h2 className="text-xl font-bold">Test Submitted!</h2>
              <p className="text-lg">Your Score: <span className="font-bold">{correctCount} / 10</span></p>
              <div className="mt-4 text-left">
                <h3 className="font-semibold mb-2">Correct Answers:</h3>
                <ol className="list-decimal ml-6 space-y-1">
                  {questions.map((q, i) => (
                    <li key={i}>
                      <span className="font-medium">{q.question}</span>
                      <br />
                      <span className="text-green-700">Correct: {q.options[q.answer]}</span>
                      {selected[i] !== null && selected[i] !== q.answer && (
                        <span className="text-red-600 ml-2">(Your: {q.options[selected[i]]})</span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
              <Button className="mt-6" onClick={handleStart}>Retake Test</Button>
            </div>
          ) : (
            <div>
              {/* Timer */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-base font-medium">Time Left: <span className={timeLeft < 60 ? "text-red-600" : ""}>{formatTime(timeLeft)}</span></div>
                <Progress value={((TOTAL_TIME - timeLeft) / TOTAL_TIME) * 100} className="h-2 w-32" />
              </div>
              {/* Question */}
              <div className="mb-4">
                <div className="text-lg font-semibold mb-2">Q{current + 1}. {questions[current].question}</div>
                <div className="space-y-2">
                  {questions[current].options.map((opt, idx) => (
                    <label key={idx} className={`block px-4 py-2 rounded-lg border cursor-pointer transition-colors ${selected[current] === idx ? "bg-black text-white border-black" : "bg-gray-100 hover:bg-gray-200 border-gray-300"}`}>
                      <input
                        type="radio"
                        name={`q${current}`}
                        checked={selected[current] === idx}
                        onChange={() => handleOption(idx)}
                        className="mr-2 hidden"
                        disabled={submitted}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  className="px-6"
                  onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                  disabled={current === 0}
                >
                  Previous
                </Button>
                {current < questions.length - 1 ? (
                  <Button
                    className="px-6 bg-black text-white"
                    onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    className="px-6 bg-green-700 text-white"
                    onClick={handleSubmit}
                    disabled={selected.some((s) => s === null)}
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
