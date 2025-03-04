import { useState } from "react";

export default function PlantesSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.response);
        setAlternatives(data.alternatives || []);

        // Sauvegarde dans l'historique local
        setHistory((prevHistory) => [
          ...prevHistory,
          { query, response: data.response },
        ]);
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Erreur de connexion à l'API");
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Rechercher une plante</h2>
      <input
        type="text"
        placeholder="Nom de la plante..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
        disabled={loading}
      >
        {loading ? (
          <span className="flex justify-center items-center">
            Recherche
            <span className="ml-2 animate-pulse">...</span>
          </span>
        ) : (
          "Vérifier la toxicité"
        )}
      </button>

      {error && <p className="text-red-600 mt-4">❌ {error}</p>}
      {result && <p className="text-gray-800 mt-4">✅ {result}</p>}

      {history.length > 0 && (
        <a
          href="/historique"
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Accéder à l'historique
        </a>
      )}

      {/* Historique des recherches */}
      {history.length > 0 && (
        <div className="mt-6 text-left">
          <h3 className="text-xl font-semibold mb-2">
            Historique des recherches :
          </h3>
          <ul className="border border-gray-300 rounded-lg p-4">
            {history.map((item, index) => (
              <li key={index} className="mb-2 p-2 border-b border-gray-200">
                <strong>{item.query}</strong> : {item.response}
              </li>
            ))}
          </ul>
          <button
            onClick={clearHistory}
            className="mt-2 bg-red-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-red-600 flex justify-end"
          >
            Effacer l'historique
          </button>
        </div>
      )}
    </div>
  );
}
