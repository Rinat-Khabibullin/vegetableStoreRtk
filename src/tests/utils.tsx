import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createAppStore, type AppStore } from '../store';

interface RenderOptions {
  store?: AppStore;
}

export function renderWithProviders(ui: ReactNode, { store }: RenderOptions = {}) {
  const appStore = store ?? createAppStore();
  return render(
    <Provider store={appStore}>
      <MantineProvider>{ui}</MantineProvider>
    </Provider>
  );
}
