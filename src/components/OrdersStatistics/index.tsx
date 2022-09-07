import { useEffect, useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { Order } from '../../types';
import { Container } from './styles';

enum OrderStatusEnum {
  OPEN = 1,
  CLOSED = 2,
  ASSIGNED = 3,
  UNPAID = 4,
}

type OrderStatistic = {
  open: number;
  closed: number;
  assigned: number;
  unpaid: number;
};

export function OrdersStatistics() {
  const { orders } = useOrders();
  const [orderStatistics, setOrderStatistics] = useState<OrderStatistic>({
    open: 0,
    closed: 0,
    assigned: 0,
    unpaid: 0,
  });

  useEffect(() => {
    const statistics = orders.reduce<OrderStatistic>(
      (acc, order) => {
        switch (order.status) {
          case OrderStatusEnum.OPEN: {
            acc.open += 1;
            break;
          }
          case OrderStatusEnum.CLOSED: {
            acc.closed += 1;
            break;
          }
          case OrderStatusEnum.ASSIGNED: {
            acc.assigned += 1;
            break;
          }
          case OrderStatusEnum.UNPAID: {
            acc.unpaid += 1;
            break;
          }
        }

        return acc;
      },
      {
        open: 0,
        closed: 0,
        assigned: 0,
        unpaid: 0,
      }
    );

    setOrderStatistics(statistics);
  }, [orders]);

  return (
    <Container>
      <div className='open-order'>
        <header>
          <p>Open</p>
        </header>
        <strong>{orderStatistics.open}</strong>
      </div>
      <div>
        <header>
          <p>Closed</p>
        </header>
        <strong>{orderStatistics.closed}</strong>
      </div>
      <div>
        <header>
          <p>Assigned</p>
        </header>
        <strong>{orderStatistics.assigned}</strong>
      </div>
      <div className='unpaid-order'>
        <header>
          <p>Unpaid</p>
        </header>
        <strong>{orderStatistics.unpaid}</strong>
      </div>
    </Container>
  );
}
