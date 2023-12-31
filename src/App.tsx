import { Box, ChakraProvider } from '@chakra-ui/react';

import ContactMe from './components/ContactMe';
import Home from './pages/Home';

const App = () => {
  return (
    <ChakraProvider>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100%',
          maxWidth: '1200px',
          margin: 'auto',
          paddingTop: 10,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 30
        }}
      >
        <Home />
        <ContactMe />
      </Box>
    </ChakraProvider>
  );
};

export default App;
