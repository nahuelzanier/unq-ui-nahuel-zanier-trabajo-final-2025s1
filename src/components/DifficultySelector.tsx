import { useState, useEffect } from "react";
import { getDifficulties, getSessionByDifficulty } from "../api/wordApi";
import type { Difficulty, GameSession } from "../types/types";

type Props = {
    onSessionStart: (session: GameSession) => void;
};

export default function DifficultySelector({ onSessionStart }: Props) {
    const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchDifficulties() {
            try {
                const data = await getDifficulties();
                setDifficulties(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDifficulties();
    }, []);

    const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        if (!selectedId) return;

        try {
        const rawSession = await getSessionByDifficulty(selectedId);
        console.log(rawSession)
        const session: GameSession = {
            sessionId: rawSession.sessionId,
            difficulty: rawSession.difficulty,
            wordLength: rawSession.wordLenght,
        };
        onSessionStart(session);
        } catch (err: any) {
            alert("Error al iniciar sesión: " + err.message);
        }
    };

    if (loading) return <p>Cargando dificultades...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <label htmlFor="difficulty">Seleccionar dificultad: </label>
            <select id="difficulty" onChange={handleSelect} defaultValue="">
                <option value="" disabled>
                Elegí una opción
                </option>
                {difficulties.map((diff) => (
                <option key={diff.id} value={diff.id}>
                    {diff.name}
                </option>
                ))}
            </select>
        </div>
    );
}
