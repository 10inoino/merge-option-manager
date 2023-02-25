import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { MergeOptionView } from './mergeOptionView';

function App() {
  return (
    <ChakraProvider>
      <MergeOptionView />
    </ChakraProvider>
  );
}

export default App;
