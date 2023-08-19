import { Box, ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <ChakraProvider>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'red' }}></Box>
    </ChakraProvider>
  );
};

export default App;
