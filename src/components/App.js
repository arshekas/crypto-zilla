import React, { useEffect } from 'react';
import Login from './Login/Login';
import Home from './Home/Home';
import LoadingSpinner from './UI/Loading/LoadingSpinner';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStorage from '../hooks/useStorage';
import useWeb3Services from '../hooks/Web3Services';
import { validProviders } from '../functions/validProviders';
import { setError } from '../redux/actions/web3_actions';

function App() {
  const { getItem } = useStorage();
  const dispatch = useDispatch();
  const { onLogin, logout } = useWeb3Services();
  const { account, isConnected, isConnecting } = useSelector(
    (state) => state.web3
  );
  useEffect(() => {
    // * To detect if user changed its accounts and only change automatically if user is loggedIn
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        const accountChanged = getItem('accountChanged', 'sessionStorage'); // prevent from re-occurring
        if (accounts.length > 0 && !!accountChanged) {
          onLogin();
        }
      });

      // * To detect if user changed its chain and only change automatically if user is loggedIn
      window.ethereum.on('chainChanged', async (chainId) => {
        const chainChanged = getItem('chainChanged', 'sessionStorage'); // prevent from re-occurring
        if (!!chainChanged) {
          onLogin();
        } else {
          if (validProviders.includes(chainId)) {
            dispatch(setError(''));
          } else {
            dispatch(
              setError(
                'Wrong Network! Only Polygon, BSC and Rinkeby is supported.'
              )
            );
          }
        }
      });
    }
  }, []);

  return (
    <div>
      <header className='main-header'>
        <h1>Crypto Zilla</h1>
        <nav className='nav'>
          <ul>
            <li>
              {account && (
                <Button variant='contained' color='primary' onClick={logout}>
                  Sign out
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {isConnecting ? (
          <LoadingSpinner />
        ) : (
          <>{!isConnected ? <Login onLogin={onLogin} /> : <Home />}</>
        )}
      </main>
    </div>
  );
}

export default App;
