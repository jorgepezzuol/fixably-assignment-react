import { AxiosResponse } from 'axios';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';
import { Order } from '../types';

interface OrdersProviderProps {
  children: ReactNode;
}

interface OrdersContextData {
  orders: Order[];
  loadMoreOrders: (page: number) => Promise<void>;
}

const OrderContext = createContext<OrdersContextData>({} as OrdersContextData);

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api
      .get('orders?page=1')
      .then((response) => setOrders(response.data.results));
  }, []);

  async function loadMoreOrders(page: number): Promise<void> {
    api.get(`orders?page=${page}`).then((response) => {
      setOrders([...orders, ...response.data.results]);
    });
  }

  return (
    <OrderContext.Provider value={{ orders, loadMoreOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders(): OrdersContextData {
  const context = useContext(OrderContext);

  return context;
}
