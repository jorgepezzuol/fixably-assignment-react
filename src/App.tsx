import reactLogo from './assets/react.svg';
import { OrdersDashboard } from './components/OrdersDashboard';
import { Header } from './components/Header';
import { OrdersProvider } from './hooks/useOrders';
import { GlobalStyle } from './styles/globals';

function App() {
  return (
    <OrdersProvider>
      <Header />
      <OrdersDashboard />
      <GlobalStyle />
    </OrdersProvider>
  );
}

export default App;
