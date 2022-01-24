import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import TransferForm from '../TransferForm/TransferForm';
import { useSelector } from 'react-redux';
import { getProviderName } from '../../functions/getProviderName';
const Home = () => {
  const { account, balance, provider } = useSelector((state) => state.web3);
  return (
    <>
      <Card className={classes.home}>
        <h1>Welcome</h1>
        <p className={classes.p}>
          Account:
          <span className={classes.span}>{account}</span>
        </p>
        <p className={classes.p}>
          Network Provider:
          <span className={classes.span}>{getProviderName(provider)}</span>
        </p>
        <p className={classes.p}>
          Balance:
          <span className={classes.span}>{balance} ETH</span>
        </p>
      </Card>
      <TransferForm />
    </>
  );
};
export default Home;
