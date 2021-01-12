import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';

const AllProviders = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
