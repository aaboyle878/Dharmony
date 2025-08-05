import React, { useState, useEffect } from 'react';
import { MeshProvider, useWallet } from '@meshsdk/react';
import { bech32 } from 'bech32';


import ConnectScreen from './connect';
import SurveyScreen from './survey';
import ResultScreen from './results';

const KNOWN_WALLETS = ['nami', 'eternl', 'lace', 'flint', 'vespr', 'demos', 'yoroi'];

function bech32ToHex(bech32Addr: string): string {
  const { words } = bech32.decode(bech32Addr);
  const bytes = bech32.fromWords(words);
  return Buffer.from(bytes).toString('hex');
}

export default function App() {
  return (
    <MeshProvider>
      <Content />
    </MeshProvider>
  );
}

function Content() {
  const {
    connect,
    disconnect,
    connecting,
    connected,
    wallet,
  } = useWallet();

  const [availableWallets, setAvailableWallets] = useState<string[]>([]);
  const [stakeKey, setStakeKey] = useState<string | null>(null);
  const [isDRep, setIsDRep] = useState<boolean | null>(null);
  const [dRepId, setDRepId] = useState<string | null>(null);
  const [recommendedDreps, setRecommendedDreps] = useState<any>(null);
  const [connectedWalletName, setConnectedWalletName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.cardano) {
      const walletNames = Object.keys(window.cardano).filter((key) => {
        const wallet = window.cardano[key];
        return (
          typeof wallet?.enable === 'function' &&
          typeof wallet?.name === 'string'
        );
      });
      setAvailableWallets(walletNames);
    }
  }, []);

  useEffect(() => {
    const unsubscribeFns: (() => void)[] = [];

    for (const walletName of KNOWN_WALLETS) {
      const walletApi = (window as any).cardano?.[walletName];
      if (walletApi?.experimental?.onAccountChange) {
        const unsubscribe = walletApi.experimental.onAccountChange(() => {
          console.log(`🔁 Account switched in ${walletName} – resetting app...`);
          (async () => {
            await disconnect();
            setStakeKey(null);
            setIsDRep(null);
            setDRepId(null);
            setRecommendedDreps(null);
            alert('Wallet account changed. Please reconnect.');
          })();
        });
        unsubscribeFns.push(unsubscribe);
      }
    }

    return () => {
      for (const unsub of unsubscribeFns) {
        unsub?.();
      }
    };
  }, [disconnect]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const startPolling = () => {
      interval = setInterval(async () => {
        try {
          if (!wallet || !connected) return;
          const rewardAddrs = await wallet.getRewardAddresses?.();
          const currentStake = rewardAddrs?.[0];
          if (stakeKey && currentStake && currentStake !== stakeKey) {
            console.log('🔁 Stake key changed – resetting app state...');
            await disconnect();
            setStakeKey(null);
            setIsDRep(null);
            setDRepId(null);
            setRecommendedDreps(null);
            alert('Wallet account changed. Please reconnect.');
          }
        } catch (err) {
          console.error('Polling error:', err);
          await disconnect();
          setStakeKey(null);
          setIsDRep(null);
          setDRepId(null);
          setRecommendedDreps(null);
          alert('Wallet error detected. Please reconnect.');
        }
      }, 2000);
    };

    if (connected) startPolling();
    return () => clearInterval(interval);
  }, [wallet, connected, stakeKey, disconnect]);

  useEffect(() => {
    const resolveWallet = async () => {
      if (!wallet || !connected) return;

      try {
       if (!connectedWalletName || !window.cardano?.[connectedWalletName]) {
          alert('Wallet name is missing or unsupported.');
          return;
        }

        if (!connectedWalletName || !window.cardano?.[connectedWalletName]) {
          console.warn('Wallet name missing or cardano interface not found');
          return;
        }
        const rawApi = await window.cardano[connectedWalletName].enable();

        const networkId = await rawApi.getNetworkId();
        const expectedNetworkId = 1; 

        if (networkId !== expectedNetworkId) {
          console.warn(`❌ Wrong network: expected ${expectedNetworkId}, got ${networkId}`);
          alert('Please switch your wallet to the correct Cardano network (Mainnet) and reconnect.');
          await disconnect();
          setStakeKey(null);
          setIsDRep(null);
          setDRepId(null);
          setRecommendedDreps(null);
          return;
        }

        const rewardAddrs = await wallet.getRewardAddresses?.();
        const stakeAddr = rewardAddrs?.[0];
        if (!stakeAddr) {
          alert('No reward address found.');
          return;
        }

        console.log('🔑 Stake key:', stakeAddr);
        setStakeKey(stakeAddr);

        let candidateDRepId: string | null = null;
        if (typeof wallet.getDRep === 'function') {
          const dRep = await wallet.getDRep();
          if (dRep?.dRepIDCip105) {
            candidateDRepId = dRep.dRepIDCip105;
            console.log('🧩 Potential DRep ID (Bech32):', candidateDRepId);
          }
        }

        if (!candidateDRepId) {
          setIsDRep(false);
          return;
        }

        const drepIdHex = bech32ToHex(candidateDRepId);
        const res = await fetch(`http://localhost:4000/verify-drep/${drepIdHex}`);
        const json = await res.json();
        console.log('🛰 Backend DRep verification:', json);

        if (json.isDRep) {
          setIsDRep(true);
          setDRepId(candidateDRepId);
        } else {
          setIsDRep(false);
        }
      } catch (err) {
        console.error('❌ Error resolving wallet:', err);
        alert('Error verifying DRep status or network.');
      }
    };

    resolveWallet(); 
  }, [connected, wallet, connectedWalletName]);

  async function handleConnect(name: string) {
    try {
      console.log('Trying to connect to:', name);
      await disconnect();
      setStakeKey(null);
      setIsDRep(null);
      setDRepId(null);
      setRecommendedDreps(null);
      setConnectedWalletName(name); // ✅ Save wallet name
      await connect(name);
    } catch (err) {
      console.error('Wallet connection failed:', err);
      alert('Failed to connect wallet.');
    }
  }


  async function submitSurvey(answers: string[]) {
    if (!stakeKey) {
      alert('Wallet disconnected or changed. Please reconnect.');
      return;
    }

    const res = await fetch('http://localhost:4000/submit-survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stakeAddress: stakeKey,
        answers,
        dRepId,
      }),
    });

    const data = await res.json();

    if (dRepId) {
      await disconnect();
      setStakeKey(null);
      setIsDRep(null);
      setDRepId(null);
      setRecommendedDreps(null);
      return;
    }

    setRecommendedDreps(data.recommendedDreps);
  }

  if (!stakeKey) {
    return (
      <ConnectScreen
        availableWallets={availableWallets}
        connecting={connecting}
        connectWallet={handleConnect}
      />
    );
  }

  if (!recommendedDreps) {
    return (
      <SurveyScreen
        stakeKey={stakeKey}
        isDRep={isDRep}
        submitSurvey={submitSurvey}
        disconnect={disconnect}
      />
    );
  }

  return <ResultScreen recommendations={recommendedDreps} />;
}
