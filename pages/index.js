import { Provider } from 'react-redux';
import App from '../src/components/App';
import store from '../src/redux/store';

export default function Home() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
