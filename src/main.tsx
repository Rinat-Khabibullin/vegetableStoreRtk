import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import App from './App';
import '@mantine/core/styles.css';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        colors: {
          brand: [
            '#EAFBEE',
            '#DBF2E0',
            '#B9E1C2',
            '#74C286',
            '#5FB974',
            '#54B46A',
            '#439E58',
            '#388D4D',
            '#2A7A3F',
            '#122B19',
          ],
        },
        primaryColor: 'brand',
        fontFamily: 'Inter, sans-serif',
        defaultRadius: 'lg',
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>
);
