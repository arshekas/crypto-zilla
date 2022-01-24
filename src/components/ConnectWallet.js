import React, { useState, useEffect } from 'react';
import useWeb3Modal from '../hooks/Web3Services';

const ConnectWallet = () => {
  const { loadWeb3Modal } = useWeb3Modal();

  return (
    <>
      <button onClick={() => loadWeb3Modal()}>Sign In</button>
    </>
  );
};

export default ConnectWallet;
