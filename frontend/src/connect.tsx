import React from 'react';

export type ConnectScreenProps = {
  availableWallets: string[];
  connecting: boolean;
  connectWallet: (name: string) => void;
};

export default function ConnectScreen({
  availableWallets,
  connecting,
  connectWallet
}: ConnectScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900 text-white p-6">
      <div className="max-w-xl w-full bg-gray-900 bg-opacity-60 rounded-2xl p-8 shadow-xl text-center">
        <h1 className="text-5xl md:text-7xl font-bungee neon-text mb-6">DHarmony</h1>
        <p className="mb-8">Connect your Cardano wallet to get started</p>
        {connecting && <p>Connecting…</p>}
        {availableWallets.map((w) => (
          <button
            key={w}
            onClick={() => connectWallet(w)}
            className="btn-game bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-6 rounded-full text-xl shadow-lg w-full mb-4"
          >
            Connect with {w}
          </button>
        ))}
      </div>
    </div>
  );
}
