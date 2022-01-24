import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import useWeb3Services from '../../hooks/Web3Services';

function Header() {
  const { account } = useSelector((state) => state.web3);
  const { logout } = useWeb3Services();

  return (
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
  );
}

export default Header;
