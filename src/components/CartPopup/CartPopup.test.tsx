import { fireEvent, screen } from '@testing-library/react';
import { CartPopup } from './CartPopup';
import { renderWithProviders } from '../../tests/utils';

const cartWithItem = {
  items: [
    {
      product: { id: 1, name: 'Tomato', price: 80, image: 'img', category: 'veg' },
      quantity: 2,
    },
  ],
  total: 160,
  onUpdateQuantity: vi.fn(),
};

const emptyCart = {
  items: [],
  total: 0,
  onUpdateQuantity: vi.fn(),
};

describe('CartPopup', () => {
  test('отображает пустое состояние', () => {
    renderWithProviders(
      <CartPopup
        opened={true}
        onClose={() => {}}
        items={emptyCart.items}
        total={emptyCart.total}
        onUpdateQuantity={emptyCart.onUpdateQuantity}
      />
    );
    expect(screen.getByText(/empty/i)).toBeInTheDocument();
  });

  test('отображает товары и итоговую сумму', () => {
    renderWithProviders(
      <CartPopup
        opened={true}
        onClose={() => {}}
        items={cartWithItem.items}
        total={cartWithItem.total}
        onUpdateQuantity={cartWithItem.onUpdateQuantity}
      />
    );
    expect(screen.getByText('Tomato')).toBeInTheDocument();
    expect(screen.getByTestId('cart-total')).toHaveTextContent(/\$?\s*160(\.00)?/);
  });

  test('клик по + вызывает addToCart', () => {
    renderWithProviders(
      <CartPopup
        opened={true}
        onClose={() => {}}
        items={cartWithItem.items}
        total={cartWithItem.total}
        onUpdateQuantity={cartWithItem.onUpdateQuantity}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'increase-qty' }));
    expect(cartWithItem.onUpdateQuantity).toHaveBeenCalled();
  });
});
