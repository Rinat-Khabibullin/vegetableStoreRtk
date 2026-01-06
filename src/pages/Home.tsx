import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { Header } from '../components/Header/Header';
import { SimpleGrid, Center, Loader, Container, Title } from '@mantine/core';
import { CartPopup } from '../components/CartPopup/CartPopup';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addToCart, selectCartCount, selectCartItems, selectCartTotal } from '../store/cartSlice';
import { fetchProducts, selectProducts, selectProductsStatus } from '../store/productsSlice';

export function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const cartCount = useAppSelector(selectCartCount);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div data-testid="loader">
      <Center mt="xl">
        <Loader color="#3B944E" />
      </Center>
    </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F3F5FA', minHeight: '100vh' }}>
      <Header
        count={cartCount}
        onCartClick={() => setOpened(true)}
      />

      <Container
        fluid
        styles={{
          root: {
            paddingTop: 20,
            paddingLeft: 30,
            paddingRight: 10,
            paddingBottom: 60,
            boxSizing: 'border-box',
          },
        }}
      >
        <Title order={2} mb="lg" c="#212529">
          Catalog
        </Title>

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={24}
          verticalSpacing={28}
        >
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={(product, qty) => dispatch(addToCart({ product, delta: qty }))}
            />
          ))}
        </SimpleGrid>
      </Container>

      <CartPopup
        opened={opened}
        onClose={() => setOpened(false)}
        items={cartItems}
        total={cartTotal}
        onUpdateQuantity={(product, delta) =>
          dispatch(addToCart({ product, delta }))
        }
      />
    </div>
  );
}
