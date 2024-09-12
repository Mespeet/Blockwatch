"use client"

import VaultProgress from '@/components/vaults/vault-progress';
import { useEffect, useState } from 'react';

interface VaultData {
  [key: string]: number;
}

export default function Page() {
  const [vaults, setVaults] = useState<VaultData>({});

  useEffect(() => {
    // Fetch vault data from the API
    const fetchVaultData = async () => {
      try {
        const response = await fetch('/api/vault/getvaultsfullness');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVaults(data);
      } catch (error) {
        console.error('Error fetching vault data:', error);
      }
    };

    fetchVaultData();
  }, []);

  return (
    <main className="w-full grid grid-cols-3 xl:grid-cols-5 gap-4 px-4 py-4">
      {Object.entries(vaults).map(([vaultKey, progress], index) => (
        <VaultProgress
          key={vaultKey}
          vault={index}
          progress={progress}
        />
      ))}
    </main>
  );
}