import { useState } from "react";
import DifficultySelector from "./components/DifficultySelector";
import type { GameSession } from "./types/types";

function App() {
  const [session, setSession] = useState<GameSession | null>(null);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Juego Wordly</h1>
      {!session ? (
        <DifficultySelector onSessionStart={setSession} />
      ) : (
        <div>
          <p>
            Dificultad: <strong>{session.difficulty.name}</strong>
          </p>
          <p>
            Longitud de palabra: <strong>{session.wordLength}</strong>
          </p>
          {/* Acá irá la lógica del juego más adelante */}
        </div>
      )}
    </div>
  );
}

export default App;