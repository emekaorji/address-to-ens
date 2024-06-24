'use client';

import { ethers, InfuraProvider, JsonRpcProvider } from 'ethers';
import { useCallback, useState } from 'react';

export default function Home() {
  const [coinAddress, setCoinAddress] = useState('');

  const getENSName = useCallback(async () => {
    // Connect to the Ethereum network (Mainnet)
    const provider = new JsonRpcProvider(
      'https://mainnet.infura.io/v3/c528dc5a0a724b3696a61b876bab146f'
    );

    try {
      // Lookup the ENS name
      const ensName = await provider.lookupAddress(coinAddress);
      if (ensName) {
        console.log(`ENS Name: ${ensName}`);
      } else {
        console.log('No ENS name found for this address.');
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }, [coinAddress]);

  // Replace with the contract address of the deployed coin
  // const contractAddress = "0x1234567890abcdef1234567890abcdef12345678";

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      getENSName();
    },
    [getENSName]
  );

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={coinAddress}
          onChange={(e) => setCoinAddress(e.target.value)}
        />
        <button type='submit'>Get ENS Domain</button>
      </form>
    </main>
  );
}
