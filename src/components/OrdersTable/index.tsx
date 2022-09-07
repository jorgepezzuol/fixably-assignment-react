import { useOrders } from '../../hooks/useOrders';
import { Container } from './style';

export function OrdersTable() {
  const { orders } = useOrders();

  return (
    <Container>
      {localStorage.getItem('token')}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Manufacturer</th>
            <th>Brand</th>
            <th>Technician</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={Math.random()}>
              <td>{order.id}</td>
              <td>{order.deviceType}</td>
              <td>{order.deviceManufacturer}</td>
              <td>{order.deviceBrand}</td>
              <td>{order.technician ?? '-'}</td>
              <td>{order.status}</td>
              <td>{order.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
