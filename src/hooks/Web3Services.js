import Web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetWeb3,
  setAccount,
  setBalance,
  setError,
  setIsConnected,
  setIsConnecting,
  setProvider,
} from '../redux/actions/web3_actions';
import useStorage from './useStorage';
import { validProviders } from '../functions/validProviders';

export default function useWeb3Services() {
  const dispatch = useDispatch();
  const { setItem, removeItem } = useStorage();

  const { account } = useSelector((state) => state.web3);
  // * function to detect the metamask provider
  const detectProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      window.alert('No Ethereum browser detected! Check out MetaMask');
    }
    return provider;
  };

  // * To handle login functionality and check if network is valid
  const onLogin = async () => {
    const provider = detectProvider();
    if (!validProviders.includes(provider.chainId)) {
      logout();
      dispatch(
        setError('Wrong Network! Only Polygon, BSC and Rinkeby is supported.')
      );
    } else {
      dispatch(setError(''));
      if (provider) {
        if (provider !== window.ethereum) {
          console.error(
            'Not window.ethereum provider. Do you have multiple wallet installed ?'
          );
        }
        dispatch(setIsConnecting(true));
        await provider.request({
          method: 'eth_requestAccounts',
        });
        dispatch(setProvider(provider));
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          console.log('Please connect to MetaMask!');
        } else if (accounts[0] !== account) {
          dispatch(setAccount(accounts[0]));
          const accBalanceEth = web3.utils.fromWei(
            await web3.eth.getBalance(accounts[0]),
            'ether'
          );
          dispatch(setBalance(Number(accBalanceEth).toFixed(6)));
          dispatch(setIsConnected(true));
          setItem('accountChanged', 'on', 'sessionStorage');
          setItem('chainChanged', 'on', 'sessionStorage');
          dispatch(setIsConnecting(false));
        }
      }
    }
  };

  // * To logout the user means to clear off the state
  const logout = () => {
    dispatch(setIsConnecting(true));
    removeItem('accountChanged', 'sessionStorage');
    removeItem('chainChanged', 'sessionStorage');
    dispatch(resetWeb3());
  };
  return { onLogin, logout, detectProvider };
}
