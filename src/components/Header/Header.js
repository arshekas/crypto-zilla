import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import useWeb3Services from '../../hooks/Web3Services';
import Head from 'next/head';

function Header() {
  const { account } = useSelector((state) => state.web3);
  const { logout } = useWeb3Services();

  return (
    <>
      <Head>
        <title>Crypto Zilla</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header className='main-header'>
        <h1>Crypto Zilla</h1>
        <nav className='nav'>
          <ul>
            <li>
              {account && (
                <Button variant='contained' color='primary' onClick={logout}>
                  Disconnect
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
