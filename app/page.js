'use client';

import { JsonRpcProvider } from 'ethers';
import { useCallback, useState } from 'react';

export default function Home() {
  const [coinAddress, setCoinAddress] = useState('');
  const [ensDomain, setEnsDomain] = useState('');

  const getENSFromAddressName = useCallback(async () => {
    // Connect to the Ethereum network (Mainnet)
    const provider = new JsonRpcProvider(
      'https://mainnet.infura.io/v3/c528dc5a0a724b3696a61b876bab146f'
    );

    try {
      // Lookup the ENS name
      const ensName = await provider.lookupAddress(coinAddress);
      if (ensName) {
        alert(`ENS Name: ${ensName}`);
      } else {
        alert('No ENS name found for this address.');
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }, [coinAddress]);

  const getAddressFromENS = useCallback(async () => {
    // Connect to the Ethereum network (Mainnet)
    const provider = new JsonRpcProvider(
      'https://mainnet.infura.io/v3/c528dc5a0a724b3696a61b876bab146f'
    );

    try {
      // Lookup the ENS name
      const ensName = await provider.resolveName(ensDomain);
      if (ensName) {
        alert(`ENS Name: ${ensName}`);
      } else {
        alert('No ENS name found for this address.');
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }, [ensDomain]);

  const handleSubmit1 = useCallback(
    (event) => {
      event.preventDefault();
      getENSFromAddressName();
    },
    [getENSFromAddressName]
  );

  const handleSubmit2 = useCallback(
    (event) => {
      event.preventDefault();
      getAddressFromENS();
    },
    [getAddressFromENS]
  );

  return (
    <main className='min-h-screen items-center justify-between p-24 text-center'>
      <h2 className='text-center text-4xl'>Get ENS from Address</h2>
      <form
        className='flex flex-col items-center gap-2'
        onSubmit={handleSubmit1}>
        <input
          type='text'
          value={coinAddress}
          onChange={(e) => setCoinAddress(e.target.value)}
        />
        <button className='bg-slate-300 p-2' type='submit'>
          Get ENS Domain
        </button>
      </form>
      <br />
      <br />
      <h2 className='text-center text-4xl'>Get Address from ENS</h2>
      <form
        className='flex flex-col items-center gap-2'
        onSubmit={handleSubmit2}>
        <input
          type='text'
          value={ensDomain}
          onChange={(e) => setEnsDomain(e.target.value)}
        />
        <button className='bg-slate-300 p-2' type='submit'>
          Get Address
        </button>
      </form>
    </main>
  );
}

/**
 * Sample Domains and Addresses
 *
 * OpenSea - 0x5b3256965e7C3cF26E11FCAf296DfC8807C01073
 * UniSwap - 0x1a9C8182C09F50C8318d769245beA52c32BE35BC
 * Metamask - 0x0c54FcCd2e384b4BB6f2E405Bf5Cbc15a017AaFb
 * MakerDAO - 0xfb3Ca875955675d091e6f82038A288e97284400f
 *
 * Vitalik - 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
 */
