import { useState } from "react";
import DifficultySelector from "./components/DifficultySelector";
import GameBoard from "./components/GameBoard";
import type { GameSession } from "./types/types";

function App() {
  const [session, setSession] = useState<GameSession | null>(null);

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Juego Wordly</h1>
      {!session ? (
        <DifficultySelector onSessionStart={setSession} />
      ) : (
        <>
          <p>
            Dificultad: <strong>{session.difficulty.name}</strong>
          </p>
          <p>
            Longitud de palabra: <strong>{session.wordLength}</strong>
          </p>
          <GameBoard session={session} />
        </>
      )}
    </div>
  );
}

export default App;