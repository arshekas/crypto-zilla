import { useSelector } from 'react-redux';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';

const Login = ({ onLogin }) => {
  const { isConnecting, error } = useSelector((state) => state.web3);
  return (
    <div className={classes.login_container}>
      <Card className={classes.login}>
        <h2>Connect your wallet to transfer items/tokens</h2>
        <button
          onClick={onLogin}
          disabled={error.length > 0}
          className={classes.button}
          type='button'
        >
          {!isConnecting && 'Connect'}
          {isConnecting && 'Loading...'}
        </button>
      </Card>
      <p className={classes.error}>{error.length > 0 && error}</p>
    </div>
  );
};

export default Login;
