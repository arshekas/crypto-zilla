import React, { useEffect } from 'react';
import Login from './Login/Login';
import Home from './Home/Home';
import LoadingSpinner from './UI/Loading/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import useStorage from '../hooks/useStorage';
import useWeb3Services from '../hooks/Web3Services';
import { validProviders } from '../functions/validProviders';
import { setError } from '../redux/actions/web3_actions';
import Header from './Header/Header';

function App() {
  const { getItem } = useStorage();
  const dispatch = useDispatch();
  const { onLogin } = useWeb3Services();
  const { isConnected, isConnecting } = useSelector((state) => state.web3);
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
      <Header />
      <main>
        {isConnecting ? (
          <LoadingSpinner />
        ) : (
          <>{!isConnected ? <Login /> : <Home />}</>
        )}
      </main>
    </div>
  );
}

export default App;
