import React, { useState } from 'react';
import questions from './questions';
import { useNavigate } from 'react-router-dom';

type SurveyScreenProps = {
  stakeKey: string;
  isDRep: boolean | null;
  submitSurvey: (answers: string[]) => void;
  disconnect: () => void;
};

export default function SurveyScreen({ stakeKey, isDRep, submitSurvey }: SurveyScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showSubmitStep, setShowSubmitStep] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = questions[currentIndex];

  function handleAnswer(choiceLetter: string) {
    const newAnswers = [...userAnswers, choiceLetter];
    setUserAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSubmitStep(true);
    }
  }

  async function handleFinalSubmit() {
    setSubmitting(true);
    await submitSurvey(userAnswers);
    navigate('/');
  }

  const buttonLabel = isDRep ? 'Submit Answers' : 'Get Recommendation';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900 text-white p-6">
      <div className="max-w-2xl w-full bg-gray-900 bg-opacity-60 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bungee neon-text mb-4">DRep Survey</h2>
        <p className="text-lg mb-2">Stake Address: <span className="text-teal-400">{stakeKey}</span></p>
        <p className="mb-4">dRep Registered? {isDRep ? '✅ Yes' : '❌ No'}</p>

        {!showSubmitStep ? (
          <div className="mb-6">
            <div className="text-teal-300 font-bold mb-2">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <h3 className="text-2xl mb-4">
              {isDRep ? currentQuestion.drep : currentQuestion.holder}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.answers.map((answer, i) => {
                const letter = String.fromCharCode(65 + i); // 'A', 'B', 'C', 'D'
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(letter)}
                    className="btn-game bg-gray-800 hover:bg-teal-500 text-white py-3 px-4 rounded-lg shadow-md border border-teal-400"
                  >
                    {letter}) {answer}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl mb-6">You're all set!</h3>
            <p className="mb-4">
              {isDRep
                ? 'Thanks for your input. Please submit your answers now.'
                : 'Click below to get your recommended DRep based on your responses.'}
            </p>

            {submitting ? (
              <p className="text-lg text-teal-300">✅ Submitting your answers...</p>
            ) : (
              <button
                onClick={handleFinalSubmit}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md"
              >
                {buttonLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
