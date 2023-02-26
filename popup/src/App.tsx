import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import { MergeOptionView } from './mergeOptionView';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: '#333333',
        color: 'white',
      },
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <MergeOptionView />
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;
