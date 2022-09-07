import { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { Container, Content } from './styles';

export function Header() {
  const { loadMoreOrders } = useOrders();
  const [page, setPage] = useState(2);

  async function handleLoadMoreOrders() {
    increasePage();
    await loadMoreOrders(page);
  }

  function increasePage() {
    setPage((page) => page + 1);
  }

  return (
    <Container>
      <Content>
        <h1>Fi⚔️ably</h1>
        <button type='button' onClick={handleLoadMoreOrders}>
          Load more orders
        </button>
      </Content>
    </Container>
  );
}
