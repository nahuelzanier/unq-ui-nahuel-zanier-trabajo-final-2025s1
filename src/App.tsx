import { useState } from "react";
import DifficultySelector from "./components/DifficultySelector";
import GameBoard from "./components/GameBoard";
import type { GameSession } from "./types/types";

function App() {
  const [session, setSession] = useState<GameSession | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Juego Wordly</h1>
        {!session ? (
          <DifficultySelector onSessionStart={setSession} />
        ) : (
          <>
            <div className="mb-4 text-center">
              <p className="text-lg">
                Dificultad: <strong>{session.difficulty.name}</strong>
              </p>
              <p className="text-lg">
                Longitud de palabra: <strong>{session.wordLength}</strong>
              </p>
            </div>
            <GameBoard session={session} onRestart={() => setSession(null)} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;