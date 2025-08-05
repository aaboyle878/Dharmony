type DRepRecommendation = {
  drep_id: string;
  stake_address: string;
  score: number;
};

const govtoolUrl = import.meta.env.VITE_GOVTOOL_URL

export default function ResultScreen({ recommendations }: { recommendations: DRepRecommendation[] }) {
  const hasMatches = recommendations && recommendations.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900 text-white p-6">
      <div className="max-w-xl w-full bg-gray-900 bg-opacity-60 rounded-2xl p-8 shadow-xl text-center">
        <h2 className="text-4xl font-bungee neon-text mb-6">
          {hasMatches ? 'Your Top Matching DReps' : 'No Match Found'}
        </h2>

        {hasMatches ? (
          <ul className="text-left space-y-4">
            {recommendations.map((drep, idx) => (
              <li key={drep.drep_id} className="border-b border-teal-500 pb-2">
                <p className="text-teal-300 font-bold">#{idx + 1} — Match: {(drep.score * 100).toFixed(1)}%</p>
                <p className="text-sm">
                  dRep ID:{' '}
                  <a
                    href={`${govtoolUrl}/drep_directory/${drep.drep_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    {drep.drep_id}
                  </a>
                </p>
                <p className="text-sm">Stake Address: {drep.stake_address}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-teal-300">Try again later or check your answers.</p>
        )}

        <button
          className="btn-game bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg mt-8"
          onClick={() => window.location.reload()}
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
