import { useGameLogic } from "../hooks/useGameLogic";
import type { GameSession } from "../types/types";

type Props = {
  session: GameSession;
  onRestart: () => void;
};

export default function GameBoard({ session, onRestart }: Props) {
  const {
    word,
    setWord,
    attempts,
    status,
    handleSubmit,
  } = useGameLogic(session);

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit();
    } catch (err: any) {
      alert("Palabra inválida");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-xl font-semibold text-gray-800">Intentos</h2>

      <div className="flex flex-col gap-2">
        {attempts.map((attempt, index) => (
          <div key={index} className="flex gap-2">
            {attempt.map((res, i) => {
              let bgColor =
                res.solution === "correct"
                  ? "bg-green-500 text-white"
                  : res.solution === "elsewhere"
                  ? "bg-yellow-400 text-black"
                  : "bg-gray-300 text-black";
              return (
                <div
                  key={i}
                  className={`w-10 h-10 rounded flex items-center justify-center uppercase font-bold text-lg ${bgColor}`}
                >
                  {res.letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {status === "playing" && (
        <form onSubmit={onFormSubmit} className="flex gap-2 items-center">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value.toUpperCase())}
            maxLength={session.wordLength}
            className="border border-gray-400 rounded px-3 py-1 uppercase tracking-widest text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={word.length !== session.wordLength}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Enviar
          </button>
        </form>
      )}

      {status === "won" && <p className="text-green-600 font-semibold">¡Ganaste!</p>}
      {status === "lost" && <p className="text-red-600 font-semibold">Perdiste. Se acabaron los intentos.</p>}

      {(status === "won" || status === "lost") && (
        <button
          onClick={onRestart}
          className="mt-2 bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          Jugar de nuevo
        </button>
      )}
    </div>
  );
}