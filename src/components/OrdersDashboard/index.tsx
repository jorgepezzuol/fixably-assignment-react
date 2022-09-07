import { OrdersTable } from '../OrdersTable';
import { OrdersStatistics } from '../OrdersStatistics';

import { Container } from './styles';

export function OrdersDashboard() {
  return (
    <Container>
      <OrdersStatistics />
      <OrdersTable />
    </Container>
  );
}
