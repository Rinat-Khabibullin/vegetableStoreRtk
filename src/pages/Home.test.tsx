import { waitFor, screen, within } from '@testing-library/react';
import { Home } from './Home';
import { vi } from 'vitest';
import * as api from '../api/products';
import { renderWithProviders } from '../tests/utils';
import userEvent from '@testing-library/user-event';

vi.mock('../api/products', () => ({
  getProducts: vi.fn(),
}));

const mockProducts = [
  { id: 1, name: 'Tomato', price: 80, image: 'img1', category: 'veg' },
  { id: 2, name: 'Potato', price: 60, image: 'img2', category: 'veg' },
];

describe('Home page', () => {
  beforeEach(() => {
    vi.mocked(api.getProducts).mockResolvedValue(mockProducts as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('показывает загрузку при старте', () => {
    renderWithProviders(<Home />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('рендерит товары после загрузки', async () => {
    renderWithProviders(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Tomato')).toBeInTheDocument();
      expect(screen.getByText('Potato')).toBeInTheDocument();
    });
  });

  test('обновляет корзину при добавлении товара', async () => {
    renderWithProviders(<Home />);
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.getByText('Tomato')).toBeInTheDocument();
    });

    const [increaseButton] = screen.getAllByLabelText('increase-qty');
    await user.click(increaseButton);

    const [addButton] = screen.getAllByRole('button', { name: /add to cart/i });
    await user.click(addButton);

    const cartButton = screen.getByText(/^Cart$/).closest('button');
    expect(cartButton).not.toBeNull();
    const cartButtonContent = within(cartButton as HTMLElement);
    await waitFor(() => {
      expect(cartButtonContent.getByText('2')).toBeInTheDocument();
      expect(cartButtonContent.getByText('$160.00')).toBeInTheDocument();
    });
  });
});
