import {
  Group,
  Text,
  Image,
  Divider,
  Button,
  Flex,
  Paper,
  Center,
  Stack,
} from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { useClickOutside } from '@mantine/hooks';
import type { Product } from '../../types/Product';
import type { CartItem } from '../../store/cartSlice';

interface CartPopupProps {
  opened: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onUpdateQuantity: (product: Product, delta: number) => void;
}

export function CartPopup({
  opened,
  onClose,
  items,
  total,
  onUpdateQuantity,
}: CartPopupProps) {
  const ref = useClickOutside(onClose);

  if (!opened) return null;

  return (
    <Paper
      ref={ref}
      shadow="md"
      radius="lg"
      p="md"
      style={{
        position: 'fixed',
        top: 70,
        right: 24,
        width: 340,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
        zIndex: 100,
      }}
    >
      {items.length === 0 ? (
        <Center py="xl">
          <Stack align="center" gap="xs">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
              alt="empty"
              width={120}
              height={120}
              style={{ opacity: 0.5, objectFit: 'contain' }}
            />
            <Text mt="sm" c="#868E96">
              Your cart is empty!
            </Text>
          </Stack>
        </Center>
      ) : (
        <>
          {items.map(({ product, quantity }) => (
            <div key={product.id}>
              <Flex style={{ width: '100%', maxWidth: '100%' }} align="flex-start" mb="sm">
                <div style={{ width: 60, height: 60, flexShrink: 0, marginRight: 12 }}>
                  <Image
                    src={product.image}
                    width={60}
                    height={60}
                    radius="sm"
                    style={{ objectFit: 'contain', backgroundColor: '#fff' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <Flex align="flex-start" justify="space-between">
                    <Flex
                      align="center"
                      gap="xs"
                      style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}
                    >
                      <Text fw={600} fz="sm" c="#212529" title={product.name} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {product.name}
                      </Text>
                      <Text size="xs" c="#868E96">
                        1 kg
                      </Text>
                    </Flex>

                    <Flex align="center" gap={4} ml="sm">
                      <Button
                        variant="default"
                        radius="md"
                        size="compact-sm"
                        aria-label="decrease-qty"
                        onClick={() => onUpdateQuantity(product, -1)}
                        style={{ width: 26, height: 26, padding: 0 }}
                      >
                        <IconMinus size={14} />
                      </Button>
                      <Text fz="sm">{quantity}</Text>
                      <Button
                        variant="default"
                        radius="md"
                        size="compact-sm"
                        aria-label="increase-qty"
                        onClick={() => onUpdateQuantity(product, 1)}
                        style={{ width: 26, height: 26, padding: 0 }}
                      >
                        <IconPlus size={14} />
                      </Button>
                    </Flex>
                  </Flex>

                  <Text mt={6} fw={700} fz="sm" c="#212529">
                    ${' '}{product.price}
                  </Text>
                </div>
              </Flex>

              <Divider my="sm" />
            </div>
          ))}

          <Group justify="space-between" mt="md">
            <Text fw={700}>Total</Text>

            <Text fw={700} data-testid="cart-total">
              ${total.toFixed(2)}
            </Text>
          </Group>
        </>
      )}
    </Paper>
  );
}
