import { Box, Input as ChakraInput, InputProps, Text } from '@chakra-ui/react';
import React from 'react';

interface IInputProps extends InputProps {
  errorText?: string | boolean;
}

const Input: React.FC<IInputProps> = ({ errorText, ...otherProps }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      <ChakraInput
        {...otherProps}
        sx={{
          _disabled: { color: 'grey' },
          ...(errorText
            ? {
                borderColor: 'red',
                _hover: { borderColor: 'red' },
                _focus: { borderColor: 'red' }
              }
            : {})
        }}
      />
      {errorText && <Text>{errorText}</Text>}
    </Box>
  );
};

export default Input;
